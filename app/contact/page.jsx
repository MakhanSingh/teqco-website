import PageHero from '@/components/PageHero';
import ContactPage from '@/components/ContactPage';
import MapSection from '@/components/MapSection';

export const metadata = {
  title: 'Contact Teqco | Condobolin',
  description: 'Call Teqco on 02 6895 4180, visit us at 22 Bathurst Street Condobolin, or send an enquiry for a quote or trade account.',
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
