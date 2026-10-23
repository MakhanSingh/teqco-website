import { ClockIcon, PinIcon } from './Icons';
import { settings } from '@/lib/cms';

const CutIcon = () => <svg viewBox="0 0 24 24"><path d="M4 20L20 4M8 4H4v4M20 16v4h-4" /></svg>;
const icons = [ClockIcon, CutIcon, PinIcon];

export default function FactStrip() {
  return (
    <section className="facts" aria-label="Why Teqco">
      <div className="wrap">
        {settings.home_facts.slice(0, 3).map((f, i) => {
          const Icon = icons[i] || PinIcon;
          return <div className="cell" key={i}><div className="ic"><Icon /></div><b>{f.a}</b><span>{f.b}</span></div>;
        })}
      </div>
    </section>
  );
}
