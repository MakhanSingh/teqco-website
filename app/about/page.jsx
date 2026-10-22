import PageHero from '@/components/PageHero';
import StorySection from '@/components/StorySection';
import ServicesSection from '@/components/ServicesSection';
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
        title="Local know-how. The gear to get the job done."
        text="Your local stop for steel, tools, hardware and rural supplies in Condobolin. Whether you’re working on the farm, on the tools or tackling a job at home, we’re here to help you find what you need."
      />
      <StorySection />
      <ServicesSection />
      <BrandMarquee noTop />
      <AboutCta />
    </>
  );
}
