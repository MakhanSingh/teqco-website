import { catalogues } from '@/data/ranges';

const PdfIcon = () => <svg viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M9 15h6M9 11h2" /></svg>;
const OutIcon = () => <svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8" /></svg>;

export default function Catalogues() {
  return (
    <section className="sec catalogues" id="catalogues">
      <div className="wrap">
        <div className="sec-row">
          <div>
            <span className="eyebrow">Product catalogues</span>
            <h2>Product brochures <em>and catalogues</em></h2>
          </div>
          <div className="side"><p>Browse the full ranges from some of the brands we stock. Catalogues open on the supplier's website.</p></div>
        </div>
        <ul className="catlist">
          {catalogues.map((c) => (
            <li key={c.name}>
              <a href={c.url} target="_blank" rel="noopener">
                <span className="ic"><PdfIcon /></span>
                <span className="name">{c.name}</span>
                <span className="out"><OutIcon /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
