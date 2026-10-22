import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

export default function ContactHome() {
  return (
    <section className="sec contact" id="contact">
      <div className="wrap">
        <div>
          <span className="eyebrow">Contact</span>
          <h2>Got a question? Give us a call.</h2>
          <p className="lead-p">Product range, sizes or a quote for a cut. Call, drop in, or send an enquiry and we will get back to you as soon as we can.</p>
          <ContactDetails />
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
