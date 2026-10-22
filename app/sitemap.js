const SITE = 'https://teqco.com.au';
export const dynamic = 'force-static';

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: `${SITE}/`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/products/`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/about/`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/contact/`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
