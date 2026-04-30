import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Plane, Ship, Truck, Warehouse, FileCheck, Globe2, ShieldCheck,
  Clock, Award, Search, ArrowRight, Star, MapPin,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "International Cargo Dispatch — Premium Global Freight & Logistics" },
      {
        name: "description",
        content:
          "Track shipments and ship cargo worldwide. Air, sea, and road freight services from the United States to 180+ countries.",
      },
      { property: "og:title", content: "International Cargo Dispatch" },
      { property: "og:description", content: "Premium freight forwarding & live shipment tracking from the United States." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Plane, title: "Air Freight", desc: "Express international air cargo with 48–72h delivery to major hubs." },
  { icon: Ship, title: "Sea Freight", desc: "FCL & LCL ocean shipping with global port-to-port coverage." },
  { icon: Truck, title: "Road Transport", desc: "Cross-border trucking and last-mile delivery across the Americas and EU." },
  { icon: Warehouse, title: "Warehousing", desc: "Secure bonded warehousing, fulfillment, and inventory management." },
  { icon: FileCheck, title: "Customs Clearance", desc: "Licensed brokers handling documentation, duties, and compliance." },
  { icon: Globe2, title: "Project Cargo", desc: "Heavy-lift, oversized, and specialized industrial freight solutions." },
];

const stats = [
  { value: "180+", label: "Countries Served" },
  { value: "2.4M", label: "Shipments Delivered" },
  { value: "99.2%", label: "On-Time Delivery" },
  { value: "24/7", label: "Live Support" },
];

function HomePage() {
  const [tracking, setTracking] = useState("");

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative bg-hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_30%,white,transparent_40%),radial-gradient(circle_at_80%_70%,white,transparent_40%)]" />
        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-36 relative">
          <div className="max-w-3xl animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium tracking-wide mb-5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Trusted by 12,000+ businesses worldwide
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              Premium Global Cargo,
              <span className="block bg-gold-gradient bg-clip-text text-transparent">
                Delivered with Precision.
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
              Air, sea, and road freight forwarding from the United States to 180+ countries.
              Live tracking, customs clearance, and white-glove logistics for businesses that demand reliability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90 shadow-elegant">
                <Link to="/quote">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/5 border-white/30 text-primary-foreground hover:bg-white/10">
                <Link to="/tracking">Track Shipment</Link>
              </Button>
            </div>
          </div>

          {/* Tracking widget */}
          <div className="mt-16 max-w-3xl">
            <Card className="shadow-elegant border-0">
              <CardContent className="p-5 md:p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                  <Search className="h-4 w-4 text-gold" /> Track Your Shipment
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (tracking.trim()) {
                      window.location.href = `/tracking?id=${encodeURIComponent(tracking.trim())}`;
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <Input
                    placeholder="Enter tracking number (e.g. ICD-2026-A4F9K2)"
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    className="h-12"
                  />
                  <Button type="submit" size="lg" className="bg-primary text-primary-foreground">
                    Track Now
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 lg:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-card-soft bg-card">
          {stats.map((s) => (
            <div key={s.label} className="bg-card p-6 text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-primary">{s.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">What we do</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2">Comprehensive logistics, end-to-end.</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            From a single parcel to project cargo, we orchestrate every step of your supply chain with transparency and care.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card key={s.title} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border-border/60">
              <CardContent className="p-7">
                <div className="h-12 w-12 rounded-xl bg-hero-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-primary hover:text-gold">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Why choose us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">A logistics partner you can trust.</h2>
            <div className="space-y-5">
              {[
                { icon: ShieldCheck, t: "Cargo Insurance", d: "Comprehensive coverage on every shipment, declared value protected end-to-end." },
                { icon: Clock, t: "On-Time Guarantee", d: "99.2% delivery accuracy backed by real-time visibility and proactive support." },
                { icon: Award, t: "IATA & FIATA Certified", d: "Industry-accredited operations across air, sea, and ground freight networks." },
                { icon: Globe2, t: "Truly Global Reach", d: "Owned offices and partner network spanning 180+ countries on six continents." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="h-11 w-11 rounded-lg bg-card border flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{f.t}</h4>
                    <p className="text-sm text-muted-foreground">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-hero-gradient shadow-elegant overflow-hidden relative">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe2 className="h-48 w-48 text-white/20" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-2 text-xs text-gold font-semibold uppercase tracking-wider">
                  <MapPin className="h-3.5 w-3.5" /> Live Network
                </div>
                <p className="font-semibold mt-1 text-foreground">42 vessels in transit · 318 active routes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews preview */}
      <section className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Client voices</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Trusted by industry leaders.</h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/reviews">Read all reviews <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Marcus Whitfield", r: "VP Supply Chain, Apex Manufacturing", l: "Houston, TX", q: "ICD has transformed our trans-Pacific operations. The visibility, the customs work, the proactive comms — exceptional.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { n: "Sophia Andersen", r: "Logistics Director, Nordic Trade Co.", l: "Stockholm, Sweden", q: "Five years, thousands of containers, zero major incidents. They're not a vendor; they're a strategic partner.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { n: "Rajiv Khurana", r: "CEO, Bharat Imports Ltd.", l: "Mumbai, India", q: "Their customs team navigates complexities most forwarders won't even attempt. A truly premium service.", img: "https://randomuser.me/api/portraits/men/68.jpg" },
          ].map((t) => (
            <Card key={t.n} className="border-border/60">
              <CardContent className="p-7">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-5">&ldquo;{t.q}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img src={t.img} alt={t.n} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-semibold text-sm">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                    <div className="text-xs text-gold flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {t.l}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-16 shadow-elegant relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to ship smarter?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Get a tailored logistics quote in under 2 hours from our US-based experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90">
                <Link to="/quote">Get Instant Quote</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-primary-foreground hover:bg-white/10">
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
