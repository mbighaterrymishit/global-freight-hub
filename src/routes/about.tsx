import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Globe2, Target, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — International Cargo Dispatch" },
      { name: "description", content: "International Cargo Dispatch is a US-headquartered freight forwarding leader serving 180+ countries with premium air, sea, and road logistics." },
      { property: "og:title", content: "About International Cargo Dispatch" },
      { property: "og:description", content: "US-headquartered global freight forwarding with two decades of trusted operations." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">About us</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 leading-tight">Two decades of moving the world&apos;s most important cargo.</h1>
          <p className="mt-6 text-lg text-primary-foreground/80">
            Founded in the United States and operating across six continents, International Cargo Dispatch is a premium
            freight forwarder trusted by enterprises, manufacturers, and global brands to handle their most critical shipments.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">Our story</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            What began as a regional forwarder in the United States has grown into a global logistics network spanning
            180+ countries. Through every phase of growth, we&apos;ve held to one principle: every shipment matters,
            because every shipment represents someone&apos;s livelihood, brand, or promise to a customer.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today we operate owned offices in 24 strategic hubs and partner relationships in every major port and
            airport on Earth — combining the scale of a global carrier with the responsiveness of a boutique firm.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { v: "20+", l: "Years of operation" },
            { v: "180+", l: "Countries served" },
            { v: "24", l: "Owned global offices" },
            { v: "2.4M", l: "Shipments delivered" },
          ].map((s) => (
            <Card key={s.l}><CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </CardContent></Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, t: "Mission", d: "Empower businesses to trade across borders with absolute confidence in their logistics." },
            { icon: Heart, t: "Vision", d: "Be the most trusted name in premium global freight forwarding — known for precision, transparency, and care." },
            { icon: ShieldCheck, t: "Values", d: "Reliability, integrity, customer obsession, and operational excellence in every shipment we touch." },
          ].map((v) => (
            <Card key={v.t}><CardContent className="p-7">
              <div className="h-12 w-12 rounded-xl bg-gold-gradient flex items-center justify-center mb-4">
                <v.icon className="h-6 w-6 text-gold-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{v.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
            </CardContent></Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Certified and accredited.</h2>
          <p className="text-muted-foreground mt-3">Operating to the highest international standards across every freight mode.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["IATA Certified", "FIATA Member", "ISO 9001:2015", "C-TPAT Validated"].map((b) => (
            <Card key={b}><CardContent className="p-7 text-center">
              <Award className="h-8 w-8 text-gold mx-auto mb-2" />
              <div className="font-semibold">{b}</div>
            </CardContent></Card>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14 text-center">
          <Globe2 className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold">Ready to work with us?</h2>
          <p className="mt-3 text-primary-foreground/80">Talk to our US team about your next shipment.</p>
          <Button asChild size="lg" className="mt-7 bg-gold-gradient text-gold-foreground hover:opacity-90">
            <Link to="/contact">Get in touch <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
}
