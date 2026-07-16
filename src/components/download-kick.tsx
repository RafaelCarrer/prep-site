"use client";

import { useEffect } from "react";

// Kicks off the file download after the page view has been counted.
export function DownloadKick({ href }: { href: string }) {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.assign(href);
    }, 600);
    return () => clearTimeout(t);
  }, [href]);
  return null;
}
