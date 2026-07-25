// Regenerates src/content/prep-prompt.ts from the canonical
// src/content/prep-prompt.md, so the embedded string can never drift from
// the markdown (tests/routes.spec.ts asserts they match exactly).
//
// Run by hand after editing the prompt:  node scripts/make-prompt-ts.mjs
// Kept out of the build on purpose: the prompt is content, not an asset,
// and a silent regeneration would hide a prompt change in a diff.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Same normalisation the test uses: LF endings, drop the leading HTML
// comment block, drop trailing blank lines.
const prompt = readFileSync(join(root, "src", "content", "prep-prompt.md"), "utf8")
  .replace(/\r\n/g, "\n")
  .replace(/^<!--[\s\S]*?-->\n\n/, "")
  .replace(/\n+$/, "");

const out = `// AUTO-GENERATED from src/content/prep-prompt.md by scripts/make-prompt-ts.mjs.
// Do not edit by hand: edit the markdown and re-run the script.
export const PREP_PROMPT = ${JSON.stringify(prompt)};
export const PREP_PROMPT_LENGTH = ${prompt.length};
`;

writeFileSync(join(root, "src", "content", "prep-prompt.ts"), out, "utf8");
console.log(`make-prompt-ts: wrote prep-prompt.ts (${prompt.length} chars)`);
