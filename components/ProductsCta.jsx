import Link from 'next/link';
import { store } from '@/data/ranges';
import { ClockIcon, PinIcon, MailIcon } from './Icons';

export default function ProductsCta() {
  return (
    <section className="ctaband" aria-label="Get a quote">
      <div className="wrap">
        <div>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Something else?</span>
          <h2>Can't find what you're after?</h2>
          <p>If we don't have it on the shelf, we can usually source it. Call us or send an enquiry with sizes and quantities and we will come back with a price.</p>
          <div className="acts">
            <Link className="btn btn-white" href="/contact/#enquiry">Send an enquiry</Link>
            <a className="btn btn-ghost" href={store.tel}>Call {store.phone}</a>
          </div>
        </div>
        <div className="details">
          <div><ClockIcon /><span><b>Hours</b>{store.hours}</span></div>
          <div><PinIcon /><span><b>Address</b><a href={store.mapsUrl} target="_blank" rel="noopener">{store.address}</a></span></div>
          <div><MailIcon /><span><b>Email</b><a href={`mailto:${store.email}`}>{store.email}</a></span></div>
        </div>
      </div>
    </section>
  );
}
