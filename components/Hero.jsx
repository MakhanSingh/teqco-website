"use client";
import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from './Icons';
import Pic from './Pic';

const slides = [
  { img: 'hero-welding.jpg', alt: 'Welder working with a MIG torch in a shower of sparks', h: 'Your local rural, trade and hardware supplier', p: 'Teqco stocks a comprehensive range of steel sections, sheet and mesh, hand and power tools, fasteners and hardware, right here in Condobolin. Fast, friendly service from people who know the land.' },
  { img: 'steel.jpg', alt: 'Stacked steel sheet ready for cutting', h: 'Steel for the jobs that matter', p: 'From RHS and SHS to sheet, mesh and roofing, we supply a wide range of steel products, with cutting to length and sheet metal folding up to 3mm.' },
  { img: 'tools.jpg', alt: 'Hand tools displayed on the Teqco store wall', h: 'Good gear for work and around the property.', p: "From HiKoki, Alpha Tools, KC Tools and Bossweld to fasteners, welding supplies, gas and farm essentials, Teqco has a wide range for rural, trade and home projects. Tell us what you're working on and we'll help you find what you need." },
];
const DUR = 6000;

export default function Hero() {
  // Preload the LCP image; the other slides mount once the page is idle.
  preload('/img/w/hero-welding-800.webp', { as: 'image', fetchPriority: 'high', imageSrcSet: '/img/w/hero-welding-480.webp 480w, /img/w/hero-welding-800.webp 800w, /img/w/hero-welding-1200.webp 1200w', imageSizes: '(max-width: 600px) 320px, 100vw' });
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
          <Link className="btn btn-cta" href="/products/">Browse Our Range</Link>
          <Link className="btn btn-ghost" href="/contact/#enquiry">Get a Quote</Link>
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
