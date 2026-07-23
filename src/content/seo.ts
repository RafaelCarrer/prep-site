export interface RouteSeo {
  path: string;
  canonical: string;
  title: string;
  description: string;
}

export const seo: Record<"home" | "spec" | "about" | "learn", RouteSeo> = {
  home: {
    path: "/",
    canonical: "https://prep.md",
    title: "PREP — Continue Your Projects in Any AI",
    description:
      "Save a conversation once into your own Google Drive, and any AI — ChatGPT, Claude, Gemini — picks it up exactly where you left off. Free, open, no lock-in.",
  },
  spec: {
    path: "/spec",
    canonical: "https://prep.md/spec",
    title: "PREP Specification v0.3",
    description:
      "The full PREP specification: a folder with PREP.md, LOG.md and memory/ that any AI can open and continue. Required core, behaviour, security, and scope.",
  },
  learn: {
    path: "/learn",
    canonical: "https://prep.md/learn",
    title: "Learn PREP — Guides, FAQ, and Articles",
    description:
      "Guides and answers for using PREP with any AI: troubleshooting connectors, PREP vs AGENTS.md, keeping project memory across ChatGPT, Claude and Gemini.",
  },
  about: {
    path: "/about",
    canonical: "https://prep.md/about",
    title: "About PREP — Mise en Place for AI Projects",
    description:
      "PREP is an open standard by Rafael Carrer, a kitchen manager in London who builds his own tools. Contact, contribute, and the story behind the standard.",
  },
};
