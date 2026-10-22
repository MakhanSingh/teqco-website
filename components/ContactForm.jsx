"use client";
import { useState } from 'react';
import { rangesAZ as ranges, store } from '@/data/ranges';
import { WEB3FORMS_KEY, WEB3FORMS_URL } from '@/data/forms';

const TYPE_LABEL = { general: 'General enquiry', quote: 'Quote request' };

export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const d = new FormData(f);
    // Honeypot: real visitors never see or tick this box.
    if (d.get('botcheck')) { setStatus('ok'); f.reset(); return; }

    const type = TYPE_LABEL[d.get('type')] || 'Enquiry';
    const area = d.get('area');
    const name = `${d.get('fname')} ${d.get('lname')}`.trim();
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `${type} – ${area} (teqco.com.au)`,
      from_name: 'Teqco website',
      name,
      email: d.get('email'),
      phone: d.get('phone') || 'Not provided',
      enquiry_type: type,
      area_of_enquiry: area,
      message: d.get('msg'),
    };

    setStatus('sending');
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) { setStatus('ok'); f.reset(); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  const sending = status === 'sending';
  return (
    <form className="form" id="enquiry" noValidate onSubmit={onSubmit}>
      <h3>Send an enquiry</h3>
      <p className="req">* indicates required fields</p>
      <div className="row">
        <div><label htmlFor="fname">First name *</label><input id="fname" name="fname" required autoComplete="given-name" /></div>
        <div><label htmlFor="lname">Last name *</label><input id="lname" name="lname" required autoComplete="family-name" /></div>
      </div>
      <div className="row">
        <div><label htmlFor="email">Email *</label><input id="email" name="email" type="email" required autoComplete="email" /></div>
        <div><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
      </div>
      <div className="full">
        <label>Enquiry type *</label>
        <div className="radios">
          <label><input type="radio" name="type" id="type-gen" value="general" defaultChecked /> General enquiry</label>
          <label><input type="radio" name="type" id="type-quote" value="quote" /> Quote request</label>
        </div>
      </div>
      <div className="full">
        <label htmlFor="area">Area of enquiry *</label>
        <select id="area" name="area" defaultValue={ranges[0].title}>
          {ranges.map((r) => <option key={r.slug} value={r.title}>{r.title}</option>)}
          <option value="Sheet metal cutting & folding">Sheet metal cutting &amp; folding</option><option value="Something else">Something else</option>
        </select>
      </div>
      <div className="full">
        <label htmlFor="msg">Your message *</label>
        <textarea id="msg" name="msg" required placeholder="Tell us what you need, sizes and quantities if you know them."></textarea>
      </div>
      <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button className="btn btn-cta" type="submit" disabled={sending} aria-busy={sending}>
        {sending ? 'Sending…' : 'Send enquiry'}
      </button>
      <p className={`ok${status === 'ok' ? ' show' : ''}`} role="status" aria-live="polite">
        Thanks, your enquiry has been sent. We’ll be in touch soon.
      </p>
      <p className={`err${status === 'error' ? ' show' : ''}`} role="alert">
        Sorry, something went wrong sending your enquiry. Please call us on <a href={store.tel}>{store.phone}</a> or email <a href={`mailto:${store.email}`}>{store.email}</a>.
      </p>
    </form>
  );
}
