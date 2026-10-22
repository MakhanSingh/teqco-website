import Link from 'next/link';
import { rangesAZ, store } from '@/data/ranges';
import { CompressorIcon } from './Icons';

export function JumpList() {
  return (
    <nav className="jump" aria-label="Browse our product ranges">
      <div className="wrap">
        <span className="eyebrow">Browse Our Product Ranges</span>
        <ul>
          {rangesAZ.map((r) => <li key={r.slug}><a href={`#${r.slug}`}>{r.title}</a></li>)}
        </ul>
      </div>
    </nav>
  );
}

export function RangesList() {
  return (
    <section className="sec ranges" id="ranges">
      <div className="wrap">
        {rangesAZ.map((r) => (
          <article className="range" id={r.slug} key={r.slug}>
            <figure>
              {r.img
                ? <img src={`/img/${r.img}`} alt="" />
                : <div className="noimg"><CompressorIcon /></div>}
            </figure>
            <div className="body">
              <h2>{r.title}</h2>
              <p>{r.desc}</p>
              {r.brands.length > 0 && (
                <div className="chips">{r.brands.map((b) => <span key={b}>{b}</span>)}</div>
              )}
              <div className="acts">
                <Link className="btn btn-green" href="/contact/#enquiry">Get a quote</Link>
                <a className="btn btn-line" href={store.tel}>Call {store.phone}</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
