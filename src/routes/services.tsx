import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SITE_IMAGES } from "@/lib/site-images";
import { Plane, Ship, Truck, Warehouse, FileCheck, Globe2, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Air, Sea, Road Freight & Customs | International Cargo Dispatch" },
      { name: "description", content: "Comprehensive logistics services: air freight, sea freight, road transport, warehousing, and customs clearance from the United States to 180+ countries." },
      { property: "og:title", content: "Logistics Services — International Cargo Dispatch" },
      { property: "og:description", content: "Air, sea, road, warehousing, and customs services from the United States." },
      { property: "og:image", content: SITE_IMAGES.hero },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Plane, title: "Air Freight", img: SITE_IMAGES.airFreight,
    desc: "Express international air cargo with priority handling, charter options, and 48–72h delivery to major hubs.",
    features: ["Next-flight-out express", "Charter & part-charter", "Temperature-controlled", "Dangerous goods certified"] },
  { icon: Ship, title: "Sea Freight", img: SITE_IMAGES.seaFreight,
    desc: "FCL & LCL ocean shipping across all major trade lanes with reefer, flat-rack, and project cargo capabilities.",
    features: ["FCL / LCL / Breakbulk", "Reefer & special equipment", "Door-to-door coverage", "Weekly sailings worldwide"] },
  { icon: Truck, title: "Road Transport", img: SITE_IMAGES.roadTransport,
    desc: "Cross-border trucking across North America, Europe, and key regions with full and partial truckload service.",
    features: ["FTL & LTL", "Refrigerated trucking", "Cross-border US/MX/CA", "Specialized & heavy haul"] },
  { icon: Warehouse, title: "Warehousing & 3PL", img: SITE_IMAGES.warehousing,
    desc: "Bonded and non-bonded warehousing, fulfillment, pick-pack, and distribution from strategic US locations.",
    features: ["Bonded warehouses", "E-commerce fulfillment", "Inventory management", "WMS integration"] },
  { icon: FileCheck, title: "Customs Clearance", img: SITE_IMAGES.customsClearance,
    desc: "Licensed customs brokers handling documentation, duties, tariff classification, and trade compliance worldwide.",
    features: ["Licensed brokers", "Duty optimization", "HS classification", "Trade compliance audits"] },
  { icon: Globe2, title: "Project & Specialized Cargo", img: SITE_IMAGES.hero,
    desc: "Heavy-lift, oversized, and high-value industrial freight with engineered routing and on-site supervision.",
    features: ["Engineered routing", "Heavy-lift equipment", "On-site supervision", "Insurance coordination"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="relative text-primary-foreground py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={SITE_IMAGES.hero} alt="" className="absolute inset-0 h-full w-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl relative">
          <Reveal from="up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Services</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">End-to-end logistics, perfectly executed.</h1>
            <p className="mt-6 text-lg text-primary-foreground/85">
              Whether you ship one parcel or one thousand containers a year, our integrated services adapt to your business.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} from="up" delay={i * 80}>
              <Card className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-white/95 backdrop-blur flex items-center justify-center shadow-elegant">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white drop-shadow">{s.title}</h3>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-muted-foreground leading-relaxed mb-5">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-gold shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/quote">Request quote <ArrowRight className="h-3.5 w-3.5" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <Reveal from="up">
          <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Need something custom?</h2>
            <p className="mt-3 text-primary-foreground/80">Our specialists design bespoke logistics programs for unique cargo and routes.</p>
            <Button asChild size="lg" className="mt-7 bg-gold-gradient text-gold-foreground hover:opacity-90">
              <Link to="/contact">Talk to a specialist</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
