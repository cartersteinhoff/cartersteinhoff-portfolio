import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Design, development, automation, and cloud services from Carter Steinhoff";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ServicesOpenGraphImage() {
  return renderOgCard({
    eyebrow: "Services · Individually or together",
    title: "Design, development, automation, and cloud.",
    subtitle: "Hire me for one focused service, or combine what the project needs.",
  });
}
