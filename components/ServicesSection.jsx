import Link from 'next/link';

const SteelIcon = () => <svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>;
const CutIcon = () => <svg viewBox="0 0 24 24"><path d="M4 20L20 4M8 4H4v4M20 16v4h-4" /></svg>;
const ToolsIcon = () => <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" /></svg>;

export default function ServicesSection() {
  return (
    <section className="sec" id="services" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="sec-row">
          <div>
            <span className="eyebrow">What we do</span>
            <h2>More than <em>just supplies</em></h2>
          </div>
          <div className="side"><p>From steel and hardware to custom sheet metal work, we offer practical solutions and helpful advice to keep your projects moving.</p></div>
        </div>
        <div className="svc">
          <article>
            <div className="ic"><SteelIcon /></div>
            <h3>Steel supply</h3>
            <p>From RHS and SHS to pipe, angle, flat bar, sheet metal, mesh and roofing, we stock a wide stock of steel products for farm, building and workshop projects. Cut-to-length options are available on selected products.</p>
            <Link href="/products/#steel">See the steel range</Link>
          </article>
          <article>
            <div className="ic"><CutIcon /></div>
            <h3>Cutting and folding</h3>
            <p>Need sheet metal cut or folded to size? We offer in-store guillotine cutting and folding for sheet metal up to 3mm thick. Get in touch to discuss your measurements and requirements.</p>
            <Link href="/contact/#enquiry">Ask for a quote</Link>
          </article>
          <article>
            <div className="ic"><ToolsIcon /></div>
            <h3>Tools and hardware</h3>
            <p>From hand and power tools to fasteners, fittings and everyday hardware, we carry the essentials for the workshop, the job site and around the property.</p>
            <Link href="/products/">Explore Our Product Range</Link>
          </article>
        </div>
      </div>
    </section>
  );
}
