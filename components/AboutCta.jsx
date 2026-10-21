export default function AboutCta() {
  return (
    <>
{/* CTA band */}
<section className="ctaband" aria-label="Visit the store">
  <div className="wrap">
    <div>
      <span className="eyebrow" style={{color:'rgba(255,255,255,.7)'}}>Visit the store</span>
      <h2>Come and see us on the corner of Bathurst and Denison</h2>
      <p>Plenty of room out front to load up the ute or trailer. Can't make it in? Call us or send an enquiry and we will sort it over the phone.</p>
      <div className="acts">
        <a className="btn btn-white" href="https://www.google.com/maps/search/22+Bathurst+Street+Condobolin+NSW+2877" target="_blank" rel="noopener">Get directions</a>
        <a className="btn btn-ghost" href="/contact/">Contact us</a>
      </div>
    </div>
    <div className="details">
      <div><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg><span><b>Address</b>22 Bathurst Street, Condobolin NSW 2877</span></div>
      <div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg><span><b>Hours</b>Monday to Friday, 7:00am to 5:00pm</span></div>
      <div><svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg><span><b>Phone</b>02 6895 4180</span></div>
    </div>
  </div>
</section>
    </>
  );
}
