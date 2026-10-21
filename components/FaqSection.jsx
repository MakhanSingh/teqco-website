export default function FaqSection({ tight = false }) {
  return (
    <>
{/* FAQ */}
<section className="sec faq" id="faq" style={tight ? {paddingTop:0} : undefined}>
  <div className="wrap">
    <div className="sec-row">
      <div>
        <span className="eyebrow">FAQ</span>
        <h2>Frequently asked</h2>
      </div>
    </div>
    <div className="fgrid2">
      <details open><summary>What are your trading hours?</summary><p>We are open Monday to Friday from 7am to 5pm. We are closed on weekends and public holidays.</p></details>
      <details><summary>What payment options do you accept?</summary><p>All major credit cards and cash. Trade accounts are available on request for regular customers.</p></details>
      <details><summary>Where are you located?</summary><p>22 Bathurst Street, Condobolin NSW 2877, on the corner of Bathurst and Denison Streets.</p></details>
      <details><summary>Is Teqco the same business as CS Steel?</summary><p>Yes. Teqco has taken over CS Steel and continues to offer the same products and services from the same location.</p></details>
    </div>
  </div>
</section>
    </>
  );
}
