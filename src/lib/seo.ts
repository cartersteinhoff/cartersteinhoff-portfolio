import type { Metadata } from "next";
import { site } from "@/data/site";

type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image?: SocialImage;
  type?: "website" | "article";
};

export const defaultSocialImage: SocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: site.socialImageAlt,
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: PageMetadata): Metadata {
  const socialTitle = `${title} | ${site.name}`;

  /**
   * When no image is passed we deliberately omit `images` entirely rather
   * than defaulting to the root card. Routes carry their own
   * `opengraph-image.tsx`, and Next only injects that file-based image if
   * the metadata export has not already declared one — setting a default
   * here would silently give every page the homepage's card.
   */
  const social = image ? { images: [image] } : ({} as { images?: SocialImage[] });

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      type,
      url: path,
      siteName: site.name,
      locale: "en_US",
      ...social,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(image ? { images: [{ url: image.url, alt: image.alt }] } : {}),
    },
  };
}
