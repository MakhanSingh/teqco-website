import Link from 'next/link';
import Em from './Em';
import { settings as s } from '@/lib/cms';

const SteelIcon = () => <svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>;
const CutIcon = () => <svg viewBox="0 0 24 24"><path d="M4 20L20 4M8 4H4v4M20 16v4h-4" /></svg>;
const ToolsIcon = () => <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" /></svg>;

// Icon and link for each service card, by position.
const extras = [
  { Icon: SteelIcon, href: '/products/#steel', label: 'See the steel range' },
  { Icon: CutIcon, href: '/contact/#enquiry', label: 'Ask for a quote' },
  { Icon: ToolsIcon, href: '/products/', label: null },
];

export default function ServicesSection() {
  return (
    <section className="sec" id="services" style={{ background: 'var(--surface)' }}>
      <div className="wrap">
        <div className="sec-row">
          <div>
            <span className="eyebrow">{s.about_services_eyebrow}</span>
            <h2><Em text={s.about_services_heading} /></h2>
          </div>
          <div className="side"><p>From steel and hardware to custom sheet metal work, we offer practical solutions and helpful advice to keep your projects moving.</p></div>
        </div>
        <div className="svc">
          {s.about_services.slice(0, 3).map((svc, i) => {
            const { Icon, href, label } = extras[i];
            return (
              <article key={i}>
                <div className="ic"><Icon /></div>
                <h3>{svc.title}</h3>
                <p>{svc.text}</p>
                <Link href={href}>{label || s.about_services_button}</Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
