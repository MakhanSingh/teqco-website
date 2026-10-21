export default function NewsSection() {
  return (
    <>
{/* News & specials */}
<section className="sec news" id="news">
  <div className="wrap">
    <div className="sec-row">
      <div>
        <span className="eyebrow">News &amp; specials</span>
        <h2>What's on at the store</h2>
      </div>
      <div className="side"><p>Current specials, new stock and handy updates. Ask in store or call for current prices.</p></div>
    </div>
    <div className="ngrid">
      <a className="ncard" href="#"><img src="/img/cutting.jpg" alt="Angle grinder throwing sparks" /><span className="tag hot">Special</span><div className="foot"><div><time>Spring 2026</time><h3>Spring fencing &amp; shed-build bundle pricing</h3></div><span className="plus">+</span></div></a>
      <a className="ncard" href="#faq"><img src="/img/workshop.jpg" alt="Workshop machinery" /><span className="tag">Store news</span><div className="foot"><div><time>Update</time><h3>CS Steel is now Teqco. Same place, same people.</h3></div><span className="plus">+</span></div></a>
      <a className="ncard" href="#"><img src="/img/tools.jpg" alt="Tools on display in store" /><span className="tag">New stock</span><div className="foot"><div><time>Tools</time><h3>HiKoki multi-volt cordless range now in store</h3></div><span className="plus">+</span></div></a>
    </div>
  </div>
</section>
    </>
  );
}
