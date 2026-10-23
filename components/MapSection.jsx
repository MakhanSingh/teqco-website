import { settings as s, store } from '@/lib/cms';

export default function MapSection() {
  return (
    <>
{/* Map */}
<section className="sec map" aria-label="Find us">
  <div className="wrap">
    <div className="bar">
      <div>
        <h2>{s.contact_map_heading}</h2>
        <p>{s.contact_map_text}</p>
      </div>
      <a className="btn btn-green" href={store.mapsUrl} target="_blank" rel="noopener">Get directions</a>
    </div>
    <div className="frame">
      <div className="fallback"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg><span>{store.address}</span><a className="btn btn-line" href={store.mapsUrl} target="_blank" rel="noopener">Open in Google Maps</a></div>
      <iframe src={`https://www.google.com/maps?q=${encodeURIComponent(store.address)}&z=16&output=embed`} title={`Map showing Teqco at ${store.address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
    </div>
  </div>
</section>
    </>
  );
}
