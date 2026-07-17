"use client";

import { useState } from "react";

// Copy-to-clipboard share button. This is how people share to Instagram,
// which offers no share-by-URL, and it also works for DMs, Telegram, etc.
// Copies a ready-to-paste line (title/description + URL), falling back to
// the bare url if no text is given.
export function CopyLinkButton({ url, text }: { url: string; text?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text ?? url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (old browser / insecure context): no-op.
    }
  }

  return (
    <button
      type="button"
      className="share-link share-copy"
      onClick={copy}
      aria-live="polite"
    >
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
