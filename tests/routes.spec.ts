import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";
import AdmZip from "adm-zip";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");

// --- Canonical PREP prompt parity (bundled copy) ---
function canonicalPrompt(): string {
  let s = readFileSync(
    join(root, "src", "content", "prep-prompt.md"),
    "utf8"
  ).replace(/\r\n/g, "\n");
  s = s.replace(/^<!--[\s\S]*?-->\n\n/, "").replace(/\n+$/, "");
  return s;
}

function storedPrompt(): string {
  const ts = readFileSync(
    join(root, "src", "content", "prep-prompt.ts"),
    "utf8"
  );
  const m = ts.match(/PREP_PROMPT = (".*");/);
  assert.ok(m, "PREP_PROMPT literal not found");
  return JSON.parse(m![1]);
}

test("prompt integrity: embedded prompt matches canonical", () => {
  const c = canonicalPrompt();
  const s = storedPrompt();
  assert.equal(s, c);
  assert.ok(s.startsWith("# PREP v0.3"));
  assert.ok(s.includes("https://prep.md"));
  assert.ok(!s.includes("ameti.app/prep"));
  // Plain language only: the `prep …` command syntax was dropped in favour
  // of natural phrasing plus the one canonical open instruction.
  assert.ok(!s.includes("prep save"), "prompt still teaches the old command syntax");
  assert.ok(s.includes("There is no command language"));
  assert.ok(s.includes("«project folder»"));
  assert.ok(s.includes("save.prep.md"));
  assert.ok(s.includes("Never offer to save"));
  assert.ok(s.includes("default name `PREP/`"));
});

// --- Built static output ---
const pages = [
  { file: "index.html", must: ["Continue your projects in any AI.", "Save your first project", "save.prep.md", "Your files stay in your Google Drive", "How it works", "open standard", "og-prep.png"] },
  { file: "download/index.html", must: ["prep-starter.zip", "Read my PREP folder", "inside", "inspect the contents on GitHub"] },
  { file: "spec/index.html", must: ["PREP — Specification v0.3", "TOOLS.md", "Security"] },
  { file: "about/index.html", must: ["kitchen manager in London", "hello@prep.md", "AGENTS.md"] },
  // Newspaper layout: masthead + honest dateline, both audience sections,
  // the lead, and the dense river that carries the archive.
  { file: "learn/index.html", must: ["Latest post", "articles", "If you use AI", "If you build with AI", "Everyday", "Builders", "Start here", "Latest", "min read", "PREP vs AGENTS.md", "switch from ChatGPT to Claude", "Why AI forgets your project"] },
  { file: "learn/why-ai-forgets-your-project/index.html", must: ["PREP Save", "memory/", "The chat is temporary", "Published:", "Copy link"] },
  { file: "learn/prep-vs-agents-md/index.html", must: ["AGENTS.md tells a coding agent", "compose", "any AI", "Published:", "Copy link", "WhatsApp"] },
  { file: "learn/switch-chatgpt-to-claude/index.html", must: ["PREP Save", "memory/", "Published:", "Copy link"] },
];

for (const p of pages) {
  test(`route built: ${p.file}`, () => {
    const fp = join(out, p.file);
    assert.ok(existsSync(fp), `${p.file} not built`);
    const html = readFileSync(fp, "utf8");
    for (const needle of p.must) {
      assert.ok(html.includes(needle), `${p.file} missing: ${needle}`);
    }
  });
}

test("SEO title present", () => {
  assert.ok(
    readFileSync(join(out, "index.html"), "utf8").includes(
      "PREP: Continue Your Projects in Any AI"
    )
  );
});

// House style: no em dashes in published prose. Scripts and code samples are
// stripped first, because a fenced MAP example is file content, not writing.
// /spec is excluded: it carries the frozen identification line
// ("PREP standard v0.3 — https://prep.md") that every saved PREP.md and the
// prompt must match character for character, so it cannot be reflowed.
test("no em dashes in published prose", () => {
  const skip = new Set(["spec"]);
  const walk = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory()
        ? skip.has(e.name)
          ? []
          : walk(join(dir, e.name))
        : e.name === "index.html"
          ? [join(dir, e.name)]
          : []
    );
  for (const fp of walk(out)) {
    const prose = readFileSync(fp, "utf8")
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<pre[\s\S]*?<\/pre>/g, "");
    assert.ok(!prose.includes("—"), `em dash in ${relative(out, fp)}`);
  }
});

// The foot of every piece says who answers for it and what helped write it.
// A person is always the author: an AI is credited as help, never as author.
test("byline names a person and credits the models", () => {
  const html = readFileSync(join(out, "learn/why-ai-forgets-your-project/index.html"), "utf8");
  assert.ok(html.includes("Written by Rafael Carrer with ChatGPT"), "byline missing");
  assert.ok(!/Written by Claude/.test(html), "an AI must never be the author");
});

test("no forbidden routes and no Digita on the PREP site", () => {
  for (const bad of ["login", "dashboard", "digita"]) {
    assert.ok(!existsSync(join(out, bad)), `unexpected route: ${bad}`);
  }
  for (const f of ["index.html", "about/index.html", "spec/index.html"]) {
    const html = readFileSync(join(out, f), "utf8").toLowerCase();
    assert.ok(!html.includes("digita"), `Digita mentioned in ${f}`);
  }
});

test("robots.txt and sitemap.xml built", () => {
  const robots = readFileSync(join(out, "robots.txt"), "utf8");
  assert.ok(robots.includes("Sitemap: https://prep.md/sitemap.xml"));
  const sitemap = readFileSync(join(out, "sitemap.xml"), "utf8");
  for (const u of [
    "https://prep.md/",
    "https://prep.md/spec/",
    "https://prep.md/about/",
    "https://prep.md/learn/",
    "https://prep.md/learn/prep-vs-agents-md/",
  ]) {
    assert.ok(sitemap.includes(`<loc>${u}</loc>`), `sitemap missing ${u}`);
  }
});

test("llms.txt built for AI crawlers", () => {
  const llms = readFileSync(join(out, "llms.txt"), "utf8");
  assert.ok(llms.includes("# PREP"), "llms.txt missing PREP heading");
  assert.ok(llms.includes("https://prep.md/spec"), "llms.txt missing spec link");
});

test("raw spec markdown served at /spec.md", () => {
  const raw = readFileSync(join(out, "spec.md"), "utf8");
  assert.ok(raw.includes("PREP"), "spec.md missing content");
  assert.ok(raw.includes("v0.3"), "spec.md not the v0.3 spec");
});

test("starter zip built, well-formed, prompt exact", () => {
  const zipPath = join(out, "prep-starter.zip");
  assert.ok(existsSync(zipPath), "prep-starter.zip not built");
  const zip = new AdmZip(zipPath);
  const names = zip.getEntries().map((e) => e.entryName);
  for (const need of [
    "PREP/PREP.md",
    "PREP/LOG.md",
    "PREP/prep-prompt.md",
    "PREP/README.txt",
  ]) {
    assert.ok(names.includes(need), `zip missing ${need}`);
  }
  const embedded = zip
    .readAsText("PREP/prep-prompt.md")
    .replace(/\r\n/g, "\n")
    .replace(/^<!--[\s\S]*?-->\n\n/, "")
    .replace(/\n+$/, "");
  assert.equal(embedded, canonicalPrompt());
});

test("optimized slide assets exist and are light", () => {
  for (const n of ["slide-1.webp", "slide-2.webp", "slide-3.webp"]) {
    const fp = join(out, "slides", n);
    assert.ok(existsSync(fp), `${n} missing`);
    const kb = statSync(fp).size / 1024;
    assert.ok(kb < 400, `${n} too large: ${Math.round(kb)}KB`);
  }
  assert.ok(existsSync(join(out, "slides", "slide-1.jpg")), "OG jpg missing");
});
