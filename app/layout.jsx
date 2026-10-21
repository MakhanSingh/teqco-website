import { Fira_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const fira = Fira_Sans({ weight: ['400', '500', '600', '700', '800'], subsets: ['latin'], display: 'swap', variable: '--font-fira' });

export const metadata = {
  title: 'Teqco | Steel, Tools & Hardware, Condobolin',
  description: 'Teqco, Condobolin: steel, roofing, welding, tools, fasteners, sheds and hardware for the rural, trade and handyman market.',
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={fira.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
