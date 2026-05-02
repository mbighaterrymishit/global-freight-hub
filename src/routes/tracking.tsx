import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import {
  Search, Package, MapPin, Truck, CheckCircle2, Plane, Ship, Clock,
  AlertCircle, Loader2,
} from "lucide-react";

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

type Shipment = {
  id: string;
  tracking_number: string;
  origin: string;
  destination: string;
  status: string;
  service_type: string;
  current_location: string | null;
  estimated_delivery: string | null;
  sender_name: string;
  recipient_name: string;
};

type Event = {
  id: string;
  status: string;
  location: string | null;
  notes: string | null;
  occurred_at: string;
};

const ICON_BY_STATUS: Record<string, typeof Package> = {
  pending: Package,
  picked_up: Truck,
  in_transit: Ship,
  customs: CheckCircle2,
  out_for_delivery: Truck,
  delivered: CheckCircle2,
  exception: AlertCircle,
};

function TrackingPage() {
  const [tracking, setTracking] = useState("");
  const [searched, setSearched] = useState<string | null>(null);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookup = useCallback(async (num: string) => {
    setLoading(true); setError(null); setShipment(null); setEvents([]);
    const { data: s } = await supabase
      .from("shipments")
      .select("*")
      .eq("tracking_number", num)
      .maybeSingle();
    if (!s) {
      setError(`No shipment found for "${num}". Please check the tracking number.`);
      setLoading(false);
      return;
    }
    setShipment(s as Shipment);
    const { data: ev } = await supabase
      .from("shipment_events")
      .select("*")
      .eq("shipment_id", (s as Shipment).id)
      .order("occurred_at", { ascending: true });
    setEvents((ev ?? []) as Event[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setTracking(id); setSearched(id); lookup(id);
    }
  }, [lookup]);

  // Realtime updates for the displayed shipment
  useEffect(() => {
    if (!shipment) return;
    const channel = supabase
      .channel(`shipment-${shipment.id}`)
      .on("postgres_changes",
        { event: "*", schema: "public", table: "shipment_events", filter: `shipment_id=eq.${shipment.id}` },
        () => lookup(shipment.tracking_number))
      .on("postgres_changes",
        { event: "UPDATE", schema: "public", table: "shipments", filter: `id=eq.${shipment.id}` },
        () => lookup(shipment.tracking_number))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [shipment, lookup]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = tracking.trim();
    if (!num) return;
    setSearched(num);
    lookup(num);
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
          {loading && (
            <div className="text-center py-16">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            </div>
          )}

          {!loading && error && (
            <Card className="shadow-card-soft max-w-xl mx-auto">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
                <h2 className="text-lg font-bold mb-1">Shipment not found</h2>
                <p className="text-sm text-muted-foreground">{error}</p>
              </CardContent>
            </Card>
          )}

          {!loading && shipment && (
            <Card className="shadow-elegant">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-6 pb-6 border-b">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Tracking number</div>
                    <div className="text-xl font-bold font-display">{shipment.tracking_number}</div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold capitalize">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> {shipment.status.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Origin</div>
                    <div className="font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {shipment.origin}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Destination</div>
                    <div className="font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold" /> {shipment.destination}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Estimated Delivery</div>
                    <div className="font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" /> {shipment.estimated_delivery ?? "TBD"}</div>
                  </div>
                </div>

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
                    <Plane className="h-4 w-4 text-gold" /> {shipment.current_location ?? "In transit"}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-5">Shipment Timeline</h3>
                {events.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No tracking events yet. Check back soon.</p>
                ) : (
                  <div className="space-y-5">
                    {[...events].reverse().map((e, i, arr) => {
                      const Icon = ICON_BY_STATUS[e.status] ?? Package;
                      const current = i === 0;
                      return (
                        <div key={e.id} className="flex gap-4 relative">
                          {i < arr.length - 1 && (
                            <div className="absolute left-5 top-10 bottom-0 w-px bg-primary" />
                          )}
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                            current ? "bg-gold text-gold-foreground ring-4 ring-gold/20" : "bg-primary text-primary-foreground"
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 pb-1">
                            <div className="font-semibold capitalize">{e.status.replace(/_/g, " ")}</div>
                            {e.location && <div className="text-sm text-muted-foreground flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {e.location}</div>}
                            {e.notes && <div className="text-xs text-muted-foreground mt-0.5">{e.notes}</div>}
                            <div className="text-xs text-muted-foreground mt-0.5">{new Date(e.occurred_at).toLocaleString()}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </section>
      )}
    </SiteLayout>
  );
}
