import Hero from '@/components/Hero';
import BrandMarquee from '@/components/BrandMarquee';
import ProductGrid from '@/components/ProductGrid';
import FactStrip from '@/components/FactStrip';
import AboutSection from '@/components/AboutSection';
import NewsSection from '@/components/NewsSection';
import FaqSection from '@/components/FaqSection';
import ContactHome from '@/components/ContactHome';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <ProductGrid />
      <FactStrip />
      <AboutSection />
      <NewsSection />
      <FaqSection />
      <ContactHome />
    </>
  );
}
