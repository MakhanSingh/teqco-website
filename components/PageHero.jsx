import Link from 'next/link';
import Pic from './Pic';

export default function PageHero({ img, alt, crumb, title, text }) {
  return (
    <section className="pagehero" aria-label={title}>
      <Pic src={img.replace(/^\/img\//, '')} alt={alt} sizes="(max-width: 600px) 320px, 100vw" priority />
      <div className="wrap">
        <span className="crumbs"><Link href="/">Home</Link> / {crumb}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
