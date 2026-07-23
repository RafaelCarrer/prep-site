import Link from "next/link";
import type { Metadata } from "next";
import { ShareButtons } from "@/components/share-buttons";
import { appHome, APP_URL, GITHUB_REPO } from "@/content/prep-copy";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  // Browser tab shows the clean brand "PREP.md" (matches the masthead
  // wordmark). The descriptive title is kept for search results and social
  // shares via openGraph/twitter below.
  title: "PREP.md",
  description: seo.home.description,
  alternates: { canonical: seo.home.canonical },
  openGraph: {
    title: seo.home.title,
    description: seo.home.description,
    url: seo.home.canonical,
  },
};

export default function HomePage() {
  return (
    <div className="wrap">
      <section className="hero">
        <p className="eyebrow">{appHome.hero.eyebrow}</p>
        <h1>{appHome.hero.headline}</h1>
        <p>{appHome.hero.body}</p>
        <div className="cta-row">
          <a className="cta" href={APP_URL}>
            {appHome.hero.cta} →
          </a>
        </div>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="steps-heading" className="steps-block">
        <h2 id="steps-heading" className="section-heading">
          {appHome.stepsHeading}
        </h2>
        <ol className="big-steps">
          {appHome.steps.map((step) => (
            <li className="big-step" key={step.n}>
              <span className="big-step-num" aria-hidden="true">
                {step.n}
              </span>
              <div className="big-step-body">
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="safety-heading">
        <h2 id="safety-heading" className="section-heading">
          {appHome.safetyHeading}
        </h2>
        <ul className="plain-list">
          {appHome.safety.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="cta-row">
          <a className="cta" href={APP_URL}>
            {appHome.hero.cta} →
          </a>
        </div>
      </section>

      <hr className="section-rule" />

      <section className="callout" aria-labelledby="standard-heading">
        <h2 id="standard-heading" className="section-heading">
          {appHome.standardHeading}
        </h2>
        <p className="prose">{appHome.standardBody}</p>
        <div className="cta-row">
          <Link href="/spec" className="cta cta--ghost">
            Read the spec
          </Link>
          <Link href="/learn" className="cta cta--ghost">
            Learn
          </Link>
          <a
            href={GITHUB_REPO}
            rel="noopener noreferrer"
            className="cta cta--ghost"
          >
            GitHub
          </a>
        </div>
        <ShareButtons />
      </section>
    </div>
  );
}
