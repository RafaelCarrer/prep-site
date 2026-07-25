import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

const canonical = "https://prep.md/story";
const title = "PREP.md — project memory in a folder any AI can read";
const description =
  "You build a project with one AI, switch to another, and lose everything. PREP gives the project its own memory — a folder any AI can open and continue.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: { title, description, url: canonical, type: "article" },
};

export default function StoryPage() {
  const md = readFileSync(
    join(process.cwd(), "src", "content", "story.md"),
    "utf8"
  );
  marked.setOptions({ gfm: true });
  const html = marked.parse(md) as string;
  return (
    <div className="wrap">
      <p className="learn-date">A 3-minute read · launched July 2026</p>
      <article
        className="spec-doc"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
