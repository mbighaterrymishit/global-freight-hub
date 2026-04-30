import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, MapPin, Truck, CheckCircle2, Plane, Ship, Clock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/tracking")({
  head: () => ({
    meta: [
      { title: "Track Shipment — International Cargo Dispatch" },
      { name: "description", content: "Track your international cargo shipment in real time. Live status, location, and estimated delivery." },
      { property: "og:title", content: "Track Shipment — International Cargo Dispatch" },
      { property: "og:description", content: "Real-time international cargo tracking." },
    ],
  }),
  component: TrackingPage,
});

const SAMPLE_EVENTS = [
  { status: "Order Received", location: "Newark, NJ, United States", time: "Apr 18, 2026 · 09:14 EST", icon: Package, done: true },
  { status: "Picked Up", location: "Newark, NJ, United States", time: "Apr 19, 2026 · 14:22 EST", icon: Truck, done: true },
  { status: "Departed Origin Port", location: "Port of New York, United States", time: "Apr 21, 2026 · 06:45 EST", icon: Ship, done: true },
  { status: "In Transit — Atlantic", location: "North Atlantic Ocean", time: "Apr 25, 2026 · 11:30 UTC", icon: Ship, done: true, current: true },
  { status: "Customs Clearance", location: "Port of Rotterdam, Netherlands", time: "Estimated Apr 30, 2026", icon: CheckCircle2, done: false },
  { status: "Out for Delivery", location: "Hamburg, Germany", time: "Estimated May 2, 2026", icon: Truck, done: false },
];

function TrackingPage() {
  const [tracking, setTracking] = useState("");
  const [searched, setSearched] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setTracking(id);
      setSearched(id);
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tracking.trim()) setSearched(tracking.trim());
  };

  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Live tracking</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Track Your Shipment</h1>
          <p className="mt-4 text-primary-foreground/80">Enter your tracking number for real-time status and location updates.</p>
          <form onSubmit={onSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="ICD-2026-A4F9K2"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
              className="h-12 bg-white text-foreground"
            />
            <Button type="submit" size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90 h-12">
              <Search className="h-4 w-4" /> Track
            </Button>
          </form>
        </div>
      </section>

      {searched && (
        <section className="container mx-auto px-4 lg:px-8 py-12">
          <Card className="shadow-elegant">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap gap-4 items-center justify-between mb-6 pb-6 border-b">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Tracking number</div>
                  <div className="text-xl font-bold font-display">{searched}</div>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> In Transit
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Origin</div>
                  <div className="font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> Newark, United States</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Destination</div>
                  <div className="font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> Hamburg, Germany</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Estimated Delivery</div>
                  <div className="font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" /> May 2, 2026</div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-[16/7] rounded-xl bg-secondary border relative overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,oklch(0.78_0.13_80/0.3),transparent_25%),radial-gradient(circle_at_50%_45%,oklch(0.42_0.13_252/0.4),transparent_25%),radial-gradient(circle_at_82%_50%,oklch(0.6_0.22_27/0.3),transparent_25%)]" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 350" preserveAspectRatio="none">
                  <path d="M 120 160 Q 400 80 660 175" stroke="oklch(0.42 0.13 252)" strokeWidth="2.5" strokeDasharray="6 6" fill="none" />
                  <circle cx="120" cy="160" r="8" fill="oklch(0.78 0.13 80)" />
                  <circle cx="400" cy="155" r="10" fill="oklch(0.42 0.13 252)">
                    <animate attributeName="r" values="10;14;10" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="660" cy="175" r="8" fill="oklch(0.6 0.22 27)" />
                </svg>
                <div className="absolute top-4 left-4 bg-card/90 backdrop-blur px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <Plane className="h-4 w-4 text-gold" /> Live position · North Atlantic
                </div>
              </div>

              {/* Timeline */}
              <h3 className="text-lg font-semibold mb-5">Shipment Timeline</h3>
              <div className="space-y-5">
                {SAMPLE_EVENTS.map((e, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i < SAMPLE_EVENTS.length - 1 && (
                      <div className={`absolute left-5 top-10 bottom-0 w-px ${e.done ? "bg-primary" : "bg-border"}`} />
                    )}
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                      e.current ? "bg-gold text-gold-foreground ring-4 ring-gold/20"
                        : e.done ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      <e.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="font-semibold">{e.status}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.location}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{e.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex items-start gap-3 p-4 rounded-lg bg-secondary text-sm">
            <AlertCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <p className="text-muted-foreground">
              This is a sample tracking view. Live tracking with real shipment data will be available once shipments are loaded by our admin team.
            </p>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
