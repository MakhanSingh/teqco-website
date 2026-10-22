import PageHero from '@/components/PageHero';
import { JumpList, RangesList } from '@/components/RangesList';
import ProductsCta from '@/components/ProductsCta';
import Catalogues from '@/components/Catalogues';
import { ogBase } from '@/data/seo';

export const metadata = {
  title: 'Products',
  description: 'Browse Teqco’s ranges: steel, roofing and mesh, welding equipment and power tools, A-teq trailers, gas, abrasives and fasteners, Grainline augers, Peerless compressors, oils, sheds, Polymaster tanks, garden edging, hand tools, safety gear and automotive supplies.',
  alternates: { canonical: '/products/' },
  openGraph: {
    ...ogBase,
    title: 'Products | Steel, welding, tools, trailers and more at Teqco',
    description: 'Fifteen ranges for the farm, the workshop and jobs around the home, in store at 22 Bathurst Street, Condobolin.',
    url: '/products/',
  },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        img="/img/tools.jpg"
        alt="Hand tools on the Teqco store wall"
        crumb="Products"
        title="A whole lot for the job at hand"
        text="From a box of tek screws to a trailer load of RHS, you'll find a good range of supplies for the farm, the workshop and jobs around the home. Browse our ranges below, or give us a call if you're after something in particular."
      />
      <JumpList />
      <RangesList />
      <Catalogues />
      <ProductsCta />
    </>
  );
}
