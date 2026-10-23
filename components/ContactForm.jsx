"use client";
import { useState } from 'react';
import { rangesAZ as ranges, store } from '@/data/ranges';
import { CF7_FEEDBACK_URL, CF7_UNIT_TAG } from '@/lib/config';

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

    // Sent to Contact Form 7 in the CMS: it emails the store and Flamingo keeps a copy.
    const body = new FormData();
    body.set('_wpcf7_unit_tag', CF7_UNIT_TAG);
    body.set('fname', d.get('fname'));
    body.set('lname', d.get('lname'));
    body.set('email', d.get('email'));
    body.set('phone', d.get('phone') || '');
    body.set('type', TYPE_LABEL[d.get('type')] || TYPE_LABEL.general);
    body.set('area', d.get('area'));
    body.set('msg', d.get('msg'));
    body.set('source_page', window.location.href);

    setStatus('sending');
    try {
      const res = await fetch(CF7_FEEDBACK_URL, { method: 'POST', body, headers: { Accept: 'application/json' } });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.status === 'mail_sent') { setStatus('ok'); f.reset(); }
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
