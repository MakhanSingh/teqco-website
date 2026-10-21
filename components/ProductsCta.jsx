export default function ProductsCta() {
  return (
    <>
{/* CTA band */}
<section className="ctaband" aria-label="Get a quote">
  <div className="wrap">
    <div>
      <span className="eyebrow" style={{color:'rgba(255,255,255,.7)'}}>Something else?</span>
      <h2>Can't find what you're after?</h2>
      <p>If we don't have it on the shelf, we can usually source it. Call us or send an enquiry with sizes and quantities and we will come back with a price.</p>
      <div className="acts">
        <a className="btn btn-white" href="/contact/#enquiry">Send an enquiry</a>
        <a className="btn btn-ghost" href="tel:+61268954180">Call 02 6895 4180</a>
      </div>
    </div>
    <div className="details">
      <div><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg><span><b>Hours</b>Monday to Friday, 7:00am to 5:00pm</span></div>
      <div><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg><span><b>Address</b>22 Bathurst Street, Condobolin NSW 2877</span></div>
      <div><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg><span><b>Trade accounts</b>Available on request, settled monthly</span></div>
    </div>
  </div>
</section>
    </>
  );
}
