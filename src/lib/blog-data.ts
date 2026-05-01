import { SITE_IMAGES } from "./site-images";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readingTime: string;
  cover: string;
  /** Article body as ordered blocks. */
  content: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string; cite?: string }
  >;
}

export const POSTS: BlogPost[] = [
  {
    slug: "2026-ocean-freight-outlook",
    title: "2026 Ocean Freight Outlook: Rates, Capacity & Trade Lanes",
    excerpt: "Our annual deep-dive into projected sea freight market dynamics, key trade-lane shifts, and what shippers should expect.",
    date: "Apr 22, 2026",
    category: "Market Insights",
    author: "Emily Carter, Head of Ocean Procurement",
    readingTime: "7 min read",
    cover: SITE_IMAGES.seaFreight,
    content: [
      { type: "p", text: "After two years of unusual volatility, the global ocean freight market is entering a new phase of cautious normalization in 2026. Carriers absorbed record newbuild deliveries while demand from US importers softened in Q4 2025, creating a delicate balance that will define spot and contract pricing for the year ahead." },
      { type: "h2", text: "Capacity additions outpace demand growth" },
      { type: "p", text: "Roughly 2.4 million TEU of new capacity is scheduled to enter service in 2026, an 8.1% increase year-over-year. Demand growth, by contrast, is forecast at 2.6–3.1% globally and just 1.8% on trans-Pacific eastbound. The math is unfriendly for carriers — and historically friendly for shippers negotiating annual contracts." },
      { type: "h2", text: "Trade-lane winners and losers" },
      { type: "ul", items: [
        "Trans-Pacific Eastbound: continued softness; expect contract rates 12–18% below 2025 levels.",
        "Asia–Europe: tighter than the Pacific thanks to Red Sea diversions absorbing capacity.",
        "Intra-Americas: nearshoring tailwinds keep Mexico and the Caribbean firm.",
        "Transatlantic: oversupplied; opportunistic spot bookings will outperform.",
      ]},
      { type: "h2", text: "What shippers should do now" },
      { type: "p", text: "We recommend BCO clients lock in 60–70% of forecast volume on annual contracts at the new lower benchmarks, leaving meaningful exposure to spot markets that are likely to remain soft through Q3. Premium carrier programs — guaranteed loading, no rolling — are once again negotiable rather than table stakes." },
      { type: "quote", text: "The pendulum has swung back toward shippers, but the carriers that survived the last downcycle have stronger balance sheets and longer memories. Build relationships, not just rate sheets.", cite: "Emily Carter, ICD" },
      { type: "p", text: "Our team is publishing weekly trade-lane briefings throughout 2026. Reach out to subscribe or to discuss your specific procurement strategy." },
    ],
  },
  {
    slug: "navigating-us-customs-2026",
    title: "Navigating US Customs in 2026: A Practical Guide",
    excerpt: "From HS classification updates to CBP entry filings, here's what importers need to know to stay compliant and efficient.",
    date: "Apr 14, 2026",
    category: "Customs",
    author: "David Nguyen, Licensed Customs Broker",
    readingTime: "9 min read",
    cover: SITE_IMAGES.customsClearance,
    content: [
      { type: "p", text: "US Customs and Border Protection has rolled out the most consequential set of procedural changes in a decade. For importers, the cost of a misstep — delayed clearance, redelivery, or worse, a CBP Form 28 — has grown sharply. Here is the practical playbook our brokerage team uses with clients." },
      { type: "h2", text: "Get your HS classifications audited" },
      { type: "p", text: "The 2026 Harmonized Tariff Schedule introduced 351 new subheadings, with material changes across electronics, textiles, and dual-use chemicals. Even importers with mature compliance programs should commission a fresh classification audit to catch silent reclassifications." },
      { type: "h2", text: "Section 301 and 232: still the dominant cost driver" },
      { type: "ul", items: [
        "Maintain First Sale documentation rigorously — savings on duty base are material.",
        "Evaluate Foreign Trade Zone admission for high-duty SKUs with complex BOMs.",
        "File timely protests; CBP's 180-day window is non-negotiable.",
      ]},
      { type: "h2", text: "ACE filing best practices" },
      { type: "p", text: "Pre-file entries the moment a vessel issues 24-hour manifests. Late filings increasingly trigger automated holds. For air cargo, transmit ISF data well before wheels-up rather than at the legal deadline." },
      { type: "quote", text: "Compliance is no longer a cost center. Done well, it's a competitive moat against importers still treating customs as paperwork." },
      { type: "p", text: "Our licensed brokers handle entries across all US ports of entry. We routinely assist clients with prior-disclosures, binding-ruling requests, and CTPAT certification." },
    ],
  },
  {
    slug: "air-vs-sea-freight",
    title: "Air Freight vs. Sea Freight: Choosing the Right Mode",
    excerpt: "Total landed cost, transit time, and reliability — a framework for picking the right freight mode for every shipment.",
    date: "Apr 5, 2026",
    category: "Operations",
    author: "Priya Ramesh, Solutions Architect",
    readingTime: "6 min read",
    cover: SITE_IMAGES.airFreight,
    content: [
      { type: "p", text: "The air-versus-sea decision feels obvious until you actually run the numbers on a specific SKU, lane, and inventory policy. We've seen importers default to sea freight for cost reasons while incurring far higher carrying and stockout costs that air would have eliminated. Here's the framework we use." },
      { type: "h2", text: "Step 1: Calculate true landed cost, not freight cost" },
      { type: "p", text: "Add holding cost (capital tied up in transit + safety stock), obsolescence risk, and stockout-driven lost margin. For high-value or fashion-sensitive goods, the sea premium often disappears." },
      { type: "h2", text: "Step 2: Look at the inventory model" },
      { type: "ul", items: [
        "JIT manufacturing inputs: air or sea-air hybrid almost always wins.",
        "Promotional / seasonal goods: air the launch wave, sea the replenishment.",
        "Bulky low-value: sea, full container loads, with consolidation discipline.",
      ]},
      { type: "h2", text: "Step 3: Don't forget sea-air" },
      { type: "p", text: "A multimodal sea-air routing — typically sea to Dubai or Los Angeles, then air to final destination — can shave 40% of transit time off a pure-sea move at 30–50% of pure-air cost. Underused, and an excellent middle path." },
      { type: "quote", text: "There is no universally correct mode. There is only the correct mode for this SKU, on this lane, this season." },
      { type: "p", text: "ICD designs hybrid mode programs for clients across electronics, fashion, industrial, and pharma verticals. Talk to our team for a tailored modal-mix analysis." },
    ],
  },
  {
    slug: "resilient-supply-chains",
    title: "Building Resilient Supply Chains in a Volatile World",
    excerpt: "Geopolitical disruption is the new normal. Here's how leading importers are designing for resilience without inflating costs.",
    date: "Mar 28, 2026",
    category: "Strategy",
    author: "Marcus Hill, VP Strategy",
    readingTime: "8 min read",
    cover: SITE_IMAGES.hero,
    content: [
      { type: "p", text: "The Red Sea, Panama Canal drought, Taiwan Strait tensions, tariff escalations — the past 24 months have made it clear that supply chain disruption is a base-rate event, not a tail risk. The leaders we work with have stopped optimizing purely for cost and started designing for resilience as a first-class objective." },
      { type: "h2", text: "Three resilience levers that actually work" },
      { type: "ul", items: [
        "Multi-sourcing: at least two qualified suppliers per critical SKU, in different geopolitical blocs.",
        "Multi-routing: pre-qualified alternate ports and carrier networks for every primary lane.",
        "Inventory positioning: forward-deployed safety stock at strategic nodes, not just origin.",
      ]},
      { type: "h2", text: "What it actually costs" },
      { type: "p", text: "Done well, resilience programs add 1.8–3.2% to landed cost while reducing disruption-related write-downs by an order of magnitude. The payback is rarely longer than the next disruption — and there is always a next disruption." },
      { type: "quote", text: "Resilience is not the opposite of efficiency. It is efficiency measured over a longer time horizon." },
      { type: "p", text: "Our supply chain consulting practice helps importers benchmark, design, and operationalize resilience programs across modes and regions." },
    ],
  },
  {
    slug: "cold-chain-logistics-best-practices",
    title: "Cold Chain Logistics: Best Practices for Pharma & Food",
    excerpt: "Maintaining temperature integrity across continents requires more than reefer containers. A premium approach to cold chain.",
    date: "Mar 18, 2026",
    category: "Specialized",
    author: "Dr. Anna Volkov, Cold Chain Director",
    readingTime: "7 min read",
    cover: SITE_IMAGES.warehousing,
    content: [
      { type: "p", text: "A reefer container that holds 2–8°C for 21 days at sea is necessary, not sufficient, for a real cold chain. Temperature excursions overwhelmingly happen at handoffs — port pickup, customs holds, last-mile transit. Premium cold chain is a discipline of handoff design." },
      { type: "h2", text: "The handoff-first model" },
      { type: "ul", items: [
        "Pre-qualify every port, terminal, and trucker against your temperature SLA.",
        "Real-time IoT loggers transmitting every 15 minutes — not download-on-arrival.",
        "Automated escalation: deviations trigger human intervention within 30 minutes.",
        "Documented chain-of-custody temperature record from supplier to consignee.",
      ]},
      { type: "h2", text: "Pharma vs. food: different stakes, same playbook" },
      { type: "p", text: "GDP-compliant pharma shipments demand validated lanes and qualified personnel. Food and produce can tolerate slightly looser tolerances but punishes shippers brutally on shelf-life loss. The control architecture is identical; the validation rigor differs." },
      { type: "quote", text: "Cold chain failures are rarely about equipment. They are about communication and training." },
      { type: "p", text: "ICD operates GDP-validated lanes for pharmaceutical clients across the US, EU, and Asia. Talk to our cold chain team for a lane-by-lane assessment." },
    ],
  },
  {
    slug: "nearshoring-mexico-playbook",
    title: "Nearshoring to Mexico: The Logistics Playbook",
    excerpt: "How to design a high-performing US/MX cross-border lane — from customs preparation to last-mile distribution.",
    date: "Mar 9, 2026",
    category: "Strategy",
    author: "Carlos Mendez, Cross-Border Operations",
    readingTime: "8 min read",
    cover: SITE_IMAGES.roadTransport,
    content: [
      { type: "p", text: "Mexican manufacturing FDI hit a record $36.5 billion in 2025 and shows no sign of slowing. Whether you're standing up a new maquila or sourcing from an existing supplier, the cross-border lane will make or break your unit economics." },
      { type: "h2", text: "Border crossing: where the time really goes" },
      { type: "p", text: "Average wait at Laredo, the busiest commercial crossing, ranges from 2 hours on a quiet morning to 14 hours during a customs surge. Smart shippers design around the variance: FAST-certified carriers, C-TPAT membership, off-peak crossing windows, and CBP CSMS subscriptions for real-time port conditions." },
      { type: "h2", text: "Operating model that works" },
      { type: "ul", items: [
        "Bonded warehouse on the Mexican side; transload on the US side.",
        "Dedicated cross-border carrier with both Mexican and US authority — avoid drayage handoffs.",
        "Customs broker pairs on both sides operating as a single team.",
        "USMCA certificate of origin discipline — leave no duty savings on the table.",
      ]},
      { type: "quote", text: "Mexico isn't 'just another lane.' It's its own ecosystem with its own rules, and shippers that respect that win." },
      { type: "p", text: "Our cross-border team operates dedicated US/MX lanes from Tijuana, Juarez, and Nuevo Laredo. Reach out for a lane design review." },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
