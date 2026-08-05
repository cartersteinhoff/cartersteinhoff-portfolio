export const site = {
  name: "Carter Steinhoff",
  shortName: "CS",
  role: "Designer & developer",
  location: "Phoenix, Arizona",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cartersteinhoff@gmail.com",
  description:
    "Carter Steinhoff designs and builds thoughtful digital products, editorial platforms, and brand experiences from Phoenix, Arizona.",
};

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const focusAreas = [
  {
    number: "01",
    title: "Digital products",
    summary: "Useful systems, clearly expressed.",
    description:
      "Product thinking and interface work that turns a complicated idea into something people can understand and use.",
    services: ["Product direction", "UX systems", "Frontend"],
    image: "/images/studio-hero.webp",
    imageAlt: "Carter working at a desk in a warm, dark studio",
  },
  {
    number: "02",
    title: "Editorial platforms",
    summary: "Stories given room to breathe.",
    description:
      "Flexible publishing experiences where typography, pace, and structure make the content feel intentional.",
    services: ["Content structure", "Art direction", "Web development"],
    image: "/images/phoenix-night.webp",
    imageAlt: "Phoenix city lights beyond Sonoran Desert plants at night",
  },
  {
    number: "03",
    title: "Brand experiences",
    summary: "A distinct point of view, carried through.",
    description:
      "Identity-led websites that connect visual character with speed, usability, and a careful final build.",
    services: ["Visual systems", "Web design", "Launch"],
    image: "/images/carter-phoenix-portrait.webp",
    imageAlt: "Editorial portrait of Carter in Phoenix at blue hour",
  },
] as const;
