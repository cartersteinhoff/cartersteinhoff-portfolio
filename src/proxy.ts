import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  appendVary,
  canonicalPathFromMarkdown,
  isFixedRepresentationPath,
  markdownPathForCanonical,
  markdownRewriteHeader,
  preferredRepresentation,
} from "@/lib/content-negotiation";

const negotiatedVaryTokens = ["Accept", "Accept-Encoding"] as const;

function markdownRewrite(request: NextRequest, canonicalPath: string) {
  const url = request.nextUrl.clone();
  url.pathname = canonicalPath === "/" ? "/api/markdown" : `/api/markdown${canonicalPath}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(markdownRewriteHeader, "1");

  const response = NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
  appendVary(response.headers, ...negotiatedVaryTokens);
  response.headers.set(
    "Link",
    `<${canonicalPath}>; rel="canonical"; type="text/html", </llms.txt>; rel="describedby"`,
  );
  return response;
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
  if (explicitMarkdownPath !== null) return markdownRewrite(request, explicitMarkdownPath);

  const representation = preferredRepresentation(request.headers.get("accept"));
  if (representation === "markdown") return markdownRewrite(request, pathname);
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
