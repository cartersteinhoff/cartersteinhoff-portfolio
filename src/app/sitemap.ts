import type { MetadataRoute } from "next";
import { getAbsoluteUrl, getSiteUrl, portfolioProjects } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
      images: [getAbsoluteUrl("/opengraph-image")],
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.7,
      images: [getAbsoluteUrl("/images/phoenix-night.webp")],
    },
    {
      url: `${siteUrl}/portfolio`,
      changeFrequency: "monthly",
      priority: 0.9,
      images: portfolioProjects.map((project) => getAbsoluteUrl(project.image)),
    },
    {
      url: `${siteUrl}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        getAbsoluteUrl("/images/services-cms-system.webp"),
        getAbsoluteUrl("/images/services-ai-workflow.webp"),
      ],
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.6,
      images: [getAbsoluteUrl("/images/phoenix-night.webp")],
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
    images: [getAbsoluteUrl(project.image)],
  }));

  return [...staticRoutes, ...projectRoutes];
}
