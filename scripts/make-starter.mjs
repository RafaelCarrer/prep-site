// Builds public/prep-starter.zip: a ready-to-use "Projects/" root folder,
// with the exact canonical PREP prompt embedded as prep-prompt.md so the
// folder is self-installing — any AI that reads it learns how to run PREP.
import AdmZip from "adm-zip";
import { readFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

// Exact canonical prompt (bundled copy inside this repo).
const promptSrc = join(root, "src", "content", "prep-prompt.md");
const prompt = readFileSync(promptSrc, "utf8").replace(/\r\n/g, "\n");

const idLine =
  "> This project follows the PREP standard v0.2 — https://prep.md";

const rootPrep = `${idLine}

# My Projects

## ABOUT
This is the root folder for all your PREP projects. It is itself a PREP
project: its MAP is the catalogue of everything inside. Any AI reads this
first to find a project, or to create a new one.

## STATUS
Updated: ${today}
State: Empty — no projects yet.
Next action: Tell your AI what you're working on, then say "save this as a project".

## MAP
- prep-prompt.md — operating instructions. Any AI should read this FIRST to
  learn how to run the PREP standard (open a project / save / start a new one).
- (no projects yet — each project you save will appear here as one line:
  name, topic, status, last updated)

## RULES
- Follow prep-prompt.md. To open a project, read that project's own PREP.md,
  not this one.
`;

const rootLog = `# Log — My Projects (root)

## ${today}
Projects root created from the PREP starter kit (https://prep.md).
`;

const readme = `PREP — project memory for any AI
https://prep.md

HOW TO USE THIS FOLDER
1. Move this "Projects" folder into your cloud drive
   (Google Drive, Dropbox, OneDrive — anywhere your AI can read files).
2. Open ChatGPT, Claude, Gemini, or any AI chat with access to that drive.
3. Say:  Read my Projects folder

That's it. The AI reads prep-prompt.md and takes it from there — it can
save conversations as projects and reopen them later, in any AI.

The memory belongs to the project, not the AI.
`;

const zip = new AdmZip();
zip.addFile("Projects/PREP.md", Buffer.from(rootPrep, "utf8"));
zip.addFile("Projects/LOG.md", Buffer.from(rootLog, "utf8"));
zip.addFile("Projects/prep-prompt.md", Buffer.from(prompt, "utf8"));
zip.addFile("Projects/README.txt", Buffer.from(readme, "utf8"));
zip.addFile(
  "Projects/memory/.gitkeep",
  Buffer.from("Session snapshots are saved here.\n", "utf8")
);

const outDir = join(root, "public");
mkdirSync(outDir, { recursive: true });
zip.writeZip(join(outDir, "prep-starter.zip"));
console.log("make-starter: wrote public/prep-starter.zip");
