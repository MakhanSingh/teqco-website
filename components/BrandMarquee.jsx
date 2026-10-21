export default function BrandMarquee({ noTop = false }) {
  return (
    <>
{/* Brands marquee */}
<section className="brandband" aria-label="Brands we stock" style={noTop ? {borderTop:0} : undefined}>
  <div className="wrap">
    <span className="eyebrow">Brands we stock</span>
    <div className="marquee">
      <ul className="track"><li><img src="/img/brand-alpha.png" alt="Alpha Tools" /></li><li><img src="/img/brand-hikoki.jpg" alt="HiKoki" /></li><li><img src="/img/brand-kctools.svg" alt="KC Tools" /></li><li><img src="/img/brand-bossweld.jpg" alt="Bossweld" /></li><li><img src="/img/brand-grainline.png" alt="Grainline" /></li><li><img src="/img/brand-peerless.png" alt="Peerless" /></li><li><img src="/img/brand-macnaught.png" alt="Macnaught" /></li><li><img src="/img/brand-maxisafe.png" alt="Maxisafe" /></li><li><img src="/img/brand-alpha.png" alt="Alpha Tools" /></li><li><img src="/img/brand-hikoki.jpg" alt="HiKoki" /></li><li><img src="/img/brand-kctools.svg" alt="KC Tools" /></li><li><img src="/img/brand-bossweld.jpg" alt="Bossweld" /></li><li><img src="/img/brand-grainline.png" alt="Grainline" /></li><li><img src="/img/brand-peerless.png" alt="Peerless" /></li><li><img src="/img/brand-macnaught.png" alt="Macnaught" /></li><li><img src="/img/brand-maxisafe.png" alt="Maxisafe" /></li></ul>
    </div>
  </div>
</section>
    </>
  );
}
