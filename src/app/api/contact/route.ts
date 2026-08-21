import { createHash } from "node:crypto";
import { checkBotId } from "botid/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const PROJECT_TYPES = [
  "Website & product design",
  "Full-stack web development",
  "WordPress & CMS development",
  "Technical SEO & performance",
  "AI automation & integrations",
  "Cloud architecture & delivery",
  "Not sure yet",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];
type ContactField = "name" | "email" | "projectType" | "message";

type ContactResponse = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
};

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

function respond(body: ContactResponse, status = 200, extraHeaders?: Record<string, string>) {
  return Response.json(body, { status, headers: { ...noStoreHeaders, ...extraHeaders } });
}

/* ---------------------------------------------------------------------
 * Best-effort throttle.
 *
 * What this is NOT for: a scripted client with no BotID token. BotID
 * already answers those with a 403, so raw curl in a loop never reaches
 * the mailer with or without this.
 *
 * What it is for: automation driving a real browser. `checkLevel` below
 * is "basic", the lighter check, and a Playwright-driven Chrome can
 * plausibly pass it — at which point BotID says "not a bot" and nothing
 * else caps volume. Secondarily it contains cost, because it rejects
 * before the outbound BotID call rather than after it.
 *
 * Read this before relying on it: the counter lives in the memory of one
 * serverless instance. Vercel will happily run several, each with its
 * own map, and a cold start resets the count — so the real ceiling is
 * (limit x instances), not `limit`, and a distributed flood walks
 * straight through.
 *
 * The durable version is a Vercel WAF rate-limit rule, which needs no
 * code at all. This exists because that route is unavailable here, not
 * because it is the better design.
 * ------------------------------------------------------------------- */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
/* Bounds memory under a flood from many distinct IPs. Spoofing is not
 * the concern: Vercel overwrites x-forwarded-for and does not forward
 * external IPs, so the key below is platform-set, not caller-set. */
const RATE_LIMIT_MAX_KEYS = 5_000;

const recentRequests = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimit(request: Request) {
  const now = Date.now();

  for (const [key, entry] of recentRequests) {
    if (entry.resetAt <= now) recentRequests.delete(key);
  }

  const key = clientKey(request);
  const entry = recentRequests.get(key);

  if (!entry || entry.resetAt <= now) {
    if (recentRequests.size >= RATE_LIMIT_MAX_KEYS) {
      /* Full and nothing expired: let it through rather than lock out
       * real people. BotID is still ahead of the mailer. */
      return { limited: false, retryAfter: 0 };
    }
    recentRequests.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  entry.count += 1;
  return {
    limited: entry.count > RATE_LIMIT_MAX,
    retryAfter: Math.ceil((entry.resetAt - now) / 1000),
  };
}

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isProjectType(value: string): value is ProjectType {
  return PROJECT_TYPES.some((projectType) => projectType === value);
}

function validateEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function containsControlCharacter(value: string) {
  return Array.from(value).some((character) => {
    const codePoint = character.codePointAt(0) ?? 0;
    return codePoint < 32 || codePoint === 127;
  });
}

async function readBodyWithinLimit(request: Request) {
  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    totalBytes += value.byteLength;

    if (totalBytes > MAX_BODY_BYTES) {
      try {
        await reader.cancel();
      } catch {
        // The response is already determined; cancellation is best-effort cleanup.
      }

      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return respond({ ok: false, message: "Send the form as JSON." }, 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return respond({ ok: false, message: "That message is too large to send." }, 413);
  }

  /* Ahead of BotID deliberately: it is the cheaper check, and it keeps a
   * flood from burning the BotID quota as well as the mail quota. */
  const throttle = rateLimit(request);
  if (throttle.limited) {
    return respond(
      {
        ok: false,
        message: "Too many messages from this connection. Wait a minute and try again.",
      },
      429,
      { "Retry-After": String(throttle.retryAfter) },
    );
  }

  try {
    const verification = await checkBotId({
      advancedOptions: {
        checkLevel: "basic",
      },
    });

    if (verification.isBot) {
      return respond(
        {
          ok: false,
          message: "We could not verify this submission. Refresh the page and try again.",
        },
        403,
      );
    }
  } catch (error) {
    console.error("BotID contact verification failed.", error);
    return respond(
      {
        ok: false,
        message: "Contact verification is temporarily unavailable. Please try again shortly.",
      },
      503,
    );
  }

  let payload: unknown;

  try {
    const rawBody = await readBodyWithinLimit(request);

    if (rawBody === null) {
      return respond({ ok: false, message: "That message is too large to send." }, 413);
    }

    payload = JSON.parse(rawBody);
  } catch {
    return respond({ ok: false, message: "The submitted form could not be read." }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return respond({ ok: false, message: "The submitted form is invalid." }, 400);
  }

  const submitted = payload as Record<string, unknown>;
  const name = asTrimmedString(submitted.name);
  const email = asTrimmedString(submitted.email).toLowerCase();
  const projectType = asTrimmedString(submitted.projectType);
  const message = asTrimmedString(submitted.message);
  const website = asTrimmedString(submitted.website);

  // Quietly accept honeypot submissions without sending an email.
  if (website) {
    return respond({ ok: true, message: "Message sent. Thanks for reaching out." });
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (name.length < 2 || name.length > 80 || containsControlCharacter(name)) {
    fieldErrors.name = "Enter your name using 2 to 80 characters.";
  }

  if (!validateEmail(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!isProjectType(projectType)) {
    fieldErrors.projectType = "Choose one of the available project types.";
  }

  if (message.length < 10 || message.length > 5_000) {
    fieldErrors.message = "Add between 10 and 5,000 characters of project context.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return respond(
      {
        ok: false,
        message: "Check the highlighted information and try again.",
        fieldErrors,
      },
      400,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("The contact form is missing its server-side email configuration.");
    return respond(
      {
        ok: false,
        message: "Email delivery is temporarily unavailable. Please use the email link instead.",
      },
      503,
    );
  }

  const subjectName = name.replace(/[\r\n]+/g, " ");
  const emailText = [
    "New portfolio inquiry",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    "",
    "Message:",
    message,
  ].join("\n");
  const idempotencyKey = `portfolio-contact-${createHash("sha256")
    .update([name, email, projectType, message].join("\u0000"))
    .digest("hex")}`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send(
      {
        from,
        to,
        replyTo: email,
        subject: `Portfolio inquiry from ${subjectName}`,
        text: emailText,
      },
      { idempotencyKey },
    );

    if (error) {
      console.error("Resend did not accept the contact email.", {
        name: error.name,
        message: error.message,
      });
      return respond(
        {
          ok: false,
          message: "The message could not be delivered. Please try again or use the email link.",
        },
        502,
      );
    }
  } catch (error) {
    console.error("The contact email request failed.", error);
    return respond(
      {
        ok: false,
        message: "The message could not be delivered. Please try again or use the email link.",
      },
      502,
    );
  }

  return respond({
    ok: true,
    message: "Message sent. Thanks. Carter will reply directly.",
  });
}
