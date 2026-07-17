"use client";

import { useState } from "react";

// Copy-to-clipboard share button. This is how people share to Instagram,
// which offers no share-by-URL, and it also works for DMs, Telegram, etc.
export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
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
