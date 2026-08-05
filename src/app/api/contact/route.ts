import { createHash } from "node:crypto";
import { checkBotId } from "botid/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const PROJECT_TYPES = [
  "A new website",
  "A product experience",
  "A visual refresh",
  "Something else",
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

function respond(body: ContactResponse, status = 200) {
  return Response.json(body, { status, headers: noStoreHeaders });
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
    message: "Message sent. Thanks—Carter will reply directly.",
  });
}
