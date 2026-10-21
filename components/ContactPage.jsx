import ContactForm from "./ContactForm";
export default function ContactPage() {
  return (
    <>
{/* Contact */}
<section className="sec contact" id="contact">
  <div className="wrap">
    <div>
      <span className="eyebrow">Contact details</span>
      <h2>Call, email or drop in</h2>
      <p className="lead-p">The quickest way to get an answer is to call the store. For quotes with sizes and quantities, the form works well too.</p>
      <span className="num">02 6895 4180</span>
      <p className="mail">terry@teqco.com.au</p>
      <div className="addr"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg><span>22 Bathurst Street, Condobolin NSW 2877<br />Corner of Bathurst and Denison Streets</span></div>
      <div className="hours">
        <div><span>Monday to Friday</span><span>7:00am to 5:00pm</span></div>
        <div><span>Saturday</span><span className="closed">Closed</span></div>
        <div><span>Sunday</span><span className="closed">Closed</span></div>
      </div>
    </div>
    <ContactForm />
  </div>
</section>
    </>
  );
}
