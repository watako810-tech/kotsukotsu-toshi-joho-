import type { MetadataRoute } from "next";
import { getAllArticleMeta } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ["", "/articles"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticleMeta().map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticRoutes, ...articleRoutes];
}
