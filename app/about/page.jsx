import PageHero from '@/components/PageHero';
import StorySection from '@/components/StorySection';
import ServicesSection from '@/components/ServicesSection';
import BrandMarquee from '@/components/BrandMarquee';
import AboutCta from '@/components/AboutCta';
import { ogBase } from '@/data/seo';
import { settings } from '@/lib/cms';

export const metadata = {
  title: 'About Us',
  description: 'Formerly CS Steel, Teqco is Condobolin’s locally run steel, tools and hardware store on the corner of Bathurst and Denison Streets, serving farmers, tradies and locals across the Lachlan Valley.',
  alternates: { canonical: '/about/' },
  openGraph: {
    ...ogBase,
    title: 'About Teqco | Condobolin’s steel, tools and hardware store',
    description: 'Formerly CS Steel. Steel supply and cutting, sheet metal folding, tools and hardware with local know-how.',
    url: '/about/',
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        img="/img/about-tools.jpg"
        alt="Racks of hand tools in the Teqco workshop"
        crumb="About"
        title={settings.about_hero_title}
        text={settings.about_hero_text}
      />
      <StorySection />
      <ServicesSection />
      <BrandMarquee noTop />
      <AboutCta />
    </>
  );
}
