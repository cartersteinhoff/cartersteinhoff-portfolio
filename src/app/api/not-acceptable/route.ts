import { agentNegotiationHeader } from "@/lib/content-negotiation";

function notAcceptableResponse(request: Request, includeBody: boolean) {
  if (request.headers.get(agentNegotiationHeader) !== "not-acceptable") {
    return new Response(includeBody ? "Not found\n" : null, {
      status: 404,
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    });
  }

  return new Response(
    includeBody
      ? "Not Acceptable\n\nThis resource is available as:\n- text/html\n- text/markdown\n"
      : null,
    {
      status: 406,
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept, Accept-Encoding",
      },
    },
  );
}

export function GET(request: Request) {
  return notAcceptableResponse(request, true);
}

export function HEAD(request: Request) {
  return notAcceptableResponse(request, false);
}
