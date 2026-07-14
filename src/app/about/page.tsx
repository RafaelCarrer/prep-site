import type { Metadata } from "next";
import {
  about,
  GITHUB_FOUNDER,
  GITHUB_DISCUSSIONS,
  AMETI,
  EMAIL,
} from "@/content/prep-copy";
import { seo } from "@/content/seo";

export const metadata: Metadata = {
  title: seo.about.title,
  description: seo.about.description,
  alternates: { canonical: seo.about.canonical },
  openGraph: {
    title: seo.about.title,
    description: seo.about.description,
    url: seo.about.canonical,
  },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <section className="hero">
        <p className="eyebrow">{about.hero.eyebrow}</p>
        <h1>{about.hero.headline}</h1>
        <p>{about.hero.body}</p>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="founder-heading">
        <h2 id="founder-heading" className="section-heading">
          {about.founder.heading}
        </h2>
        <p className="prose">{about.founder.body}</p>
        <div className="cta-row">
          <a href={GITHUB_FOUNDER} rel="noopener noreferrer" className="text-link">
            {about.founder.linkLabel}
          </a>
        </div>
      </section>

      <section aria-labelledby="what-heading">
        <h2 id="what-heading" className="section-heading">
          {about.what.heading}
        </h2>
        <p className="prose">{about.what.body}</p>
      </section>

      <section aria-labelledby="lane-heading">
        <h2 id="lane-heading" className="section-heading">
          {about.lane.heading}
        </h2>
        <p className="prose">{about.lane.body}</p>
      </section>

      <hr className="section-rule" />

      <section className="callout" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="section-heading">
          {about.contact.heading}
        </h2>
        <p className="prose">{about.contact.body}</p>
        <div className="cta-row">
          <a href={GITHUB_DISCUSSIONS} rel="noopener noreferrer" className="cta">
            Open a Discussion
          </a>
          <a href={`mailto:${EMAIL}`} className="cta cta--ghost">
            {EMAIL}
          </a>
        </div>
      </section>

      <section aria-labelledby="ameti-heading">
        <h2 id="ameti-heading" className="section-heading">
          {about.ameti.heading}
        </h2>
        <p className="prose">{about.ameti.body}</p>
        <div className="cta-row">
          <a href={AMETI} rel="noopener noreferrer" className="text-link">
            ameti.app
          </a>
        </div>
      </section>
    </div>
  );
}
