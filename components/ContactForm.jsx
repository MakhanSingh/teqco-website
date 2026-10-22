"use client";
import { useState } from 'react';
import { rangesAZ as ranges } from '@/data/ranges';

// Mock submit for now: the live site will post this to the store's email.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    setSent(true);
    f.reset();
  };
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
      <button className="btn btn-cta" type="submit">Send enquiry</button>
      <p className={`ok${sent ? ' show' : ''}`} id="ok">Thanks, your enquiry has been noted. On the live site this will email the store.</p>
    </form>
  );
}
