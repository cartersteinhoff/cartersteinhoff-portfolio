import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "How Carter Steinhoff went from COBOL on a mainframe to modern products";
export const size = ogSize;
export const contentType = ogContentType;

export default async function AboutOpenGraphImage() {
  return renderOgCard({
    eyebrow: "About · The long way round",
    title: "From mainframes to modern products.",
    subtitle: "COBOL, WordPress, a layoff, a classroom, and eventually a practice of my own.",
  });
}
