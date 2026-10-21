export default function AboutSection() {
  return (
    <>
{/* About */}
<section className="sec about" id="about">
  <div className="wrap">
    <figure>
      <img src="/img/about-tools.jpg" alt="Racks of hand tools in the Teqco workshop" />
      <span className="chip">22 Bathurst St, Condobolin</span>
    </figure>
    <div>
      <span className="eyebrow">About Teqco</span>
      <h2>Local know-how, <em>serious stock</em></h2>
      <p>We hold an extensive range of hand and power tools, fasteners, hardware and a vast selection of steel section. Formerly CS Steel, Teqco carries on the same products and services the district has relied on for years, with the same team behind the counter.</p>
      <ul>
        <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>Steel cut to length, sheet metal folded in-store</li>
        <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>Trade accounts for regular customers and crews</li>
        <li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>All major credit cards and cash accepted</li>
      </ul>
      <a className="btn btn-green" href="/contact/">Talk to the team</a>
    </div>
  </div>
</section>
    </>
  );
}
