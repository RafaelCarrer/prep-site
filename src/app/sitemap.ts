import type { MetadataRoute } from "next";
import { learn } from "@/content/learn";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base: MetadataRoute.Sitemap = [
    { url: "https://prep.md/", lastModified, changeFrequency: "weekly", priority: 1 },
    { url: "https://prep.md/spec/", lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://prep.md/learn/", lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://prep.md/about/", lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: "https://prep.md/privacy/", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: "https://prep.md/terms/", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
  const learnPages: MetadataRoute.Sitemap = learn.map((e) => ({
    url: `https://prep.md/learn/${e.slug}/`,
    lastModified: new Date(e.date),
    changeFrequency: e.kind === "guide" ? "weekly" : "monthly",
    priority: 0.7,
  }));
  return [...base, ...learnPages];
}
