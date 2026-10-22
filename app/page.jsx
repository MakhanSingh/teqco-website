import Hero from '@/components/Hero';
import BrandMarquee from '@/components/BrandMarquee';
import ProductGrid from '@/components/ProductGrid';
import FactStrip from '@/components/FactStrip';
import AboutSection from '@/components/AboutSection';
import ContactHome from '@/components/ContactHome';
import { ogBase } from '@/data/seo';

export const metadata = {
  title: { absolute: 'Teqco | Steel, Tools & Hardware Store in Condobolin NSW' },
  description: 'Teqco is Condobolin’s steel, tools and hardware store. Steel cut to size, roofing and mesh, welding gear, power and hand tools, fasteners, gas, trailers, sheds and more for farm, trade and home.',
  alternates: { canonical: '/' },
  openGraph: {
    ...ogBase,
    title: 'Teqco | Steel, Tools & Hardware Store in Condobolin NSW',
    description: 'Steel, tools and hardware for farm, trade and home. 22 Bathurst Street, Condobolin. Open Monday to Friday from 7am.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <ProductGrid />
      <FactStrip />
      <AboutSection />
      <ContactHome />
    </>
  );
}
