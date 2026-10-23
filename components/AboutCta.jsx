import Link from 'next/link';
import { store, settings as s } from '@/lib/cms';
import { PinIcon, ClockIcon, PhoneIcon } from './Icons';

export default function AboutCta() {
  return (
    <section className="ctaband" aria-label="Visit the store">
      <div className="wrap">
        <div>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Visit the store</span>
          <h2>{s.about_cta_heading}</h2>
          {s.about_cta_text.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}
          <div className="acts">
            <a className="btn btn-white" href={store.mapsUrl} target="_blank" rel="noopener">Get directions</a>
            <Link className="btn btn-ghost" href="/contact/">Contact us</Link>
          </div>
        </div>
        <div className="details">
          <div><PinIcon /><span><b>Address</b><a href={store.mapsUrl} target="_blank" rel="noopener">{store.address}</a></span></div>
          <div><ClockIcon /><span><b>Hours</b>{store.hoursLong}</span></div>
          <div><PhoneIcon /><span><b>Phone</b><a href={store.tel}>{store.phone}</a></span></div>
        </div>
      </div>
    </section>
  );
}
