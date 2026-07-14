import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.spec.title,
  description: seo.spec.description,
  alternates: { canonical: seo.spec.canonical },
  openGraph: {
    title: seo.spec.title,
    description: seo.spec.description,
    url: seo.spec.canonical,
  },
};

// Rendered at build time from the bundled copy of the canonical SPEC.md.
function specHtml(): string {
  const path = join(process.cwd(), "src", "content", "spec.md");
  const md = readFileSync(path, "utf8");
  marked.setOptions({ gfm: true });
  return marked.parse(md) as string;
}

export default function SpecPage() {
  const html = specHtml();
  return (
    <div className="wrap">
      <article
        className="spec-doc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
