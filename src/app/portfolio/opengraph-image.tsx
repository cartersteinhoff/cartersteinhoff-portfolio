import { portfolioProjects } from "@/data/site";
import { ogContentType, ogSize, renderOgCard } from "@/lib/og-card";

export const alt = "Selected work by Carter Steinhoff, from interface to infrastructure";
export const size = ogSize;
export const contentType = ogContentType;

export default async function PortfolioOpenGraphImage() {
  return renderOgCard({
    eyebrow: "Portfolio · Selected work",
    title: "Products from interface to infrastructure.",
    subtitle: `${portfolioProjects.length} products, designed and built end to end.`,
  });
}
