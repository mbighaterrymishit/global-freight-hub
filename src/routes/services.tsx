import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Ship, Truck, Warehouse, FileCheck, Globe2, Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Air, Sea, Road Freight & Customs | International Cargo Dispatch" },
      { name: "description", content: "Comprehensive logistics services: air freight, sea freight, road transport, warehousing, and customs clearance from the United States to 180+ countries." },
      { property: "og:title", content: "Logistics Services — International Cargo Dispatch" },
      { property: "og:description", content: "Air, sea, road, warehousing, and customs services from the United States." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { icon: Plane, title: "Air Freight", desc: "Express international air cargo with priority handling, charter options, and 48–72h delivery to major hubs.",
    features: ["Next-flight-out express", "Charter & part-charter", "Temperature-controlled", "Dangerous goods certified"] },
  { icon: Ship, title: "Sea Freight", desc: "FCL & LCL ocean shipping across all major trade lanes with reefer, flat-rack, and project cargo capabilities.",
    features: ["FCL / LCL / Breakbulk", "Reefer & special equipment", "Door-to-door coverage", "Weekly sailings worldwide"] },
  { icon: Truck, title: "Road Transport", desc: "Cross-border trucking across North America, Europe, and key regions with full and partial truckload service.",
    features: ["FTL & LTL", "Refrigerated trucking", "Cross-border US/MX/CA", "Specialized & heavy haul"] },
  { icon: Warehouse, title: "Warehousing & 3PL", desc: "Bonded and non-bonded warehousing, fulfillment, pick-pack, and distribution from strategic US locations.",
    features: ["Bonded warehouses", "E-commerce fulfillment", "Inventory management", "WMS integration"] },
  { icon: FileCheck, title: "Customs Clearance", desc: "Licensed customs brokers handling documentation, duties, tariff classification, and trade compliance worldwide.",
    features: ["Licensed brokers", "Duty optimization", "HS classification", "Trade compliance audits"] },
  { icon: Globe2, title: "Project & Specialized Cargo", desc: "Heavy-lift, oversized, and high-value industrial freight with engineered routing and on-site supervision.",
    features: ["Engineered routing", "Heavy-lift equipment", "On-site supervision", "Insurance coordination"] },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Services</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">End-to-end logistics, perfectly executed.</h1>
          <p className="mt-6 text-lg text-primary-foreground/80">
            Whether you ship one parcel or one thousand containers a year, our integrated services adapt to your business.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <Card key={s.title} className="hover:shadow-elegant transition-all hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-xl bg-hero-gradient flex items-center justify-center">
                    <s.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold">{s.title}</h3>
                </div>
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
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Need something custom?</h2>
          <p className="mt-3 text-primary-foreground/80">Our specialists design bespoke logistics programs for unique cargo and routes.</p>
          <Button asChild size="lg" className="mt-7 bg-gold-gradient text-gold-foreground hover:opacity-90">
            <Link to="/contact">Talk to a specialist</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
