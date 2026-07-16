import type { Metadata } from "next";
import { DownloadKick } from "@/components/download-kick";
import { home, READ_COMMAND, STARTER_ZIP } from "@/content/prep-copy";

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
          a conversation is worth keeping, type <code>prep save</code>.
        </p>
      </section>

      <DownloadKick href={STARTER_ZIP} />
    </div>
  );
}
