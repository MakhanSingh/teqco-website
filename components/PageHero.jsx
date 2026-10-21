import Link from 'next/link';

export default function PageHero({ img, alt, crumb, title, text }) {
  return (
    <section className="pagehero" aria-label={title}>
      <img src={img} alt={alt} />
      <div className="wrap">
        <span className="crumbs"><Link href="/">Home</Link> / {crumb}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
