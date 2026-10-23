// Typed-ish access to the CMS snapshot that scripts/cms-sync.mjs writes before each build.
import cms from '@/data/cms.json';

const byOrder = (a, b) => a.order - b.order || a.title.localeCompare(b.title, 'en-AU');

export const settings = cms.settings;

export const ranges = [...cms.ranges].sort(byOrder).map((r) => ({
  slug: r.slug, title: r.title, sub: r.subtitle, desc: r.description, brands: r.brands,
  img: r.image?.file || '', alt: r.image?.alt || '',
}));
export const rangesAZ = [...ranges].sort((a, b) => a.title.localeCompare(b.title, 'en-AU'));

export const brands = [...cms.brands].filter((b) => b.show && b.image).sort(byOrder).map((b) => ({
  title: b.title, img: b.image.file, alt: b.image.alt || b.title, website: b.website,
}));

export const slides = [...cms.slides].sort(byOrder).map((s) => ({
  img: s.image?.file || '', alt: s.image?.alt || '', h: s.heading, p: s.text, btn: s.button, btn2: s.button2,
}));

export const catalogues = [...cms.catalogues].sort(byOrder).map((c) => ({ name: c.title, url: c.url }));

const s = settings;
export const store = {
  phone: s.phone, tel: `tel:${(s.phone_tel || '').replace(/\s+/g, '')}`, email: s.email,
  address: s.address, addressShort: s.address_short, corner: s.corner,
  mapsUrl: s.maps_url, hours: s.hours_summary,
  hoursLong: s.hours_table?.[0] ? `${s.hours_table[0].a}, ${s.hours_table[0].b.replace(' – ', ' to ')}` : s.hours_summary,
  hoursTable: s.hours_table || [],
  facebook: s.facebook, linkedin: s.linkedin,
  agency: { name: 'Think Creative Agency', url: 'https://thinkcreativeagency.com.au' },
};
