import PageHero from '@/components/PageHero';
import ContactPage from '@/components/ContactPage';
import MapSection from '@/components/MapSection';
import { ogBase } from '@/data/seo';

export const metadata = {
  title: 'Contact Us',
  description: 'Call Teqco on 02 6895 4180, email sales@teqco.com.au or visit 22 Bathurst Street, Condobolin NSW 2877. Open Monday to Friday, 7am to 5pm. Send an enquiry for a quote.',
  alternates: { canonical: '/contact/' },
  openGraph: {
    ...ogBase,
    title: 'Contact Teqco | 22 Bathurst Street, Condobolin',
    description: 'Call 02 6895 4180, drop in Monday to Friday 7am to 5pm, or send an enquiry for a quote.',
    url: '/contact/',
  },
};

export default function Contact() {
  return (
    <>
      <PageHero
        img="/img/steel.jpg"
        alt="Stacked steel sheet"
        crumb="Contact Us"
        title="Got a question? Give us a call."
        text="Need help with our products, sizes or a quote? Whether you’re planning a job or looking for the right materials, give us a call, drop into the store or send us an enquiry. We’re happy to help."
      />
      <ContactPage />
      <MapSection />
    </>
  );
}
