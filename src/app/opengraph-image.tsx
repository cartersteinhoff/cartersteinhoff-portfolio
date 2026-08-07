import { site } from "@/data/site";
import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = site.socialImageAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage() {
  return renderOgCard({
    eyebrow: "Product · Full-stack · AI & cloud",
    title: "Carter Steinhoff.",
    subtitle: "I design the product and build the system it runs on.",
    titleSize: 148,
  });
}
