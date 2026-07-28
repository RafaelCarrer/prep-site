import Link from "next/link";
import type { Metadata } from "next";
import {
  learn,
  leadArticle,
  byAudience,
  latest,
  popular,
  latestDate,
  readingTime,
  formatDate,
  formatShort,
  AUDIENCE_SECTION,
  AUDIENCE_TAG,
  type LearnAudience,
  type LearnEntry,
} from "@/content/learn";
import { seo } from "@/content/seo";
import { ArticleArt, TrackBanner } from "@/components/article-art";

export const metadata: Metadata = {
  title: seo.learn.title,
  description: seo.learn.description,
  alternates: { canonical: seo.learn.canonical },
  openGraph: {
    title: seo.learn.title,
    description: seo.learn.description,
    url: seo.learn.canonical,
  },
};

function Tag({ audience }: { audience: LearnAudience }) {
  return <span className="paper-tag">{AUDIENCE_TAG[audience]}</span>;
}

/** A card in one of the two audience columns. Only the first one gets art. */
function Card({ entry, withArt }: { entry: LearnEntry; withArt?: boolean }) {
  return (
    <li className="paper-card">
      {withArt ? (
        <Link href={`/learn/${entry.slug}`} aria-hidden tabIndex={-1}>
          <ArticleArt slug={entry.slug} art={entry.art} className="paper-card-art" />
        </Link>
      ) : null}
      <Link href={`/learn/${entry.slug}`} className="paper-card-title">
        {entry.title}
      </Link>
      <p className="paper-card-meta">
        {readingTime(entry.slug)} min read · {formatDate(entry.date)}
      </p>
    </li>
  );
}

function Section({ audience }: { audience: LearnAudience }) {
  const entries = byAudience(audience);
  if (entries.length === 0) return null;
  return (
    <section className="paper-col" aria-labelledby={`sec-${audience}`}>
      <TrackBanner audience={audience} />
      <h2 id={`sec-${audience}`} className="paper-section">
        {AUDIENCE_SECTION[audience]}
      </h2>
      <ul className="paper-cards">
        {entries.map((e, i) => (
          <Card key={e.slug} entry={e} withArt={i === 0} />
        ))}
      </ul>
    </section>
  );
}

export default function LearnPage() {
  const lead = leadArticle();
  const river = latest();
  const mostRead = popular();

  return (
    <div className="wrap">
      {/* Section masthead. The site header sits above this. */}
      <header className="paper-masthead">
        <h1>Learn</h1>
        <p className="paper-dateline">
          Latest post {formatDate(latestDate())} · {learn.length}{" "}
          {learn.length === 1 ? "article" : "articles"}
        </p>
      </header>

      {/* The lead. Hand-picked, not driven by traffic. */}
      <article className="paper-lead">
        <Link href={`/learn/${lead.slug}`} aria-hidden tabIndex={-1}>
          <ArticleArt slug={lead.slug} art={lead.art} className="paper-lead-art" />
        </Link>
        <div className="paper-lead-body">
          <Tag audience={lead.audience} />
          <h2>
            <Link href={`/learn/${lead.slug}`}>{lead.title}</Link>
          </h2>
          <p className="paper-deck">{lead.description}</p>
          <p className="paper-card-meta">
            {readingTime(lead.slug)} min read · {formatDate(lead.date)}
          </p>
        </div>
      </article>

      <hr className="paper-rule" />

      {/* Two audiences, side by side on desktop, stacked on a phone. */}
      <div className="paper-cols">
        <Section audience="everyday" />
        <Section audience="builders" />

        <aside className="paper-rail" aria-label="Where to start">
          <div className="paper-rail-box">
            <p className="paper-kicker">Start here</p>
            <ol className="paper-rail-list">
              <li>
                <Link href="/story">What PREP is, in 3 minutes</Link>
              </li>
              <li>
                <a href="https://save.prep.md" rel="noopener noreferrer">
                  Save your first project
                </a>
              </li>
              <li>
                <Link href="/spec">The three files explained</Link>
              </li>
            </ol>
          </div>

          {/* Appears on its own once the archive is big enough to rank. */}
          {mostRead.length > 0 ? (
            <div className="paper-rail-popular">
              <h2 className="paper-section">Most read</h2>
              <ol className="paper-rail-list">
                {mostRead.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/learn/${e.slug}`}>{e.title}</Link>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </aside>
      </div>

      <hr className="paper-rule" />

      {/* The river. This is what carries the archive as it grows. */}
      <section aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="paper-section">
          Latest
        </h2>
        <ul className="paper-river">
          {river.map((e) => (
            <li key={e.slug}>
              <span className="paper-river-date">{formatShort(e.date)}</span>
              <Link href={`/learn/${e.slug}`} className="paper-river-title">
                {e.title}
              </Link>
              <Tag audience={e.audience} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
