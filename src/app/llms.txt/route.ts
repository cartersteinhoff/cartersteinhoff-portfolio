import { buildLlmsTxt } from "@/lib/agent-content";

export const dynamic = "force-static";

function llmsResponse(includeBody: boolean) {
  return new Response(includeBody ? buildLlmsTxt() : null, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Language": "en",
      "Content-Type": "text/markdown; charset=utf-8",
      Link: '</llms.txt>; rel="self"; type="text/markdown"',
    },
  });
}

export function GET() {
  return llmsResponse(true);
}

export function HEAD() {
  return llmsResponse(false);
}
