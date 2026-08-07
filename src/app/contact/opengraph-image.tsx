import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Start a project conversation with Carter Steinhoff";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ContactOpenGraphImage() {
  return renderOgCard({
    eyebrow: "Contact · Start anywhere",
    title: "Let’s make something good.",
    subtitle: "Tell me what you’re thinking — even if it is still rough.",
    titleSize: 128,
  });
}
