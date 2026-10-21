export default function MapSection() {
  return (
    <>
{/* Map */}
<section className="sec map" aria-label="Find us">
  <div className="wrap">
    <div className="bar">
      <div>
        <h2>Find us in Condobolin</h2>
        <p>22 Bathurst Street, on the corner of Bathurst and Denison Streets.</p>
      </div>
      <a className="btn btn-green" href="https://www.google.com/maps/search/22+Bathurst+Street+Condobolin+NSW+2877" target="_blank" rel="noopener">Get directions</a>
    </div>
    <div className="frame">
      <div className="fallback"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg><span>22 Bathurst Street, Condobolin NSW 2877</span><a className="btn btn-line" href="https://www.google.com/maps/search/22+Bathurst+Street+Condobolin+NSW+2877" target="_blank" rel="noopener">Open in Google Maps</a></div>
      <iframe src="https://www.google.com/maps?q=22+Bathurst+Street,+Condobolin+NSW+2877&amp;z=16&amp;output=embed" title="Map showing Teqco at 22 Bathurst Street, Condobolin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
    </div>
  </div>
</section>
    </>
  );
}
