import { store, rangesAZ } from '@/data/ranges';

const SITE = 'https://teqco.com.au';

// Structured data for Google: the store as a local business plus the site itself.
const business = {
  '@context': 'https://schema.org',
  '@type': ['HardwareStore', 'LocalBusiness'],
  '@id': `${SITE}/#store`,
  name: 'Teqco',
  alternateName: 'Teqco Condobolin (formerly CS Steel)',
  url: SITE,
  logo: `${SITE}/img/logo.jpg`,
  image: `${SITE}/og.jpg`,
  description: 'Steel, tools and hardware store in Condobolin NSW. Steel cut to size, roofing and mesh, welding equipment, power and hand tools, fasteners, gas, trailers, sheds, tanks and rural supplies.',
  telephone: '+61 2 6895 4180',
  email: store.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '22 Bathurst Street',
    addressLocality: 'Condobolin',
    addressRegion: 'NSW',
    postalCode: '2877',
    addressCountry: 'AU',
  },
  hasMap: store.mapsUrl,
  areaServed: ['Condobolin', 'Lachlan Valley', 'Central West NSW'],
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '17:00',
  }],
  sameAs: [store.facebook, store.linkedin],
  makesOffer: rangesAZ.map((r) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Product', name: r.title, url: `${SITE}/products/#${r.slug}` },
  })),
};

const site = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE}/#website`,
  url: SITE,
  name: 'Teqco',
  publisher: { '@id': `${SITE}/#store` },
  inLanguage: 'en-AU',
};

export default function JsonLd() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(site) }} />
    </>
  );
}
