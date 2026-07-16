import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://prep.md/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://prep.md/spec/", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://prep.md/about/", lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
