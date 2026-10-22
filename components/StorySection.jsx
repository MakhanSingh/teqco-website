import Pic from './Pic';

export default function StorySection() {
  return (
    <section className="sec story" id="story">
      <div className="wrap">
        <div>
          <span className="eyebrow">Our story</span>
          <h2>A local name for the <em>jobs that matter</em></h2>
          <p>Located on the corner of Bathurst and Denison Streets in Condobolin, Teqco supplies farmers, tradespeople and handymen across the Lachlan Valley with the steel, tools and hardware they need to get the job done.</p>
          <p>Previously CS Steel, Teqco continues to supply a wide range of steel sections, sheet metal, mesh, hand and power tools, fasteners and general hardware. With practical advice and friendly service, we’re here to help you find the right gear for the job, big or small.</p>
          <div className="stats">
            <div><b>3mm</b><span>Sheet metal cutting and folding in-store</span></div>
            <div><b>7am</b><span>Open early, Monday to Friday</span></div>
          </div>
        </div>
        <figure>
          <Pic src="tools.jpg" alt="Hand tools on the Teqco store wall" sizes="(max-width:980px) 100vw, 560px" />
          <span className="chip">22 Bathurst St, Condobolin</span>
        </figure>
      </div>
    </section>
  );
}
