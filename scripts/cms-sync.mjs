// Pulls the site's content from the headless WordPress before each build:
//   data/cms.json      the full content payload (committed as a fallback snapshot)
//   public/img/<file>  every photo and logo the content references (downloaded when new or changed)
// If WordPress cannot be reached, the committed snapshot is used so builds never break.
import { readFile, writeFile, stat, utimes } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const CMS_URL = (process.env.CMS_URL || process.env.NEXT_PUBLIC_CMS_URL || 'https://wordpress-667011-6746624.cloudwaysapps.com').replace(/\/$/, '');
const SNAPSHOT = 'data/cms.json';
const IMG_DIR = 'public/img';

let content;
try {
  const res = await fetch(`${CMS_URL}/wp-json/teqco/v1/content`, { signal: AbortSignal.timeout(20000), headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  content = await res.json();
  if (!Array.isArray(content.ranges) || content.ranges.length === 0) throw new Error('empty content');
  await writeFile(SNAPSHOT, JSON.stringify(content, null, 2));
  console.log(`cms-sync: ${content.ranges.length} ranges, ${content.brands.length} brands, ${content.slides.length} slides from ${CMS_URL}`);
} catch (err) {
  if (!existsSync(SNAPSHOT)) { console.error(`cms-sync: cannot reach ${CMS_URL} and no snapshot exists: ${err.message}`); process.exit(1); }
  content = JSON.parse(await readFile(SNAPSHOT, 'utf8'));
  console.warn(`cms-sync: WARNING using committed snapshot, CMS unreachable (${err.message})`);
}

const images = [...content.ranges, ...content.brands, ...content.slides].map((x) => x.image).filter(Boolean);
let downloaded = 0;
for (const img of images) {
  const dest = `${IMG_DIR}/${img.file}`;
  const remoteTime = new Date(img.modified).getTime();
  if (existsSync(dest)) {
    const s = await stat(dest);
    if (s.mtimeMs >= remoteTime && s.size > 0) continue;
  }
  try {
    const res = await fetch(img.url, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    await utimes(dest, new Date(), new Date(remoteTime));
    downloaded++;
  } catch (err) {
    if (!existsSync(dest)) { console.error(`cms-sync: missing image ${img.file}: ${err.message}`); process.exit(1); }
    console.warn(`cms-sync: kept local ${img.file} (${err.message})`);
  }
}
console.log(`cms-sync: ${images.length} images referenced, ${downloaded} downloaded`);
