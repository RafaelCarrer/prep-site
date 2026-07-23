import type { Metadata } from "next";
import { DownloadKick } from "@/components/download-kick";
import { home, READ_COMMAND, STARTER_ZIP, GITHUB_REPO } from "@/content/prep-copy";

export const metadata: Metadata = {
  title: "Download the PREP starter folder",
  description:
    "A ready-to-use PREP root folder. Drop it in your cloud drive and say: Read my PREP folder.",
  robots: { index: false },
};

export default function DownloadPage() {
  return (
    <div className="wrap">
      <section className="hero">
        <p className="eyebrow">Starter folder</p>
        <h1>Your download is starting…</h1>
        <p>
          If it doesn&apos;t begin automatically,{" "}
          <a href={STARTER_ZIP} download>
            download prep-starter.zip
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="inside-heading">
        <h2 id="inside-heading" className="section-heading">
          What&apos;s inside
        </h2>
        <p className="prose">
          A small zip — about 6&nbsp;KB, updated July&nbsp;2026 — containing a
          ready-to-use <code>PREP</code> folder:
        </p>
        <ul className="plain-list">
          <li>
            <code>PREP.md</code> — the entry point, with the exact save
            procedure written inside.
          </li>
          <li>
            <code>LOG.md</code> — an append-only history, ready for its first
            line.
          </li>
          <li>
            <code>prep-prompt.md</code> — the operating instructions any AI
            reads to learn the standard.
          </li>
          <li>
            <code>README.txt</code> — plain-English setup, no jargon.
          </li>
          <li>
            <code>memory/</code> — an empty folder for your session snapshots.
          </li>
        </ul>
        <p className="prose">
          Nothing runs; nothing phones home. It&apos;s plain text you can read
          first —{" "}
          <a href={GITHUB_REPO} rel="noopener noreferrer" className="text-link">
            inspect the contents on GitHub
          </a>
          .
        </p>
      </section>

      <section aria-labelledby="next-steps-heading" className="steps-block">
        <h2 id="next-steps-heading" className="section-heading">
          While it downloads — the two steps left
        </h2>
        <ol className="big-steps">
          {home.steps
            .filter((step) => step.n !== "1")
            .map((step) => (
              <li className="big-step" key={step.n}>
                <span className="big-step-num" aria-hidden="true">
                  {step.n}
                </span>
                <div className="big-step-body">
                  <h3>{step.heading}</h3>
                  <p>{step.body}</p>
                  {step.n === "3" ? (
                    <div className="command-line">
                      <code>{READ_COMMAND}</code>
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
        </ol>
        <p className="prose">
          That&apos;s the whole setup. From then on, talk normally — and when
          a conversation is worth keeping, save it with{" "}
          <a href="https://save.prep.md" className="text-link">
            PREP&nbsp;Save
          </a>
          , which writes the snapshot straight into this folder in your Drive.
        </p>
      </section>

      <DownloadKick href={STARTER_ZIP} />
    </div>
  );
}
