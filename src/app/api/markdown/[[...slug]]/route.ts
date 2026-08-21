import { getAgentDocument } from "@/lib/agent-content";
import { markdownRewriteHeader } from "@/lib/content-negotiation";

type MarkdownRouteContext = {
  readonly params: Promise<{ slug?: string[] }>;
};

async function markdownResponse(
  request: Request,
  { params }: MarkdownRouteContext,
  includeBody: boolean,
) {
  if (request.headers.get(markdownRewriteHeader) !== "1") {
    return new Response(includeBody ? "Not found\n" : null, {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const { slug = [] } = await params;
  const pathname = slug.length === 0 ? "/" : `/${slug.join("/")}`;
  const document = getAgentDocument(pathname);
  const cacheControl =
    document.status === 200
      ? "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
      : "no-store";

  return new Response(includeBody ? document.body : null, {
    status: document.status,
    headers: {
      "Cache-Control": cacheControl,
      "Content-Language": "en",
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${pathname}>; rel="canonical"; type="text/html", </llms.txt>; rel="describedby"`,
      Vary: "Accept, Accept-Encoding",
    },
  });
}

export function GET(request: Request, context: MarkdownRouteContext) {
  return markdownResponse(request, context, true);
}

export function HEAD(request: Request, context: MarkdownRouteContext) {
  return markdownResponse(request, context, false);
}
