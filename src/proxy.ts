import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  agentNegotiationHeader,
  appendVary,
  canonicalPathFromMarkdown,
  isFixedRepresentationPath,
  markdownPathForCanonical,
  preferredRepresentation,
} from "@/lib/content-negotiation";

const negotiatedVaryTokens = ["Accept", "Accept-Encoding"] as const;

function sanitizedRequestHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.delete(agentNegotiationHeader);
  return headers;
}

function passThrough(request: NextRequest) {
  return NextResponse.next({
    request: {
      headers: sanitizedRequestHeaders(request),
    },
  });
}

function continueWithNegotiation(
  request: NextRequest,
  result: "markdown-canonical" | "markdown-explicit" | "not-acceptable",
) {
  const requestHeaders = sanitizedRequestHeaders(request);
  requestHeaders.set(agentNegotiationHeader, result);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

function htmlResponse(request: NextRequest) {
  const response = passThrough(request);
  appendVary(response.headers, ...negotiatedVaryTokens);
  response.headers.set(
    "Link",
    `<${markdownPathForCanonical(request.nextUrl.pathname)}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"`,
  );
  return response;
}

export function proxy(request: NextRequest) {
  if (!(["GET", "HEAD"] as const).some((method) => method === request.method)) {
    return passThrough(request);
  }

  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/api/") || isFixedRepresentationPath(pathname)) {
    return passThrough(request);
  }

  const explicitMarkdownPath = canonicalPathFromMarkdown(pathname);
  if (explicitMarkdownPath !== null) {
    return continueWithNegotiation(request, "markdown-explicit");
  }

  const representation = preferredRepresentation(request.headers.get("accept"));
  if (representation === "markdown") {
    return continueWithNegotiation(request, "markdown-canonical");
  }
  if (representation === "html") return htmlResponse(request);

  return continueWithNegotiation(request, "not-acceptable");
}

export const config = {
  matcher: ["/((?!_next/|_vercel/).*)"],
};
