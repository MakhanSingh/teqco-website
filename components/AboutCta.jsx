import Link from 'next/link';
import { store } from '@/data/ranges';
import { PinIcon, ClockIcon, PhoneIcon } from './Icons';

export default function AboutCta() {
  return (
    <section className="ctaband" aria-label="Visit the store">
      <div className="wrap">
        <div>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Visit the store</span>
          <h2>Drop in and see us</h2>
          <p>You’ll find us on the corner of Bathurst and Denison Streets in Condobolin. Pop in, have a chat with the team and pick up what you need for the next job.</p>
          <p>Can't make it in? Give us a call or send through an enquiry and we'll be happy to help.</p>
          <div className="acts">
            <a className="btn btn-white" href={store.mapsUrl} target="_blank" rel="noopener">Get directions</a>
            <Link className="btn btn-ghost" href="/contact/">Contact us</Link>
          </div>
        </div>
        <div className="details">
          <div><PinIcon /><span><b>Address</b><a href={store.mapsUrl} target="_blank" rel="noopener">{store.address}</a></span></div>
          <div><ClockIcon /><span><b>Hours</b>{store.hours}</span></div>
          <div><PhoneIcon /><span><b>Phone</b><a href={store.tel}>{store.phone}</a></span></div>
        </div>
      </div>
    </section>
  );
}
