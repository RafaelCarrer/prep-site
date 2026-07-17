import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

export type LearnKind = "guide" | "article";

export interface LearnEntry {
  slug: string;
  title: string;
  description: string;
  // ISO date (YYYY-MM-DD). Used for ordering and the "last published" check.
  date: string;
  kind: LearnKind;
}

// The /learn registry. Guides are living reference (FAQ, troubleshooting);
// articles are the editorial 1-a-day pieces. Newest first within each kind.
// Every entry needs a matching markdown file at src/content/learn/<slug>.md.
export const learn: LearnEntry[] = [
  {
    slug: "troubleshooting",
    title: "Troubleshooting & FAQ",
    description:
      "Real issues people hit connecting an AI to a PREP folder — and the fix for each. Grows one question at a time.",
    date: "2026-07-17",
    kind: "guide",
  },
  {
    slug: "switch-chatgpt-to-claude",
    title: "How to switch from ChatGPT to Claude without losing context",
    description:
      "Switch AI models without re-explaining your project. Keep the context in a PREP folder and any AI picks up exactly where you left off.",
    date: "2026-07-18",
    kind: "article",
  },
  {
    slug: "prep-vs-agents-md",
    title: "PREP vs AGENTS.md — when to use each",
    description:
      "AGENTS.md tells a coding agent how to behave inside your repo. PREP tells any AI everything about your project. They solve different problems and compose well.",
    date: "2026-07-17",
    kind: "article",
  },
];

export function learnBySlug(slug: string): LearnEntry | undefined {
  return learn.find((e) => e.slug === slug);
}

// "2026-07-17" -> "17 July 2026". Parsed as UTC to avoid TZ drift.
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function guides(): LearnEntry[] {
  return learn.filter((e) => e.kind === "guide");
}

export function articles(): LearnEntry[] {
  return learn
    .filter((e) => e.kind === "article")
    .sort((a, b) => b.date.localeCompare(a.date));
}

// Rendered at build time from the bundled markdown body.
export function learnHtml(slug: string): string {
  const path = join(process.cwd(), "src", "content", "learn", `${slug}.md`);
  const md = readFileSync(path, "utf8");
  marked.setOptions({ gfm: true });
  return marked.parse(md) as string;
}
