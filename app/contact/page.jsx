import PageHero from '@/components/PageHero';
import ContactPage from '@/components/ContactPage';
import MapSection from '@/components/MapSection';
import FaqSection from '@/components/FaqSection';

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
        text="Product range, sizes, a quote for a cut or a trade account. Call, drop in, or send an enquiry and we will get back to you as soon as we can."
      />
      <ContactPage />
      <MapSection />
      <FaqSection tight />
    </>
  );
}
