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
  image = defaultSocialImage,
  type = "website",
}: PageMetadata): Metadata {
  const socialTitle = `${title} | ${site.name}`;

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
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
