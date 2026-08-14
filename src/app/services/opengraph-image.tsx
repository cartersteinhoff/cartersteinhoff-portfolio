import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Website and product services from Carter Steinhoff";
export const size = ogSize;
export const contentType = ogContentType;

export default async function ServicesOpenGraphImage() {
  return renderOgCard({
    eyebrow: "Services · Focused support",
    title: "Choose the help you need.",
    subtitle: "Six focused services, from product design through cloud delivery.",
  });
}
