import Link from "next/link";
import type { Metadata } from "next";
import { CopyPromptButton } from "@/components/copy-prompt-button";
import { Slider } from "@/components/slider";
import { ShareButtons } from "@/components/share-buttons";
import { home, READ_COMMAND, STARTER_ZIP } from "@/content/prep-copy";
import { seo } from "@/content/seo";
import { PREP_PROMPT } from "@/content/prep-prompt";

export const metadata: Metadata = {
  title: seo.home.title,
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
        <p className="eyebrow">{home.hero.eyebrow}</p>
        <h1>{home.hero.headline}</h1>
        <p>{home.hero.body}</p>
      </section>

      <section aria-labelledby="steps-heading" className="steps-block">
        <h2 id="steps-heading" className="sr-only">
          Set up in three steps
        </h2>
        <ol className="big-steps">
          {home.steps.map((step) => (
            <li className="big-step" key={step.n}>
              <span className="big-step-num" aria-hidden="true">
                {step.n}
              </span>
              <div className="big-step-body">
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
                {step.n === "1" ? (
                  <a className="cta" href={STARTER_ZIP} download>
                    Download the starter folder
                  </a>
                ) : null}
                {step.n === "3" ? (
                  <div className="command-line">
                    <code>{READ_COMMAND}</code>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="commands-heading">
        <h2 id="commands-heading" className="section-heading">
          {home.commandsHeading}
        </h2>
        <p className="section-intro">{home.commandsIntro}</p>
        <div className="code-block">
          <pre>{home.commands}</pre>
        </div>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="value-heading">
        <h2 id="value-heading" className="section-heading">
          {home.valueHeading}
        </h2>
        <ul className="plain-list">
          {home.values.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>

      <Slider />

      <section aria-labelledby="tree-heading">
        <h2 id="tree-heading" className="section-heading">
          {home.treeHeading}
        </h2>
        <div className="code-block">
          <pre>{home.tree}</pre>
        </div>
        <p className="prose">{home.treeNote}</p>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="usecases-heading">
        <h2 id="usecases-heading" className="section-heading">
          {home.useCasesHeading}
        </h2>
        <div className="usecase-grid">
          {home.useCases.map((u) => (
            <article className="usecase" key={u.heading}>
              <h3>{u.heading}</h3>
              <p>{u.body}</p>
            </article>
          ))}
        </div>
      </section>

      <hr className="section-rule" />

      <section aria-labelledby="prompt-heading">
        <h2 id="prompt-heading" className="section-heading">
          {home.promptHeading}
        </h2>
        <p className="prose">{home.promptBody}</p>
        <div className="cta-row">
          <CopyPromptButton
            text={PREP_PROMPT}
            label="Copy the PREP prompt"
            fallbackId="prep-prompt-fallback"
          />
        </div>
      </section>

      <section className="callout" aria-labelledby="spec-heading">
        <h2 id="spec-heading" className="section-heading">
          {home.specHeading}
        </h2>
        <p className="prose">{home.specBody}</p>
        <div className="cta-row">
          <Link href="/spec" className="cta">
            Read the spec
          </Link>
          <a
            href="https://github.com/RafaelCarrer/prep.md"
            rel="noopener noreferrer"
            className="cta cta--ghost"
          >
            View on GitHub
          </a>
        </div>
        <ShareButtons />
      </section>
    </div>
  );
}
