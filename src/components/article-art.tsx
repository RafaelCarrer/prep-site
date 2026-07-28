/**
 * Article art, drawn in code.
 *
 * Every cover is 1 to 2 KB of SVG instead of ~120 KB of image, so the whole
 * archive costs less than a single photo, and nothing has to be generated,
 * chosen, optimised or hosted when a piece is published. The look is a
 * technical-manual plate: flat line work in the house palette, which is
 * closer to the brand than any generated photograph would be.
 *
 * TO ADD A MOTIF: add a key to MOTIFS with its drawing, then use it in an
 * article's frontmatter as `art: <key>`. Nothing else needs to change.
 */
import type { LearnAudience } from "@/content/learn";

const GREEN = "#1E5C43";
const BRASS = "#9A7B45";
const PAPER = "#F7F6F1";
const INK = "#1C2420";

type Motif = {
  /** Plate background, so covers alternate and the page gets a rhythm. */
  bg: string;
  /** What the plate means, for the alt text. */
  label: string;
  draw: React.ReactNode;
};

export const MOTIFS: Record<string, Motif> = {
  // The three required files.
  files: {
    bg: PAPER,
    label: "Three stacked files",
    draw: (
      <>
        <g fill="none" stroke={GREEN} strokeWidth="2">
          <rect x="86" y="48" width="128" height="26" rx="3" />
          <rect x="86" y="86" width="128" height="26" rx="3" />
          <rect x="86" y="124" width="128" height="26" rx="3" />
        </g>
        <g fill={BRASS}>
          <circle cx="100" cy="61" r="3" />
          <circle cx="100" cy="99" r="3" />
          <circle cx="100" cy="137" r="3" />
        </g>
        <g fill="none" stroke={GREEN} strokeWidth="1.4" opacity=".45">
          <path d="M116 61h74M116 99h56M116 137h64" />
        </g>
      </>
    ),
  },

  // Moving a project from one model to another.
  switch: {
    bg: GREEN,
    label: "A project moving between two assistants",
    draw: (
      <>
        <g fill="none" stroke={PAPER} strokeWidth="2">
          <rect x="34" y="62" width="80" height="60" rx="4" />
          <rect x="186" y="62" width="80" height="60" rx="4" />
          <path d="M48 82h48M48 96h30M200 82h48M200 96h30" />
        </g>
        <path d="M124 92h44" stroke={BRASS} strokeWidth="2" strokeDasharray="6 5" />
        <path d="M168 86l10 6-10 6z" fill={BRASS} />
        <rect x="120" y="140" width="60" height="2" fill={BRASS} />
      </>
    ),
  },

  // Append-only history, one entry per session.
  timeline: {
    bg: PAPER,
    label: "A dated timeline of sessions",
    draw: (
      <>
        <path d="M40 100h220" stroke={GREEN} strokeWidth="2" />
        <g fill={GREEN}>
          <circle cx="70" cy="100" r="6" />
          <circle cx="130" cy="100" r="6" />
          <circle cx="190" cy="100" r="6" />
        </g>
        <circle cx="250" cy="100" r="8" fill={BRASS} />
        <g fill="none" stroke={GREEN} strokeWidth="1.3" opacity=".4">
          <path d="M70 88V64M130 88V64M190 88V64" />
          <path d="M58 60h24M118 60h24M178 60h24" />
        </g>
        <path d="M238 122h24" stroke={BRASS} strokeWidth="1.6" />
      </>
    ),
  },

  // The MAP: what to read, and when.
  map: {
    bg: INK,
    label: "A map of what to read and when",
    draw: (
      <>
        <g fill="none" stroke={PAPER} strokeWidth="1.5" opacity=".75">
          <path d="M60 50h180M60 80h180M60 110h180M60 140h180" />
          <path d="M100 40v110M160 40v110M220 40v110" />
        </g>
        <rect x="60" y="50" width="40" height="30" fill={BRASS} opacity=".9" />
        <rect x="160" y="110" width="60" height="30" fill={GREEN} opacity=".95" />
        <circle cx="130" cy="95" r="7" fill={BRASS} />
      </>
    ),
  },

  // The project folder itself.
  folder: {
    bg: GREEN,
    label: "An open project folder",
    draw: (
      <>
        <g fill="none" stroke={PAPER} strokeWidth="2">
          <path d="M92 64h28l8 12h80a4 4 0 014 4v56a4 4 0 01-4 4H92a4 4 0 01-4-4V68a4 4 0 014-4z" />
        </g>
        <g fill="none" stroke={PAPER} strokeWidth="1.4" opacity=".55">
          <rect x="108" y="94" width="56" height="7" rx="2" />
          <rect x="108" y="110" width="76" height="7" rx="2" />
        </g>
        <rect x="108" y="126" width="40" height="3" rx="1.5" fill={BRASS} />
      </>
    ),
  },

  // Snapshots piling up, session after session.
  layers: {
    bg: PAPER,
    label: "Snapshots stacking up over time",
    draw: (
      <>
        <g fill="none" stroke={GREEN} strokeWidth="2">
          <rect x="73" y="130" width="130" height="22" rx="3" />
          <rect x="81" y="104" width="130" height="22" rx="3" />
          <rect x="89" y="78" width="130" height="22" rx="3" />
        </g>
        <rect
          x="97"
          y="52"
          width="130"
          height="22"
          rx="3"
          fill="none"
          stroke={BRASS}
          strokeWidth="2"
        />
      </>
    ),
  },

  // The problem: pieces scattered, links broken.
  scatter: {
    bg: INK,
    label: "Fragments scattered, the connections broken",
    draw: (
      <>
        <g fill="none" stroke={PAPER} strokeWidth="1.6">
          <rect x="50" y="52" width="46" height="26" rx="3" opacity=".8" />
          <rect x="128" y="36" width="46" height="26" rx="3" opacity=".5" />
          <rect x="200" y="64" width="46" height="26" rx="3" opacity=".65" />
          <rect x="70" y="120" width="46" height="26" rx="3" opacity=".38" />
          <rect x="158" y="130" width="46" height="26" rx="3" opacity=".7" />
        </g>
        <g stroke={BRASS} strokeWidth="1.4" strokeDasharray="3 4" opacity=".75">
          <path d="M96 63l32-13M174 51l26 24M116 135l42 8" />
        </g>
      </>
    ),
  },

  // Passing the project from one hand to the next.
  handover: {
    bg: PAPER,
    label: "A project passed from one hand to another",
    draw: (
      <>
        <g fill="none" stroke={GREEN} strokeWidth="2">
          <path d="M84 58H60v84h24" />
          <path d="M216 58h24v84h-24" />
          <rect x="112" y="78" width="76" height="38" rx="4" />
        </g>
        <g stroke={GREEN} strokeWidth="1.4" opacity=".45">
          <path d="M126 92h48M126 104h30" />
        </g>
        <path d="M112 138h64" stroke={BRASS} strokeWidth="2" strokeDasharray="5 4" />
        <path d="M176 132l9 6-9 6z" fill={BRASS} />
      </>
    ),
  },

  // It stays in a drive you own.
  drive: {
    bg: GREEN,
    label: "A folder kept locked in a drive you own",
    draw: (
      <>
        <g fill="none" stroke={PAPER} strokeWidth="2">
          <path d="M92 60h28l8 12h80a4 4 0 014 4v60a4 4 0 01-4 4H92a4 4 0 01-4-4V64a4 4 0 014-4z" />
        </g>
        <g fill="none" stroke={BRASS} strokeWidth="2.2">
          <path d="M138 106v-9a12 12 0 0124 0v9" />
          <rect x="132" y="106" width="36" height="26" rx="3" />
        </g>
      </>
    ),
  },

  // Two things side by side.
  compare: {
    bg: PAPER,
    label: "Two approaches side by side",
    draw: (
      <>
        <g fill="none" stroke={GREEN} strokeWidth="2">
          <rect x="52" y="52" width="88" height="96" rx="4" />
          <rect x="160" y="52" width="88" height="96" rx="4" />
        </g>
        <g stroke={GREEN} strokeWidth="1.4" opacity=".45">
          <path d="M68 78h56M68 94h40M68 110h48" />
          <path d="M176 78h56M176 94h40M176 110h48" />
        </g>
        <path d="M150 58v84" stroke={BRASS} strokeWidth="1.6" strokeDasharray="4 5" />
      </>
    ),
  },

  // An agent reading the folder before it acts.
  agent: {
    bg: INK,
    label: "An agent reading the folder before it acts",
    draw: (
      <>
        <g fill="none" stroke={PAPER} strokeWidth="1.8">
          <rect x="46" y="70" width="52" height="64" rx="4" />
        </g>
        <g stroke={PAPER} strokeWidth="1.3" opacity=".5">
          <path d="M58 88h28M58 100h20M58 112h24" />
        </g>
        <path d="M104 102h34" stroke={BRASS} strokeWidth="1.6" strokeDasharray="4 4" />
        <path d="M138 96l9 6-9 6z" fill={BRASS} />
        <g fill="none" stroke={PAPER} strokeWidth="1.8">
          <circle cx="176" cy="102" r="16" />
          <circle cx="228" cy="72" r="10" />
          <circle cx="236" cy="128" r="10" />
          <path d="M190 94l28-14M191 111l35 12" />
        </g>
      </>
    ),
  },

  // Writing things down.
  notes: {
    bg: PAPER,
    label: "A written page with a folded corner",
    draw: (
      <>
        <g fill="none" stroke={GREEN} strokeWidth="2">
          <path d="M96 46h78l30 30v82a4 4 0 01-4 4H96a4 4 0 01-4-4V50a4 4 0 014-4z" />
          <path d="M174 46v30h30" />
        </g>
        <g stroke={GREEN} strokeWidth="1.4" opacity=".45">
          <path d="M112 96h72M112 112h56M112 128h64" />
        </g>
        <rect x="112" y="146" width="34" height="3" rx="1.5" fill={BRASS} />
      </>
    ),
  },
};

export type ArtMotif = keyof typeof MOTIFS;
const MOTIF_KEYS = Object.keys(MOTIFS);

/**
 * Deterministic pick, so a piece without an explicit motif still gets a
 * stable cover: the same slug always draws the same plate.
 */
function motifForSlug(slug: string): string {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum = (sum + slug.charCodeAt(i)) % 9973;
  return MOTIF_KEYS[sum % MOTIF_KEYS.length];
}

export function ArticleArt({
  slug,
  art,
  className,
}: {
  slug: string;
  art?: string;
  className?: string;
}) {
  const key = art && MOTIFS[art] ? art : motifForSlug(slug);
  const motif = MOTIFS[key];
  return (
    <svg
      viewBox="0 0 300 200"
      className={className}
      role="img"
      aria-label={motif.label}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="300" height="200" fill={motif.bg} />
      {motif.bg === PAPER ? (
        <rect width="300" height="200" fill="none" stroke="#1c242022" />
      ) : null}
      {motif.draw}
    </svg>
  );
}

/**
 * The banner over each audience section. Fixed per track, so readers learn
 * to recognise which shelf they are on without reading the heading.
 */
export function TrackBanner({ audience }: { audience: LearnAudience }) {
  if (audience === "everyday") {
    return (
      <svg
        viewBox="0 0 600 74"
        className="paper-banner"
        role="img"
        aria-label="Conversations gathered into one folder"
      >
        <rect width="600" height="74" fill={GREEN} />
        <g fill="none" stroke={PAPER} strokeWidth="1.6" opacity=".85">
          <rect x="34" y="20" width="52" height="30" rx="4" />
          <path d="M46 32h28M46 40h18" />
          <rect x="104" y="20" width="52" height="30" rx="4" />
          <path d="M116 32h28M116 40h18" />
          <rect x="174" y="20" width="52" height="30" rx="4" />
          <path d="M186 32h28M186 40h18" />
        </g>
        <path d="M240 37h74" stroke={BRASS} strokeWidth="1.6" strokeDasharray="5 4" />
        <path d="M308 32l8 5-8 5z" fill={BRASS} />
        <g fill="none" stroke={PAPER} strokeWidth="1.8">
          <path d="M334 24h22l5 6h44a3 3 0 013 3v20a3 3 0 01-3 3h-71a3 3 0 01-3-3V27a3 3 0 013-3z" />
        </g>
        <rect x="334" y="41" width="74" height="1.4" fill={BRASS} opacity=".8" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 600 74"
      className="paper-banner"
      role="img"
      aria-label="A file tree, brackets and linked nodes"
    >
      <rect width="600" height="74" fill={INK} />
      <g fill="none" stroke={PAPER} strokeWidth="1.5" opacity=".9">
        <path d="M40 22v34M40 30h16M40 40h16M40 50h16" />
        <rect x="60" y="24" width="46" height="11" rx="2" />
        <rect x="60" y="34" width="46" height="11" rx="2" />
        <rect x="60" y="44" width="46" height="11" rx="2" />
      </g>
      <path d="M128 37h60" stroke={BRASS} strokeWidth="1.5" strokeDasharray="4 4" />
      <g fill="none" stroke={BRASS} strokeWidth="1.8">
        <path d="M206 26l-10 11 10 11M236 26l10 11-10 11" />
      </g>
      <g fill="none" stroke={PAPER} strokeWidth="1.4" opacity=".55">
        <circle cx="300" cy="37" r="7" />
        <circle cx="340" cy="37" r="7" />
        <circle cx="380" cy="37" r="7" />
        <path d="M307 37h26M347 37h26" />
      </g>
      <rect x="410" y="30" width="150" height="1.4" fill={BRASS} opacity=".7" />
      <rect x="410" y="43" width="96" height="1.4" fill={PAPER} opacity=".35" />
    </svg>
  );
}
