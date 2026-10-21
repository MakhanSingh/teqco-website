import PageHero from '@/components/PageHero';
import StorySection from '@/components/StorySection';
import ServicesSection from '@/components/ServicesSection';
import FactStrip from '@/components/FactStrip';
import BrandMarquee from '@/components/BrandMarquee';
import AboutCta from '@/components/AboutCta';

export const metadata = {
  title: 'About Teqco | Condobolin',
  description: "Formerly CS Steel, Teqco is Condobolin's steel, tools and hardware store for the rural, trade and handyman market.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        img="/img/about-tools.jpg"
        alt="Racks of hand tools in the Teqco workshop"
        crumb="About"
        title="Local know-how, serious stock"
        text="Teqco is the comprehensive retail outlet for the rural, trade and handyman market on the corner of Bathurst and Denison Streets, Condobolin."
      />
      <StorySection />
      <ServicesSection />
      <FactStrip />
      <BrandMarquee noTop />
      <AboutCta />
    </>
  );
}
