import Pic from "./Pic";
export default function BrandMarquee({ noTop = false }) {
  return (
    <>
{/* Brands marquee */}
<section className="brandband" aria-label="Brands we stock" style={noTop ? {borderTop:0} : undefined}>
  <div className="wrap">
    <span className="eyebrow">Brands we stock</span>
    <div className="marquee">
      <ul className="track"><li><Pic src="brand-alpha.png" alt="Alpha Tools" sizes="160px" /></li><li><Pic src="brand-hikoki.jpg" alt="HiKoki" sizes="160px" /></li><li><img src="/img/brand-kctools.svg" alt="KC Tools" width="420" height="120" loading="lazy" /></li><li><Pic src="brand-grainline.png" alt="Grainline" sizes="160px" /></li><li><Pic src="brand-peerless.png" alt="Peerless" sizes="160px" /></li><li><Pic src="brand-macnaught.png" alt="Macnaught" sizes="160px" /></li><li><Pic src="brand-maxisafe.png" alt="Maxisafe" sizes="160px" /></li><li><Pic src="brand-alpha.png" alt="Alpha Tools" sizes="160px" /></li><li><Pic src="brand-hikoki.jpg" alt="HiKoki" sizes="160px" /></li><li><img src="/img/brand-kctools.svg" alt="KC Tools" width="420" height="120" loading="lazy" /></li><li><Pic src="brand-grainline.png" alt="Grainline" sizes="160px" /></li><li><Pic src="brand-peerless.png" alt="Peerless" sizes="160px" /></li><li><Pic src="brand-macnaught.png" alt="Macnaught" sizes="160px" /></li><li><Pic src="brand-maxisafe.png" alt="Maxisafe" sizes="160px" /></li></ul>
    </div>
  </div>
</section>
    </>
  );
}
