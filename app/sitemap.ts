import type { MetadataRoute } from "next";
import { getAllArticleMeta } from "@/lib/articles";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/articles", "/about", "/privacy", "/contact"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticleMeta().map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...articleRoutes];
}
