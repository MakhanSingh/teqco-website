import PageHero from '@/components/PageHero';
import { JumpList, RangesList } from '@/components/RangesList';
import ProductsCta from '@/components/ProductsCta';

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
        title="Fifteen ranges under one roof"
        text="From a box of tek screws to a trailer-load of RHS. Pick a range below, or call the store and we will tell you what is on the shelf."
      />
      <JumpList />
      <RangesList />
      <ProductsCta />
    </>
  );
}
