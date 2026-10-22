import { ClockIcon, PinIcon } from './Icons';

const CutIcon = () => <svg viewBox="0 0 24 24"><path d="M4 20L20 4M8 4H4v4M20 16v4h-4" /></svg>;

export default function FactStrip() {
  return (
    <section className="facts" aria-label="Why Teqco">
      <div className="wrap">
        <div className="cell"><div className="ic"><ClockIcon /></div><b>Open from 7am</b><span>Get an early start with us. We're open Monday to Friday, 7am–5pm.</span></div>
        <div className="cell"><div className="ic"><CutIcon /></div><b>Steel cut to size</b><span>Need a particular length? Ask us about steel cutting and sheet metal folding up to 3mm.</span></div>
        <div className="cell"><div className="ic"><PinIcon /></div><b>Formerly CS Steel</b><span>Find us on the corner of Bathurst and Denison Streets. Drop in and have a chat with the team.</span></div>
      </div>
    </section>
  );
}
