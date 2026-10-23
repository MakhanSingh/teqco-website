import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';
import { settings as s } from '@/lib/cms';

export default function ContactPage() {
  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <div>
          <span className="eyebrow">{s.contact_eyebrow}</span>
          <h2>{s.contact_heading}</h2>
          <p className="lead-p">{s.contact_text}</p>
          <ContactDetails />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
