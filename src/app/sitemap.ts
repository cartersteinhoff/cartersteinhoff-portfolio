import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/about`, lastModified, priority: 0.8 },
    { url: `${siteUrl}/portfolio`, lastModified, priority: 0.9 },
    { url: `${siteUrl}/contact`, lastModified, priority: 0.7 },
  ];
}
