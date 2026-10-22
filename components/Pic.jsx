import sizesManifest from '@/data/images.json';

const WIDTHS = [480, 800, 1200];

// Responsive WebP image. `src` is the original file name in public/img (e.g. "steel.jpg");
// scripts/images.mjs generates the /img/w/<name>-<width>.webp variants at build time.
export default function Pic({ src, alt = '', sizes = '100vw', priority = false, className, style }) {
  const base = src.replace(/\.(jpe?g|png)$/i, '');
  const meta = sizesManifest[src] || {};
  const avail = WIDTHS.filter((w, i) => i === 0 || w <= (meta.w || 99999));
  const srcSet = avail.map((w) => `/img/w/${base}-${w}.webp ${Math.min(w, meta.w || w)}w`).join(', ');
  const fallback = `/img/w/${base}-${avail[Math.min(1, avail.length - 1)]}.webp`;
  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={meta.w}
      height={meta.h}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? undefined : 'async'}
      className={className}
      style={style}
    />
  );
}
