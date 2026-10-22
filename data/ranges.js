// The 15 product ranges, named exactly as the client listed them. `ranges` keeps the
// client's original order (used on the home grid); `rangesAZ` is alphabetical (menus, lists).
export const ranges = [
  { slug: 'steel', img: 'steel.jpg', alt: 'Stacked steel sheet', title: 'Steel, Roofing, Mesh', sub: 'Steeline, Lysaght, Arc Metalcentre, Steel Supplies', brands: ['Steeline', 'Lysaght', 'Arc Metalcentre', 'Steel Supplies'],
    desc: 'A good range of steel sections, sheet, mesh and roofing supplies for farm, building and workshop jobs. From RHS and SHS to pipe, angle, flat bar, rod and channel, we stock a variety of common sizes, with cutting to length available on selected products. We also offer sheet metal guillotining and folding up to 3mm thick.' },
  { slug: 'welding', img: 'welding.jpg', alt: 'Welder at work in a helmet', title: 'Welding Equipment & Power Tools', sub: 'Weldclass, HiKoki, Metabo', brands: ['Weldclass', 'HiKoki', 'Metabo'],
    desc: 'From welders, wire and rods to grinders, drills, saws and cordless tools, we carry equipment and consumables for the workshop and job site. We also stock welding accessories and protective gear to help you get the job done.' },
  { slug: 'trailers', img: 'trailer.jpg', alt: 'Tandem car trailer', title: 'A-teq Trailers', sub: 'Built locally. See the A-teq range', brands: ['A-teq'],
    desc: 'Looking for a trailer for work or around the property? Ask us about A-teq box, cage and tandem trailers, including custom options, along with trailer parts and accessories.' },
  { slug: 'gas', img: 'gas.jpg', alt: 'Red LPG gas cylinder', title: 'Industrial & Domestic Gas', sub: 'Speed Gas, Origin', brands: ['Speed Gas', 'Origin'],
    desc: 'Teqco is a local agent for Origin Energy LPG and Speedgas, offering gas bottle exchange for homes, farms, businesses and workshops. Whether you need LPG for the property or welding gases for the job, contact the team to find out about available cylinders and exchange options.' },
  { slug: 'abrasives', img: 'fasteners.jpg', alt: 'Driver bits and fasteners', title: 'Abrasives & Fasteners', sub: 'Addler, AllFasteners, Specfast', brands: ['Addler', 'AllFasteners', 'Specfast'],
    desc: 'From cutting and grinding discs to bolts, nuts, washers, tek screws, anchors and rivets, we stock a practical range of workshop and building essentials in a variety of sizes.' },
  { slug: 'augers', img: 'auger.jpg', alt: 'Grain auger beside a tractor', title: 'Grainline Augers', sub: 'Grain handling for harvest', brands: ['Grainline'],
    desc: 'Grain augers and spare parts for harvest, including flighting, gearboxes, belts and drive components. Talk to us early in the season so the parts are on the shelf when you need them.' },
  { slug: 'compressors', img: null, alt: '', title: 'Peerless Air Compressors', sub: 'Workshop and portable units', brands: ['Peerless'],
    desc: 'Workshop and portable air compressors, from small direct-drive units to belt-drive workshop models, with hoses, fittings, couplers and air tools to suit.' },
  { slug: 'oils', img: 'oils.jpg', alt: 'Grease gun on a timber bench', title: 'Atlantic Oils & Lubricants', sub: 'Engine, hydraulic and gear oils', brands: ['Atlantic Oil'],
    desc: 'Engine, hydraulic, gear and transmission oils in packs and drums, plus greases, grease guns, coolants and workshop fluids for trucks, tractors and machinery.' },
  { slug: 'sheds', img: 'sheds.jpg', alt: 'Farm shed and silo at sunset', title: 'Sheds', sub: 'Shedtech', brands: ['Shedtech'],
    desc: 'Shedtech kit sheds for the farm, the workshop and the home: machinery sheds, garages, carports and hay sheds. We help you size and quote the shed, then supply the kit and the fixings to put it up.' },
  { slug: 'tanks', img: 'tank.jpg', alt: 'Poly rainwater tank beside a shed', title: 'Polymaster Tanks', sub: 'Rainwater and stock tanks', brands: ['Polymaster'],
    desc: 'Rainwater tanks, stock water tanks, troughs and chemical tanks in poly, with outlets, fittings, float valves and pump connections.' },
  { slug: 'edging', img: 'garden.jpg', alt: 'Garden trowel and soil', title: 'Garden Edging', sub: 'Teqedge', brands: ['Teqedge'],
    desc: 'Teqedge steel garden edging in a range of profiles, heights and finishes for paths, lawns and garden beds. Straight lengths, curves and corner pieces, with pins and joiners.' },
  { slug: 'hand-tools', img: 'tools.jpg', alt: 'Hand tools on a store wall', title: 'Hand Tools', sub: 'KC Tools, Sheffield Group', brands: ['KC Tools', 'Sheffield Group'],
    desc: 'Spanners, sockets, pliers, hammers, measuring tools, tool chests and rolls from KC Tools and the Sheffield Group. Trade-quality gear that lasts.' },
  { slug: 'safety', img: 'boots.jpg', alt: 'Steel cap work boot', title: 'Work Safety & Boots', sub: 'Maxisafe, Beaver', brands: ['Maxisafe', 'Beaver'],
    desc: 'Steel cap and composite toe boots, gloves, hi-vis workwear, eye, ear and respiratory protection, sunscreen and first aid.' },
  { slug: 'automotive', img: 'truck.jpg', alt: 'Road train on an outback highway', title: 'Truck & Automotive Supplies', sub: 'Parts, batteries, accessories', brands: [],
    desc: 'Batteries, filters, lights, tie-downs, ratchet straps, tow balls, mudflaps and accessories for trucks, utes and farm vehicles.' },
  { slug: 'general', img: 'castors.jpg', alt: 'Swivel castor wheel', title: 'General Merchandise', sub: 'Gate fittings, trailer parts, paint, pumps, chain, matting, castors', brands: ['Rotech', 'Ark', 'Reefe', 'Allied Industrial', 'Ultragrime'],
    desc: 'Gate fittings from Rotech, trailer parts from Ark, industrial paint, Reefe pumps, chain and cable, rubber matting, wheels and castors from Allied Industrial, Ultragrime wipes and the everyday hardware that keeps a property running.' },
];

export const rangesAZ = [...ranges].sort((a, b) => a.title.localeCompare(b.title, 'en-AU'));

// Brochures and catalogues carried over from the current teqco.com.au products page.
export const catalogues = [
  { name: 'KC Tools Catalogue', url: 'https://www.kctools.com.au/catalogues' },
  { name: 'HiKoki Power Tools Catalogue', url: 'https://hikokipowertools.com.au/media/3136/hik38566-21-v2-hikoki-product-catalogue-web.pdf' },
  { name: 'Weldclass Catalogue', url: 'https://jwlmarketingnsw.sharepoint.com/sites/companyshares/Marketing_General/Forms/AllItems.aspx?id=%2Fsites%2Fcompanyshares%2FMarketing%5FGeneral%2FCatalogues%2FWeldclass%20Catalogue%5FEd%2006%5F2020%2FWorking%20Files%2FWeldclass%5FCATALOGUE%5F2022%5FWeb%20Download%2Epdf&parent=%2Fsites%2Fcompanyshares%2FMarketing%5FGeneral%2FCatalogues%2FWeldclass%20Catalogue%5FEd%2006%5F2020%2FWorking%20Files&p=true&ga=1' },
  { name: 'Alpha Catalogue', url: 'http://cdn.sheffieldblades.com.au/ecatalogue/AlphaCatalogueEd19/8/' },
];

export const store = {
  phone: '02 6895 4180',
  tel: 'tel:+61268954180',
  email: 'sales@teqco.com.au',
  address: '22 Bathurst Street, Condobolin NSW 2877',
  addressShort: '22 Bathurst St, Condobolin NSW 2877',
  corner: 'Corner of Bathurst and Denison Streets',
  mapsUrl: 'https://www.google.com/maps/search/22+Bathurst+Street+Condobolin+NSW+2877',
  hours: 'Monday to Friday, 7:00am to 5:00pm',
  // Social profile URLs still to be supplied by the client.
  facebook: '#',
  linkedin: '#',
  agency: { name: 'Think Creative Agency', url: 'https://thinkcreativeagency.com.au' },
};
