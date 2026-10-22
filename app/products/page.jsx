import PageHero from '@/components/PageHero';
import { JumpList, RangesList } from '@/components/RangesList';
import ProductsCta from '@/components/ProductsCta';
import Catalogues from '@/components/Catalogues';

export const metadata = {
  title: 'Products | Teqco Condobolin',
  description: 'Fifteen ranges under one roof: steel, roofing and mesh, welding and power tools, trailers, gas, fasteners, augers, compressors, oils, sheds, tanks, garden edging, hand tools, safety, automotive and general merchandise.',
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
