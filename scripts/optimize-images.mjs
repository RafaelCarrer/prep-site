// Converts the source slide PNGs (~1.8MB each) into web-sized WebP for the
// slider, plus a compressed JPG of slide-1 for OG/Twitter cards.
import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "public", "slides");
mkdirSync(dir, { recursive: true });

const slides = ["slide-1", "slide-2", "slide-3"];

for (const name of slides) {
  const src = join(dir, `${name}.png`);
  if (!existsSync(src)) {
    console.warn(`optimize-images: ${name}.png missing, skipping`);
    continue;
  }
  await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(dir, `${name}.webp`));
  console.log(`optimize-images: wrote ${name}.webp`);
}

// OG image: compressed JPG of slide-1 (WebP not ideal for all scrapers).
const s1 = join(dir, "slide-1.png");
if (existsSync(s1)) {
  await sharp(s1)
    .resize({ width: 1200 })
    .jpeg({ quality: 82 })
    .toFile(join(dir, "slide-1.jpg"));
  console.log("optimize-images: wrote slide-1.jpg (OG)");
}
