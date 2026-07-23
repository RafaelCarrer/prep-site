import Link from "next/link";
import type { Metadata } from "next";

const canonical = "https://prep.md/terms";

export const metadata: Metadata = {
  title: "Terms of Use — PREP Save",
  description:
    "The basic terms governing use of PREP Save: a client-side utility that helps you create, organise and verify Markdown project snapshots in your own Google Drive.",
  alternates: { canonical },
  openGraph: {
    title: "Terms of Use — PREP Save",
    description:
      "The basic terms governing use of PREP Save, a client-side project-memory utility for your own Google Drive.",
    url: canonical,
  },
};

export default function TermsPage() {
  return (
    <div className="wrap">
      <p className="eyebrow">
        <Link href="/" className="text-link">
          ← Home
        </Link>
      </p>
      <article className="spec-doc">
        <h1>Terms of Use — PREP Save</h1>
        <p>By using PREP Save, you agree to these Terms of Use.</p>
        <ul>
          <li>
            <strong>Service description:</strong> PREP Save is a client-side
            project-memory utility that helps users create, organise and verify
            Markdown project snapshots in their own Google Drive.
          </li>
          <li>
            <strong>User control:</strong> You remain responsible for the content
            you submit, the Google Drive folders you select and the management
            and backup of your files.
          </li>
          <li>
            <strong>Verification:</strong> PREP Save attempts to verify that a
            snapshot was written successfully, but you should still check
            important files in Google Drive and maintain appropriate backups.
          </li>
          <li>
            <strong>Availability:</strong> The service may be changed,
            interrupted or unavailable from time to time. It is provided without
            a promise of uninterrupted availability.
          </li>
          <li>
            <strong>Security scanner:</strong> PREP Save may display local
            heuristic warnings about possible passwords, payment details, API
            keys or other secrets. These warnings are not guaranteed to identify
            every sensitive item. Do not intentionally save secrets in PREP
            snapshots.
          </li>
          <li>
            <strong>Third-party services:</strong> PREP Save depends on Google
            Authentication and Google Drive. Your use of those services is also
            governed by Google&apos;s applicable terms and privacy policies.
          </li>
          <li>
            <strong>Liability:</strong> To the maximum extent permitted by
            applicable law, PREP Save is not responsible for losses caused by
            user error, deletion of Drive files, loss of access to a Google
            Account or failure to maintain backups. Nothing in these terms
            excludes or limits liability that cannot legally be excluded, or
            affects your statutory consumer rights.
          </li>
        </ul>

        <hr />
        <p>
          <em>Last updated: 23 July 2026.</em> See also our{" "}
          <Link href="/privacy" className="text-link">
            Privacy Notice
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
