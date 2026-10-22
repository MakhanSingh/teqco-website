import Link from 'next/link';

const CheckIcon = () => <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>;

export default function AboutSection() {
  return (
    <section className="sec about" id="about">
      <div className="wrap">
        <figure>
          <img src="/img/about-tools.jpg" alt="Racks of hand tools in the Teqco workshop" />
          <span className="chip">22 Bathurst St, Condobolin</span>
        </figure>
        <div>
          <span className="eyebrow">About Teqco</span>
          <h2>Local knowledge. <em>A good stock.</em> Friendly service.</h2>
          <p>Based on the corner of Bathurst and Denison Streets in Condobolin, Teqco supplies steel, tools, hardware and much more to farmers, tradies and locals across the district.</p>
          <p>Formerly CS Steel, Teqco continues to provide a broad range of products and practical services for jobs on the farm, at work and around the home. Pop in, tell us what you're working on and we'll do our best to point you in the right direction.</p>
          <ul>
            <li><CheckIcon /><span><b>A wide stock under one roof</b> – Steel, tools, fasteners, hardware and everyday essentials for work and around the property.</span></li>
            <li><CheckIcon /><span><b>Practical, local know-how</b> – Friendly service to help you find the right gear for the job.</span></li>
            <li><CheckIcon /><span><b>Serving Condobolin and the district</b> – Your local supplier for rural, trade and home projects.</span></li>
          </ul>
          <Link className="btn btn-green" href="/contact/">Talk to the team</Link>
        </div>
      </div>
    </section>
  );
}
