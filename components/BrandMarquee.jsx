import Pic from './Pic';
import { brands } from '@/lib/cms';

export default function BrandMarquee({ noTop = false }) {
  // The list is rendered twice so the CSS scroll loops seamlessly.
  const loop = [...brands, ...brands];
  return (
    <section className="brandband" aria-label="Brands we stock" style={noTop ? { borderTop: 0 } : undefined}>
      <div className="wrap">
        <span className="eyebrow">Brands we stock</span>
        <div className="marquee">
          <ul className="track">
            {loop.map((b, i) => (
              <li key={i} aria-hidden={i >= brands.length || undefined}><Pic src={b.img} alt={i >= brands.length ? '' : b.alt} sizes="160px" /></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
