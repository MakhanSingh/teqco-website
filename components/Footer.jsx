import Link from 'next/link';
import { rangesAZ, store, settings } from '@/lib/cms';
import { FacebookIcon, LinkedInIcon } from './Icons';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="logo" href="/"><img src="/img/logo.jpg" alt="Teqco" width="1600" height="533" loading="lazy" /></Link>
            <p className="blurb">{settings.footer_blurb}</p>
            <div className="social">
              <a href={store.facebook} aria-label="Facebook" target="_blank" rel="noopener"><FacebookIcon /></a>
              <a href={store.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener"><LinkedInIcon /></a>
            </div>
          </div>
          <div>
            <h2>Quick links</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/products/">Products</Link></li>
              <li><Link href="/contact/">Contact Us</Link></li>
            </ul>
          </div>
          <div className="ranges">
            <h2>Ranges</h2>
            <div className="cols">
              {[rangesAZ.slice(0, Math.ceil(rangesAZ.length / 2)), rangesAZ.slice(Math.ceil(rangesAZ.length / 2))].map((col, i) => (
                <ul key={i}>
                  {col.map((r) => <li key={r.slug}><Link href={`/products/#${r.slug}`}>{r.title}</Link></li>)}
                </ul>
              ))}
            </div>
          </div>
          <div>
            <h2>Visit</h2>
            <ul>
              <li><a href={store.mapsUrl} target="_blank" rel="noopener">{store.address.split(', ')[0]}<br />{store.address.split(', ').slice(1).join(', ')}</a></li>
              <li><a href={store.tel}>{store.phone}</a></li>
              <li><a href={`mailto:${store.email}`}>{store.email}</a></li>
              <li>{store.hours}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="fbar">
        <div className="wrap">
          <span>Copyright © {new Date().getFullYear()} Teqco. All rights reserved.</span>
          <span className="credit">Created by <a href={store.agency.url} target="_blank" rel="noopener">{store.agency.name}</a></span>
        </div>
      </div>
    </footer>
  );
}
