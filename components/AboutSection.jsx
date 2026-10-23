import Link from 'next/link';
import Pic from './Pic';
import Em from './Em';
import { settings as s, store } from '@/lib/cms';

const CheckIcon = () => <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>;

export default function AboutSection() {
  return (
    <section className="sec about" id="about">
      <div className="wrap">
        <figure>
          <Pic src="about-tools.jpg" alt="Racks of hand tools in the Teqco workshop" sizes="(max-width:980px) 100vw, 560px" />
          <span className="chip">{store.addressShort.replace(/ NSW.*$/, '')}</span>
        </figure>
        <div>
          <span className="eyebrow">{s.home_about_eyebrow}</span>
          <h2><Em text={s.home_about_heading} /></h2>
          {s.home_about_paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          <ul>
            {s.home_about_points.map((pt, i) => <li key={i}><CheckIcon /><span><b>{pt.a}</b>{pt.b && ` – ${pt.b}`}</span></li>)}
          </ul>
          <Link className="btn btn-green" href="/contact/">{s.home_about_button}</Link>
        </div>
      </div>
    </section>
  );
}
