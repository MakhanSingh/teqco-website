import { store } from '@/data/ranges';
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from './Icons';

// Labelled contact block used on the Contact page and the home contact section.
export default function ContactDetails() {
  return (
    <dl className="cdetails">
      <div>
        <dt><PhoneIcon /> Phone</dt>
        <dd><a href={store.tel}>{store.phone}</a></dd>
      </div>
      <div>
        <dt><MailIcon /> Email</dt>
        <dd><a href={`mailto:${store.email}`}>{store.email}</a></dd>
      </div>
      <div>
        <dt><PinIcon /> Find Us</dt>
        <dd><a href={store.mapsUrl} target="_blank" rel="noopener">{store.address}<br />{store.corner}</a></dd>
      </div>
      <div>
        <dt><ClockIcon /> Opening Hours</dt>
        <dd>
          <span className="hrow"><span>Monday to Friday</span><b>7:00am – 5:00pm</b></span>
          <span className="hrow"><span>Saturday</span><b className="closed">Closed</b></span>
          <span className="hrow"><span>Sunday</span><b className="closed">Closed</b></span>
        </dd>
      </div>
    </dl>
  );
}
