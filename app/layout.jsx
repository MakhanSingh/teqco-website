import { Fira_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { SITE, ogBase } from '@/data/seo';
import './globals.css';

const fira = Fira_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'], display: 'swap', variable: '--font-fira' });


export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Teqco | Steel, Tools & Hardware Store in Condobolin NSW',
    template: '%s | Teqco Condobolin',
  },
  description: 'Teqco is Condobolin’s steel, tools and hardware store. Steel cut to size, roofing and mesh, welding gear, power and hand tools, fasteners, gas, trailers, sheds and more for farm, trade and home.',
  applicationName: 'Teqco',
  authors: [{ name: 'Teqco' }],
  creator: 'Teqco',
  publisher: 'Teqco',
  formatDetection: { telephone: true, email: true, address: true },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: { ...ogBase, url: SITE },
  twitter: { card: 'summary_large_image' },
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#194524' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={fira.variable}>
      <body>
        <JsonLd />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
