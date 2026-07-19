import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { posts } from "@/lib/posts";
import { destinationGuides } from "@/lib/destination-guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/destinations", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog-news", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    {
      path: "/book-consultation",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/apply", priority: 0.9, changeFrequency: "monthly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog-news/${post.slug}`,
    lastModified: new Date(post.updatedISO),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const destinations: MetadataRoute.Sitemap = destinationGuides.map(
    (destination) => ({
      url: `${site.url}/destinations/${destination.slug}`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  return [...pages, ...destinations, ...articles];
}
