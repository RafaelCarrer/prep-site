import Link from "next/link";
import type { Metadata } from "next";
import { guides, articles } from "@/content/learn";
import { seo } from "@/content/seo";

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

export default function LearnPage() {
  const g = guides();
  const a = articles();
  return (
    <div className="wrap">
      <section className="hero">
        <p className="eyebrow">Learn</p>
        <h1>Guides, answers, and articles</h1>
        <p>
          How to use PREP with any AI — and what to do when a file connector
          gets in the way. Start with the troubleshooting guide, then read on.
        </p>
      </section>

      {g.length > 0 ? (
        <section aria-labelledby="guides-heading">
          <h2 id="guides-heading" className="section-heading">
            Guides
          </h2>
          <ul className="learn-list">
            {g.map((e) => (
              <li key={e.slug} className="learn-item">
                <Link href={`/learn/${e.slug}`} className="learn-link">
                  {e.title}
                </Link>
                <p className="learn-desc">{e.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <hr className="section-rule" />

      <section aria-labelledby="articles-heading">
        <h2 id="articles-heading" className="section-heading">
          Articles
        </h2>
        {a.length > 0 ? (
          <ul className="learn-list">
            {a.map((e) => (
              <li key={e.slug} className="learn-item">
                <Link href={`/learn/${e.slug}`} className="learn-link">
                  {e.title}
                </Link>
                <p className="learn-desc">{e.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="prose">More articles are on the way.</p>
        )}
      </section>
    </div>
  );
}
