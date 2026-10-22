import Link from 'next/link';
import { rangesAZ, store } from '@/data/ranges';
import { FacebookIcon, LinkedInIcon } from './Icons';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link className="logo" href="/"><img src="/img/logo.jpg" alt="Teqco" width="1600" height="533" loading="lazy" /></Link>
            <p className="blurb">Comprehensive retail outlet for the rural, trade and handyman market. Steel, tools, fasteners and hardware in Condobolin.</p>
            <div className="social">
              <a href={store.facebook} aria-label="Facebook" target="_blank" rel="noopener"><FacebookIcon /></a>
              <a href={store.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener"><LinkedInIcon /></a>
            </div>
          </div>
          <div>
            <h4>Quick links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about/">About</Link></li>
              <li><Link href="/products/">Products</Link></li>
              <li><Link href="/contact/">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4>Ranges</h4>
            <ul>
              {rangesAZ.map((r) => <li key={r.slug}><Link href={`/products/#${r.slug}`}>{r.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><a href={store.mapsUrl} target="_blank" rel="noopener">22 Bathurst Street<br />Condobolin NSW 2877</a></li>
              <li><a href={store.tel}>{store.phone}</a></li>
              <li><a href={`mailto:${store.email}`}>{store.email}</a></li>
              <li>Mon to Fri, 7am to 5pm</li>
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
