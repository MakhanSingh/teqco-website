import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

export default function ContactPage() {
  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <div>
          <span className="eyebrow">Contact details</span>
          <h2>Call, email or drop in</h2>
          <p className="lead-p">For a quick answer, give us a call or pop into the store. If you need a quote, send through your sizes and quantities using the form below, and we’ll get back to you as soon as we can.</p>
          <ContactDetails />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
