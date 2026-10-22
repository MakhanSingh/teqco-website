// Build-time image pipeline: every JPG/PNG in public/img becomes WebP at 480/800/1200 px
// in public/img/w/, plus data/images.json with intrinsic sizes for width/height attributes.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'public/img', OUT = 'public/img/w', WIDTHS = [480, 800, 1200];
await mkdir(OUT, { recursive: true });
const manifest = {};
for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const base = file.replace(/\.(jpe?g|png)$/i, '');
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  manifest[file] = { w: meta.width, h: meta.height };
  for (const w of WIDTHS) {
    if (w > meta.width && w !== WIDTHS[0]) continue;      // never upscale
    const outFile = path.join(OUT, `${base}-${w}.webp`);
    try { const s = await stat(outFile); const i = await stat(input); if (s.mtimeMs > i.mtimeMs) continue; } catch {}
    await sharp(input).rotate().resize({ width: Math.min(w, meta.width), withoutEnlargement: true }).webp({ quality: 74 }).toFile(outFile);
  }
}
await writeFile('data/images.json', JSON.stringify(manifest));
console.log('images: optimised', Object.keys(manifest).length, 'sources');
