import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";

/**
 * The /learn registry is the folder itself.
 *
 * Publishing an article means dropping ONE markdown file into
 * src/content/learn/ with a frontmatter block. There is deliberately no
 * hand-kept list to update: the automation only has to write a file, and it
 * is impossible to end up with a piece that exists but is not listed, or
 * listed but missing.
 *
 *   ---
 *   title: Why AI forgets your project
 *   description: One or two lines, used on the cards and for search.
 *   date: 2026-07-18
 *   audience: everyday        # everyday | builders
 *   art: files                # optional, see MOTIFS in article-art.tsx
 *   featured: true            # optional, at most one. Picks the lead.
 *   by: Rafael Carrer         # optional, defaults to Rafael Carrer
 *   with: Claude Opus 5       # optional, the AI that helped. Comma-separated.
 *   ---
 */

// Who the piece is written for. Section headings speak to the reader
// ("If you use AI"); tags stay short because they sit next to titles.
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
  /** ISO date (YYYY-MM-DD). Orders the archive and sets the dateline. */
  date: string;
  audience: LearnAudience;
  /** Motif key for the drawn cover. Falls back to a stable pick per slug. */
  art?: string;
  /** At most one piece runs as the lead. Chosen by hand, not by traffic. */
  featured?: boolean;
  /** The person answering for the piece. Never an AI, see byline() below. */
  by: string;
  /** AI models that helped write it, in the order they worked. May be empty. */
  with: string[];
}

const DEFAULT_AUTHOR = "Rafael Carrer";

/**
 * The line at the foot of a piece.
 *
 * A person is always the author, and the models are credited separately as
 * help. That is deliberate on two counts. Google advises against giving AI an
 * author byline while encouraging a disclosure of how something was made, and
 * more to the point, what makes these pieces worth reading is Rafael's own
 * experience. A model has none to lend.
 *
 * Whoever writes signs: when the automation drafts a piece it names its own
 * model here, not this one.
 */
export function byline(entry: LearnEntry): string {
  const helpers = entry.with;
  if (helpers.length === 0) return `Written by ${entry.by}`;
  const list =
    helpers.length === 1
      ? helpers[0]
      : `${helpers.slice(0, -1).join(", ")} and ${helpers[helpers.length - 1]}`;
  return `Written by ${entry.by} with ${list}`;
}

const LEARN_DIR = join(process.cwd(), "src", "content", "learn");

/**
 * Minimal frontmatter reader: `key: value` lines between --- fences.
 * Deliberately hand-rolled rather than pulling in a YAML dependency, since
 * the shape is fixed and flat.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: text };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) data[key] = value;
  }
  return { data, body: text.slice(match[0].length) };
}

/**
 * Falls back to the opening prose when a piece has no description.
 *
 * The description does three jobs: the deck under the lead, the snippet
 * Google shows, and the text that appears when someone pastes the link. A
 * missing one is therefore an invisible hole rather than a visible bug, and
 * an automated pipeline is exactly the kind of author that forgets it. A
 * rough first paragraph beats nothing in all three places.
 */
function firstParagraph(body: string): string {
  const para = body
    .split("\n\n")
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith("```") && !p.startsWith(">"));
  if (!para) return "";
  const flat = para.replace(/\s+/g, " ").replace(/[*_`[\]]/g, "");
  return flat.length > 200 ? `${flat.slice(0, 197).trimEnd()}...` : flat;
}

function readEntry(slug: string): { entry: LearnEntry; body: string } {
  const raw = readFileSync(join(LEARN_DIR, `${slug}.md`), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const audience: LearnAudience =
    data.audience === "builders" ? "builders" : "everyday";
  return {
    entry: {
      slug,
      title: data.title ?? slug,
      description: data.description || firstParagraph(body),
      date: data.date ?? "",
      audience,
      art: data.art || undefined,
      featured: data.featured === "true",
      by: data.by || DEFAULT_AUTHOR,
      with: (data.with || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    },
    body,
  };
}

function loadAll(): { entry: LearnEntry; body: string }[] {
  return readdirSync(LEARN_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readEntry(f.replace(/\.md$/, "")));
}

/**
 * Today in UTC, as YYYY-MM-DD. Dates are compared as plain strings, which
 * works because the format sorts lexicographically.
 */
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Scheduled publishing.
 *
 * A piece dated in the future is written, committed and invisible: it is
 * dropped here, so it stays out of the listings, the sitemap, and the
 * generated routes until its day arrives. A daily rebuild is what makes it
 * appear (see .github/workflows/publish-scheduled.yml).
 *
 * This exists so a week away, or a heavy week at work, does not mean silence:
 * write several pieces calmly in advance and let them land on their own.
 */
const ALL = loadAll();
const TODAY = todayISO();
const LOADED = ALL.filter((x) => x.entry.date <= TODAY);

const queued = ALL.length - LOADED.length;
if (queued > 0) {
  const next = ALL.map((x) => x.entry.date)
    .filter((d) => d > TODAY)
    .sort()[0];
  console.log(
    `learn: ${queued} scheduled post${queued === 1 ? "" : "s"} held back, next on ${next}`
  );
}

export const learn: LearnEntry[] = LOADED.map((x) => x.entry);

export function learnBySlug(slug: string): LearnEntry | undefined {
  return learn.find((e) => e.slug === slug);
}

/**
 * Most read, curated by hand.
 *
 * Deliberately not a live counter. At low traffic a counter mostly reports
 * what a crawler hit or what got linked once, not what is worth reading, so
 * a monthly look at the analytics and a reorder of this list is both more
 * honest and less machinery. Put the slugs in order, best first.
 *
 * The list only shows once the archive is big enough to make a ranking mean
 * something, so it can sit here empty until then.
 */
export const POPULAR: string[] = [];

const POPULAR_MIN_ARTICLES = 6;

export function popular(limit = 3): LearnEntry[] {
  if (learn.length < POPULAR_MIN_ARTICLES) return [];
  return POPULAR.map((slug) => learnBySlug(slug))
    .filter((e): e is LearnEntry => Boolean(e))
    .slice(0, limit);
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

export function articles(): LearnEntry[] {
  return [...learn].sort((a, b) => b.date.localeCompare(a.date));
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
 * we may not have.
 */
export function latestDate(): string {
  return articles()[0]?.date ?? "";
}

function bodyOf(slug: string): string {
  const found = LOADED.find((x) => x.entry.slug === slug);
  if (!found) throw new Error(`learn: no article named ${slug}`);
  return found.body;
}

/** Rough reading time from the markdown body, at ~200 words per minute. */
export function readingTime(slug: string): number {
  const words = bodyOf(slug).trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

// Rendered at build time from the bundled markdown body.
export function learnHtml(slug: string): string {
  marked.setOptions({ gfm: true });
  return marked.parse(bodyOf(slug)) as string;
}
