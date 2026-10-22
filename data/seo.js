export const SITE = 'https://teqco.com.au';

// Shared Open Graph fields. Page files spread this into their own openGraph so
// the site name, locale and share image survive Next's per-page override.
export const ogBase = {
  type: 'website',
  locale: 'en_AU',
  siteName: 'Teqco',
  images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Teqco, steel, tools and hardware in Condobolin NSW' }],
};
