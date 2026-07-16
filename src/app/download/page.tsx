import type { Metadata } from "next";
import { DownloadKick } from "@/components/download-kick";
import { STARTER_ZIP } from "@/content/prep-copy";

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
        <p>
          Next: move the <code>PREP</code> folder into your cloud drive, open
          your AI, and say <strong>Read my PREP folder</strong>.
        </p>
      </section>
      <DownloadKick href={STARTER_ZIP} />
    </div>
  );
}
