"use client";
import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from './Icons';
import Pic from './Pic';
import { slides } from '@/lib/cms';

const DUR = 6000;

export default function Hero() {
  // Preload the LCP image; the other slides mount once the page is idle.
  const lcp = `/img/w/${slides[0].img.replace(/\.(jpe?g|png)$/i, '')}`;
  preload(`${lcp}-800.webp`, { as: 'image', fetchPriority: 'high', imageSrcSet: `${lcp}-480.webp 480w, ${lcp}-800.webp 800w, ${lcp}-1200.webp 1200w`, imageSizes: '(max-width: 600px) 320px, 100vw' });
  const [i, setI] = useState(0);
  const [rest, setRest] = useState(false);
  const [out, setOut] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const first = useRef(true);
  const n = slides.length;
  const go = (k) => setI(((k % n) + n) % n);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const t = setTimeout(() => setRest(true), 2500);
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => { clearTimeout(t); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  // Text slides up on every change except the first paint.
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (reduce) return;
    setOut(true);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOut(false)));
    return () => cancelAnimationFrame(id);
  }, [i, reduce]);

  // Autoplay: restarts whenever the slide changes; pauses on hover or hidden tab.
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), DUR);
    return () => clearInterval(t);
  }, [i, paused, reduce, n]);

  const fx = (base) => `${base} fx${out ? ' out' : ''}`;
  const s = slides[i];

  return (
    <section className="hero" id="hero" aria-label="Featured" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(document.hidden)}>
      {slides.map((sl, k) => (
        <div key={sl.img} className={`slide${k === i ? ' on' : ''}`} aria-hidden={k !== i}>{(k === 0 || rest || k === i) && <Pic src={sl.img} alt={sl.alt} sizes="(max-width: 600px) 320px, 100vw" priority={k === 0} />}</div>
      ))}
      <div className="wrap">
        <div id="heroText">
          <h1 className={fx('')}>{s.h}</h1>
          <p className={fx('')}>{s.p}</p>
        </div>
        <div className={fx('actions')}>
          {s.btn?.label && <Link className="btn btn-cta" href={s.btn.link || '/products/'}>{s.btn.label}</Link>}
          {s.btn2?.label && <Link className="btn btn-ghost" href={s.btn2.link || '/contact/#enquiry'}>{s.btn2.label}</Link>}
        </div>
        <div className="hero-ctl">
          <button id="prev" aria-label="Previous slide" onClick={() => go(i - 1)}><ChevronLeft /></button>
          <button id="next" aria-label="Next slide" onClick={() => go(i + 1)}><ChevronRight /></button>
          <div className="dots" id="dots">
            {slides.map((sl, k) => <i key={sl.img} className={k === i ? 'on' : undefined} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
