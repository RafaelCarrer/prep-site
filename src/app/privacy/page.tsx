import Link from "next/link";
import type { Metadata } from "next";
import { EMAIL } from "@/content/prep-copy";

const canonical = "https://prep.md/privacy";

export const metadata: Metadata = {
  title: "Privacy Notice — PREP Save",
  description:
    "How PREP Save handles your information: your snapshot content goes straight from your browser to your own Google Drive. PREP Save keeps no server-side copy.",
  alternates: { canonical },
  openGraph: {
    title: "Privacy Notice — PREP Save",
    description:
      "How PREP Save handles your information: your snapshot content goes straight from your browser to your own Google Drive.",
    url: canonical,
  },
};

export default function PrivacyPage() {
  return (
    <div className="wrap">
      <p className="eyebrow">
        <Link href="/" className="text-link">
          ← Home
        </Link>
      </p>
      <article className="spec-doc">
        <h1>Privacy Notice — PREP Save</h1>
        <p>
          Your snapshot content is sent directly from your browser to the
          Google Drive API. PREP Save does not maintain a server-side copy of
          your snapshot content.
        </p>

        <h2>When you use PREP Save</h2>
        <ul>
          <li>
            Your snapshot content is transmitted over HTTPS to Google Drive so
            that PREP Save can create, read back, verify and update files in the
            project folder you select.
          </li>
          <li>
            PREP Save accesses only the Google Drive files and folders required
            to provide the service, according to the permissions shown during
            Google sign-in.
          </li>
          <li>
            Google processes authentication and Drive API requests under
            Google&apos;s own terms and privacy policies.
          </li>
          <li>
            PREP Save does not sell your snapshot content or use it for
            advertising, profiling or AI model training.
          </li>
          <li>
            PREP Save does not intentionally send snapshot content to analytics,
            advertising or error-monitoring services.
          </li>
          <li>
            The Google Drive access token is held temporarily in the active
            application session and is not intentionally written by PREP Save to
            localStorage or cookies.
          </li>
          <li>
            Hosting, authentication and network providers may process limited
            technical information, such as IP addresses, browser information and
            security logs, as necessary to operate and protect their services.
          </li>
          <li>
            Files saved in Google Drive remain there until you delete or move
            them. You control those files through your Google Account.
          </li>
          <li>
            You can revoke PREP Save&apos;s Google access at any time through your
            Google Account security settings.
          </li>
        </ul>

        <h2>Controller and your rights</h2>
        <ul>
          <li>
            <strong>Data controller:</strong> Rafael Carrer (AMETI)
          </li>
          <li>
            <strong>Contact:</strong>{" "}
            <a href={`mailto:${EMAIL}`} className="text-link">
              {EMAIL}
            </a>
          </li>
          <li>
            <strong>Purpose of processing:</strong> To authenticate the user,
            display available PREP project folders and create, read, verify and
            update project files requested by the user.
          </li>
          <li>
            <strong>Lawful basis:</strong> Performance of the service requested
            by the user and, where applicable, our legitimate interests in
            maintaining the security and reliability of the service.
          </li>
        </ul>
        <p>
          For information about your data-protection rights, or to request
          access, correction or deletion of personal information controlled by
          PREP Save, contact us using the address above.
        </p>

        <p>
          <strong>Google API scope.</strong> PREP Save requests only the{" "}
          <code>drive.file</code> scope — per-file access limited to the files
          and folders it creates or that you open with it. It cannot see the
          rest of your Google Drive. PREP Save&apos;s use of information received
          from Google APIs adheres to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            rel="noopener noreferrer"
            className="text-link"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </p>

        <hr />
        <p>
          <em>Last updated: 23 July 2026.</em> See also our{" "}
          <Link href="/terms" className="text-link">
            Terms of Use
          </Link>
          .
        </p>
      </article>
    </div>
  );
}
