import type { MetadataRoute } from "next";
import { getSiteUrl, portfolioProjects } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, priority: 1 },
    { url: `${siteUrl}/about`, lastModified, priority: 0.8 },
    { url: `${siteUrl}/portfolio`, lastModified, priority: 0.9 },
    { url: `${siteUrl}/services`, lastModified, priority: 0.8 },
    { url: `${siteUrl}/contact`, lastModified, priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified,
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
