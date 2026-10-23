import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';
import { settings as s } from '@/lib/cms';

export default function ContactHome() {
  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <div>
          <span className="eyebrow">{s.home_contact_eyebrow}</span>
          <h2>{s.home_contact_heading}</h2>
          <p className="lead-p">{s.home_contact_text}</p>
          <ContactDetails />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
