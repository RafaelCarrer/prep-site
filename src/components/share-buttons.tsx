const URL = "https://prep.md";
const TEXT = "PREP — the memory belongs to the project, not the AI. Any AI opens the folder and continues where you left off.";

const enc = encodeURIComponent;

const links = [
  { label: "Share on X", href: `https://twitter.com/intent/tweet?text=${enc(TEXT)}&url=${enc(URL)}` },
  { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(URL)}` },
  { label: "Share on Reddit", href: `https://www.reddit.com/submit?url=${enc(URL)}&title=${enc("PREP — an open standard for AI-readable project folders")}` },
  { label: "Share on WhatsApp", href: `https://wa.me/?text=${enc(TEXT + " " + URL)}` },
];

export function ShareButtons() {
  return (
    <div className="share">
      <span className="share-label">Share:</span>
      {links.map((l) => (
        <a key={l.label} href={l.href} rel="noopener noreferrer" className="share-link">
          {l.label.replace("Share on ", "")}
        </a>
      ))}
    </div>
  );
}
