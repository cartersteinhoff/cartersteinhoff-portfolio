export const supportedMediaTypes = ["text/html", "text/markdown"] as const;

export type Representation = "html" | "markdown";

type AcceptEntry = {
  readonly type: string;
  readonly q: number;
  readonly specificity: number;
  readonly position: number;
};

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(",")
    .map((raw, position) => {
      const [rawType = "", ...rawParameters] = raw.split(";");
      const type = rawType.trim().toLowerCase();
      let q = 1;

      for (const rawParameter of rawParameters) {
        const [rawName = "", rawValue = ""] = rawParameter.split("=", 2);
        if (rawName.trim().toLowerCase() !== "q") continue;

        const parsed = Number(rawValue.trim());
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
      }

      return {
        type,
        q,
        specificity: type === "*/*" ? 0 : type.endsWith("/*") ? 1 : 2,
        position,
      };
    })
    .filter((entry) => entry.type.length > 0);
}

function matches(entry: AcceptEntry, candidate: (typeof supportedMediaTypes)[number]) {
  if (entry.type === "*/*") return true;
  if (entry.type.endsWith("/*")) return candidate.startsWith(entry.type.slice(0, -1));
  return entry.type === candidate;
}

/**
 * Selects between HTML and Markdown using RFC 9110 specificity and
 * quality values. A null result means the request explicitly rejects
 * every representation the page can produce.
 */
export function preferredRepresentation(header: string | null): Representation | null {
  if (header === null || header.trim() === "") return "html";

  const entries = parseAccept(header);
  if (entries.length === 0) return "html";

  let best:
    | {
        readonly representation: Representation;
        readonly q: number;
        readonly specificity: number;
        readonly position: number;
      }
    | undefined;

  for (const [candidateIndex, candidate] of supportedMediaTypes.entries()) {
    let candidateMatch: AcceptEntry | undefined;

    for (const entry of entries) {
      if (!matches(entry, candidate)) continue;

      if (
        !candidateMatch ||
        entry.specificity > candidateMatch.specificity ||
        (entry.specificity === candidateMatch.specificity &&
          entry.position < candidateMatch.position)
      ) {
        candidateMatch = entry;
      }
    }

    if (!candidateMatch || candidateMatch.q <= 0) continue;

    const representation: Representation = candidateIndex === 0 ? "html" : "markdown";
    if (
      !best ||
      candidateMatch.q > best.q ||
      (candidateMatch.q === best.q && candidateMatch.specificity > best.specificity) ||
      (candidateMatch.q === best.q &&
        candidateMatch.specificity === best.specificity &&
        candidateMatch.position < best.position)
    ) {
      best = {
        representation,
        q: candidateMatch.q,
        specificity: candidateMatch.specificity,
        position: candidateMatch.position,
      };
    }
  }

  return best?.representation ?? null;
}

/** Add Vary tokens without losing framework- or CDN-supplied values. */
export function appendVary(headers: Headers, ...tokens: string[]) {
  const existing = headers
    .get("Vary")
    ?.split(",")
    .map((token) => token.trim())
    .filter(Boolean);
  const values = existing ? [...existing] : [];
  const normalized = new Set(values.map((value) => value.toLowerCase()));

  for (const token of tokens) {
    if (normalized.has(token.toLowerCase())) continue;
    values.push(token);
    normalized.add(token.toLowerCase());
  }

  headers.set("Vary", values.join(", "));
}

export function markdownPathForCanonical(pathname: string) {
  if (pathname === "/") return "/index.md";
  return `${pathname.replace(/\/$/u, "")}/index.md`;
}

export function canonicalPathFromMarkdown(pathname: string) {
  if (pathname === "/index.md") return "/";
  if (!pathname.endsWith("/index.md")) return null;

  return pathname.slice(0, -"/index.md".length) || "/";
}

const fixedPaths = new Set(["/llms.txt", "/manifest.webmanifest", "/robots.txt", "/sitemap.xml"]);
const fixedLeafNames = /^(?:apple-icon|icon|opengraph-image|twitter-image)(?:\.[^/]*)?$/iu;
const staticFileExtension =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|pdf|png|svg|ttf|txt|webmanifest|webp|woff2?|xml|zip)$/iu;

/** Resources whose existing fixed media type must not be negotiated. */
export function isFixedRepresentationPath(pathname: string) {
  if (fixedPaths.has(pathname)) return true;

  const leaf = pathname.split("/").at(-1) ?? "";
  if (fixedLeafNames.test(leaf)) return true;
  if (pathname.endsWith("/index.md") || pathname === "/index.md") return false;
  return staticFileExtension.test(leaf);
}
