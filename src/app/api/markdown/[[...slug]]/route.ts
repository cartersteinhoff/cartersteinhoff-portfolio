import { getAgentDocument } from "@/lib/agent-content";
import { agentNegotiationHeader } from "@/lib/content-negotiation";

type MarkdownRouteContext = {
  readonly params: Promise<{ slug?: string[] }>;
};

const negotiatedHeaders = {
  "Cache-Control": "private, no-store",
  Vary: "Accept, Accept-Encoding",
} as const;

async function negotiatedResponse(
  request: Request,
  { params }: MarkdownRouteContext,
  includeBody: boolean,
) {
  const result = request.headers.get(agentNegotiationHeader);
  if (!(result === "markdown-canonical" || result === "markdown-explicit")) {
    return new Response(includeBody ? "Not found\n" : null, {
      status: 404,
      headers: {
        ...negotiatedHeaders,
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const { slug = [] } = await params;
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const document = getAgentDocument(pathname);

  return new Response(includeBody ? document.body : null, {
    status: document.status,
    headers: {
      ...negotiatedHeaders,
      "Content-Language": "en",
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${pathname}>; rel="canonical"; type="text/html", </llms.txt>; rel="describedby"`,
    },
  });
}

export function GET(request: Request, context: MarkdownRouteContext) {
  return negotiatedResponse(request, context, true);
}

export function HEAD(request: Request, context: MarkdownRouteContext) {
  return negotiatedResponse(request, context, false);
}
