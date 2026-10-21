export default function ServicesSection() {
  return (
    <>
{/* What we do */}
<section className="sec" id="services" style={{background:'var(--surface)'}}>
  <div className="wrap">
    <div className="sec-row">
      <div>
        <span className="eyebrow">What we do</span>
        <h2>More than a <em>shop counter</em></h2>
      </div>
      <div className="side"><p>Stock is only half of it. We cut, fold, source and advise, so you leave with the right thing for the job.</p></div>
    </div>
    <div className="svc">
      <article>
        <div className="ic"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg></div>
        <h3>Steel supply</h3>
        <p>RHS, SHS, pipe, angle, flat bar, sheet, mesh and roofing from Steeline, Lysaght and Arc Metalcentre, cut to length on request.</p>
        <a href="/#products">See the steel range</a>
      </article>
      <article>
        <div className="ic"><svg viewBox="0 0 24 24"><path d="M4 20L20 4M8 4H4v4M20 16v4h-4" /></svg></div>
        <h3>Cutting and folding</h3>
        <p>Guillotine cutting and folding of sheet metal up to 3mm for flashings, brackets, boxes and one-off jobs, ready while you wait or for pick-up.</p>
        <a href="/contact/#enquiry">Ask for a quote</a>
      </article>
      <article>
        <div className="ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg></div>
        <h3>Trade accounts</h3>
        <p>Regular customers and crews can open a trade account, pick up what they need and settle monthly. All major credit cards and cash accepted too.</p>
        <a href="/contact/#enquiry">Apply for an account</a>
      </article>
    </div>
  </div>
</section>
    </>
  );
}
