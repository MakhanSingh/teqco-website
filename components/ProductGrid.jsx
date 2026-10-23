import Link from 'next/link';
import Pic from './Pic';
import Em from './Em';
import { ranges, settings as s } from '@/lib/cms';

const Arrow = () => <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

export default function ProductGrid() {
  return (
    <section className="sec" id="products">
      <div className="wrap">
        <div className="sec-row">
          <div>
            <span className="eyebrow">{s.home_grid_eyebrow}</span>
            <h2><Em text={s.home_grid_heading} /></h2>
          </div>
          <div className="side">
            <p>{s.home_grid_text}</p>
            <a className="btn btn-line" href="/contact/#enquiry">Ask about a product</a>
          </div>
        </div>
        <div className="pgrid" id="pgrid">
          {ranges.map((r) => (
            <a className="pcard" href={`/products/#${r.slug}`} key={r.slug}>
              {r.img && <Pic src={r.img} alt={r.alt} sizes="(max-width:600px) 50vw, (max-width:1180px) 33vw, 330px" />}
              <div><div className="t">{r.title}</div><div className="s">{r.sub}</div></div>
              <span className="go"><i><Arrow /></i><span className="lbl">View more</span></span>
            </a>
          ))}
          <Link className="pcard quote" href="/contact/#enquiry">
            <div><span className="eyebrow">{s.home_quote_eyebrow}</span><div className="t">{s.home_quote_heading}</div><div className="s">{s.home_quote_text}</div></div>
            <span className="btn btn-white">{s.home_quote_button}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
