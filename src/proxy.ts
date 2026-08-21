import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAgentDocument } from "@/lib/agent-content";
import {
  appendVary,
  canonicalPathFromMarkdown,
  isFixedRepresentationPath,
  markdownPathForCanonical,
  preferredRepresentation,
} from "@/lib/content-negotiation";

const negotiatedVaryTokens = ["Accept", "Accept-Encoding"] as const;

function markdownResponse(request: NextRequest, canonicalPath: string) {
  const document = getAgentDocument(canonicalPath);
  const cacheControl =
    document.status === 200
      ? "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
      : "no-store";

  return new Response(request.method === "HEAD" ? null : document.body, {
    status: document.status,
    headers: {
      "Cache-Control": cacheControl,
      "Content-Language": "en",
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonicalPath}>; rel="canonical"; type="text/html", </llms.txt>; rel="describedby"`,
      Vary: negotiatedVaryTokens.join(", "),
    },
  });
}

function htmlResponse(request: NextRequest) {
  const response = NextResponse.next();
  appendVary(response.headers, ...negotiatedVaryTokens);
  response.headers.set(
    "Link",
    `<${markdownPathForCanonical(request.nextUrl.pathname)}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`,
  );
  return response;
}

export function proxy(request: NextRequest) {
  if (!(["GET", "HEAD"] as const).some((method) => method === request.method)) {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  if (isFixedRepresentationPath(pathname)) return NextResponse.next();

  const explicitMarkdownPath = canonicalPathFromMarkdown(pathname);
  if (explicitMarkdownPath !== null) return markdownResponse(request, explicitMarkdownPath);

  const representation = preferredRepresentation(request.headers.get("accept"));
  if (representation === "markdown") return markdownResponse(request, pathname);
  if (representation === "html") return htmlResponse(request);

  return new Response(
    request.method === "HEAD"
      ? null
      : `Not Acceptable\n\nThis resource is available as:\n- text/html\n- text/markdown\n`,
    {
      status: 406,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        Vary: negotiatedVaryTokens.join(", "),
      },
    },
  );
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
};
