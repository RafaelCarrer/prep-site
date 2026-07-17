import { CopyLinkButton } from "./copy-link-button";

const DEFAULT_URL = "https://prep.md";
const DEFAULT_TEXT =
  "PREP — the memory belongs to the project, not the AI. Any AI opens the folder and continues where you left off.";
const DEFAULT_TITLE =
  "PREP — an open standard for AI-readable project folders";

const enc = encodeURIComponent;

export function ShareButtons({
  url = DEFAULT_URL,
  text = DEFAULT_TEXT,
  title = DEFAULT_TITLE,
}: {
  url?: string;
  text?: string;
  title?: string;
}) {
  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Reddit", href: `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(title)}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(text + " " + url)}` },
  ];
  return (
    <div className="share">
      <span className="share-label">Share:</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} rel="noopener noreferrer" className="share-link">
          {l.label}
        </a>
      ))}
      <CopyLinkButton url={url} />
    </div>
  );
}
