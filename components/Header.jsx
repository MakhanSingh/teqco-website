"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ranges, store } from '@/data/ranges';
import { PhoneIcon, PinIcon, MailIcon, ClockIcon, ChevronDown, FacebookIcon, LinkedInIcon } from './Icons';

const nav = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about/', label: 'About', key: 'about' },
  { href: '/products/', label: 'Products', key: 'products', dropdown: true },
  { href: '/contact/', label: 'Contact Us', key: 'contact' },
];

function activeKey(pathname) {
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/products')) return 'products';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
}

export default function Header() {
  const pathname = usePathname() || '/';
  const active = activeKey(pathname);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="site-head">
      <div className="topbar">
        <div className="wrap">
          <ul>
            <li><PinIcon /><span>22 Bathurst St, Condobolin NSW 2877</span></li>
            <li><MailIcon /><a href={`mailto:${store.email}`}>{store.email}</a></li>
            <li><ClockIcon /><span>Mon to Fri, 7am to 5pm</span></li>
          </ul>
          <div className="social">
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
      </div>

      <header className="nav">
        <div className="wrap">
          <Link className="logo" href="/" aria-label="Teqco home"><img src="/img/logo.jpg" alt="Teqco" /></Link>
          <nav aria-label="Main">
            <ul className="menu">
              {nav.map((item) => (
                <li key={item.key} className={item.dropdown ? 'has-dd' : undefined}>
                  <Link
                    href={item.href}
                    className={[item.dropdown ? 'has-sub' : '', active === item.key ? 'on' : ''].filter(Boolean).join(' ') || undefined}
                    aria-haspopup={item.dropdown ? 'true' : undefined}
                  >
                    {item.label}{item.dropdown && <ChevronDown />}
                  </Link>
                  {item.dropdown && (
                    <div className="dd">
                      <ul>
                        {ranges.map((r) => (
                          <li key={r.slug}><Link href={`/products/#${r.slug}`}>{r.title}</Link></li>
                        ))}
                      </ul>
                      <Link className="all" href="/products/">View all products <span>&rarr;</span></Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <a className="call" href={store.tel} aria-label={`Call Teqco on ${store.phone}`}>
              <span className="ic"><PhoneIcon /></span>
              <span className="txt"><span className="lbl">Call us now</span><span className="num">{store.phone}</span></span>
            </a>
            <button
              className={`burger${open ? ' is-open' : ''}`}
              id="burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-controls="mnav"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <div><span></span><span></span><span></span></div>
            </button>
          </div>
        </div>
      </header>

      <nav className={`mnav${open ? ' open' : ''}`} id="mnav" aria-label="Mobile">
        <div className="wrap">
          <Link href="/" className={active === 'home' ? 'on' : undefined} onClick={close}>Home</Link>
          <Link href="/about/" className={active === 'about' ? 'on' : undefined} onClick={close}>About</Link>
          <details className="mdd" open={active === 'products'}>
            <summary className={active === 'products' ? 'on' : undefined}>Products <ChevronDown /></summary>
            <ul>
              {ranges.map((r) => (
                <li key={r.slug}><Link href={`/products/#${r.slug}`} onClick={close}>{r.title}</Link></li>
              ))}
              <li><Link href="/products/" onClick={close}><b>View all products</b></Link></li>
            </ul>
          </details>
          <Link href="/contact/" className={active === 'contact' ? 'on' : undefined} onClick={close}>Contact Us</Link>
        </div>
      </nav>
    </div>
  );
}
