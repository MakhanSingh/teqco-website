import Link from 'next/link';
import { store, settings as s } from '@/lib/cms';
import { ClockIcon, PinIcon, MailIcon } from './Icons';

export default function ProductsCta() {
  return (
    <section className="ctaband" aria-label="Get a quote">
      <div className="wrap">
        <div>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Something else?</span>
          <h2>{s.products_cta_heading}</h2>
          <p>{s.products_cta_text}</p>
          <div className="acts">
            <Link className="btn btn-white" href="/contact/#enquiry">Send an enquiry</Link>
            <a className="btn btn-ghost" href={store.tel}>Call {store.phone}</a>
          </div>
        </div>
        <div className="details">
          <div><ClockIcon /><span><b>Hours</b>{store.hoursLong}</span></div>
          <div><PinIcon /><span><b>Address</b><a href={store.mapsUrl} target="_blank" rel="noopener">{store.address}</a></span></div>
          <div><MailIcon /><span><b>Email</b><a href={`mailto:${store.email}`}>{store.email}</a></span></div>
        </div>
      </div>
    </section>
  );
}
