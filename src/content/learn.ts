import { readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

// Who the piece is written for. Drives the two sections on /learn and the
// tag shown on each card. Section headings speak to the reader ("If you use
// AI"); tags have to fit in a chip next to a title, so they stay short.
export type LearnAudience = "everyday" | "builders";

export const AUDIENCE_SECTION: Record<LearnAudience, string> = {
  everyday: "If you use AI",
  builders: "If you build with AI",
};

export const AUDIENCE_TAG: Record<LearnAudience, string> = {
  everyday: "Everyday",
  builders: "Builders",
};

export interface LearnEntry {
  slug: string;
  title: string;
  description: string;
  // ISO date (YYYY-MM-DD). Used for ordering and for the "latest post" line.
  date: string;
  audience: LearnAudience;
  // One piece runs as the lead on /learn. Chosen by hand, not by traffic.
  featured?: boolean;
  // Optional art, served from /public. Everything degrades to type-only when
  // a piece has no image, which is the normal case until the art pipeline
  // starts feeding this.
  image?: string;
}

// The /learn registry. Newest first is not required here: the page sorts.
// Every entry needs a matching markdown file at src/content/learn/<slug>.md.
export const learn: LearnEntry[] = [
  {
    slug: "why-ai-forgets-your-project",
    title: "Why AI forgets your project (and how to fix it)",
    description:
      "AI forgets your project because chat context is temporary. A simple project folder gives every assistant the same durable memory.",
    date: "2026-07-18",
    audience: "everyday",
    featured: true,
  },
  {
    slug: "switch-chatgpt-to-claude",
    title: "How to switch from ChatGPT to Claude without losing context",
    description:
      "Switch AI models without re-explaining your project. Keep the context in a PREP folder and any AI picks up exactly where you left off.",
    date: "2026-07-18",
    audience: "everyday",
  },
  {
    slug: "prep-vs-agents-md",
    title: "PREP vs AGENTS.md — when to use each",
    description:
      "AGENTS.md tells a coding agent how to behave inside your repo. PREP tells any AI everything about your project. They solve different problems and compose well.",
    date: "2026-07-17",
    audience: "builders",
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

// "2026-07-17" -> "17 JUL", for the dense list.
export function formatShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d))
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "UTC" })
    .toUpperCase();
}

function byDateDesc(a: LearnEntry, b: LearnEntry): number {
  return b.date.localeCompare(a.date);
}

export function articles(): LearnEntry[] {
  return [...learn].sort(byDateDesc);
}

/** The hand-picked lead. Falls back to the newest piece. */
export function leadArticle(): LearnEntry {
  return learn.find((e) => e.featured) ?? articles()[0];
}

/** Newest first, for one audience, excluding the lead. */
export function byAudience(audience: LearnAudience, limit = 4): LearnEntry[] {
  const lead = leadArticle();
  return articles()
    .filter((e) => e.audience === audience && e.slug !== lead.slug)
    .slice(0, limit);
}

/** The dense river at the bottom: everything, newest first, lead included. */
export function latest(limit = 20): LearnEntry[] {
  return articles().slice(0, limit);
}

/**
 * Date of the most recent piece. Deliberately not "today": a masthead that
 * always shows today's date tells the reader nothing and implies a freshness
 * we may not have. This is true and it costs nothing to keep honest.
 */
export function latestDate(): string {
  return articles()[0]?.date ?? "";
}

/** Rough reading time from the markdown body, at ~200 words per minute. */
export function readingTime(slug: string): number {
  const words = learnMarkdown(slug).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function learnMarkdown(slug: string): string {
  const path = join(process.cwd(), "src", "content", "learn", `${slug}.md`);
  return readFileSync(path, "utf8");
}

// Rendered at build time from the bundled markdown body.
export function learnHtml(slug: string): string {
  marked.setOptions({ gfm: true });
  return marked.parse(learnMarkdown(slug)) as string;
}
