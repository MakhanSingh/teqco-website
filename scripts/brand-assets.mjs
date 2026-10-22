// One-off generator for the favicon set and the social share (Open Graph) image.
// Run: node scripts/brand-assets.mjs
import sharp from 'sharp';

const logo = 'public/img/logo.jpg';

// Favicon: the "t" from the logo on a white square.
const t = await sharp(logo).extract({ left: 0, top: 0, width: 240, height: 440 }).toBuffer();
const square = async (size, out) => {
  const mark = await sharp(t).resize({ height: Math.round(size * 0.86) }).toBuffer();
  const { width } = await sharp(mark).metadata();
  return sharp({ create: { width: size, height: size, channels: 3, background: '#ffffff' } })
    .composite([{ input: mark, left: Math.round((size - width) / 2), top: Math.round(size * 0.07) }])
    .png().toFile(out);
};
await square(512, 'app/icon.png');
await square(180, 'app/apple-icon.png');

// Open Graph image 1200x630: welding photo, dark gradient, logo card bottom-left.
const logoSmall = await sharp(logo).resize({ width: 300 }).png().toBuffer();
const card = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".15"/><stop offset="1" stop-color="#000" stop-opacity=".65"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="64" y="434" width="372" height="132" rx="10" fill="#fff"/>
  <text x="64" y="408" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="700" fill="#fff">Steel, tools &amp; hardware · Condobolin NSW</text>
</svg>`);
await sharp('public/img/hero-welding.jpg').resize(1200, 630, { fit: 'cover' })
  .composite([{ input: card, left: 0, top: 0 }, { input: logoSmall, left: 100, top: 450 }])
  .jpeg({ quality: 82 }).toFile('public/og.jpg');
console.log('done');
