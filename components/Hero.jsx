"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from './Icons';

const slides = [
  { img: '/img/hero-welding.jpg', h: 'Steel, tools and hardware for the rural, trade and handyman market', p: 'Teqco stocks a comprehensive range of steel sections, sheet and mesh, hand and power tools, fasteners and hardware, right here in Condobolin. Fast, friendly service from people who know the land.' },
  { img: '/img/steel.jpg', h: 'A vast selection of steel section, sheet and mesh', p: 'RHS, SHS, pipe, angle, flat bar and sheet in the sizes you need, plus in-store cutting and folding up to 3mm.' },
  { img: '/img/tools.jpg', h: 'The brands tradies trust, under one roof', p: 'HiKoki, Alpha Tools, KC Tools, Bossweld, Macnaught and more, with fasteners and hardware to match.' },
];
const DUR = 6000;

export default function Hero() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const first = useRef(true);
  const n = slides.length;
  const go = (k) => setI(((k % n) + n) % n);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
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
        <div key={sl.img} className={`slide${k === i ? ' on' : ''}`} style={{ backgroundImage: `url(${sl.img})` }} />
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
