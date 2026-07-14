"use client";

import { useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

export function CopyPromptButton({
  text,
  label,
  fallbackId,
}: {
  text: string;
  label: string;
  fallbackId: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("failed");
      // Expose the manual-copy fallback and move focus to it.
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (el) {
          el.focus();
          el.select();
        }
      });
    }
  }

  return (
    <div className="copy-prompt">
      <button type="button" className="copy-button" onClick={handleCopy}>
        {status === "copied" ? "Copied" : label}
      </button>
      <span role="status" aria-live="polite" className="copy-status">
        {status === "copied" ? "Prompt copied to your clipboard." : ""}
      </span>

      {status === "failed" ? (
        <div className="copy-fallback">
          <label htmlFor={fallbackId}>
            Copy did not work automatically. Select all the text below and copy
            it manually.
          </label>
          <textarea
            id={fallbackId}
            ref={textareaRef}
            className="copy-fallback-text"
            readOnly
            rows={12}
            value={text}
          />
        </div>
      ) : null}
    </div>
  );
}
