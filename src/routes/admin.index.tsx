import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Package, Truck, CheckCircle2, Clock, PackagePlus, ArrowRight } from "lucide-react";
import { statusLabel } from "@/lib/shipments";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Row = { id: string; tracking_number: string; status: string; sender_name: string; recipient_name: string; created_at: string; destination: string };

function AdminDashboard() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    supabase.from("shipments").select("id,tracking_number,status,sender_name,recipient_name,created_at,destination").order("created_at", { ascending: false }).then(({ data }) => setRows((data ?? []) as Row[]));
  }, []);

  const total = rows.length;
  const inTransit = rows.filter((r) => r.status === "in_transit" || r.status === "out_for_delivery" || r.status === "picked_up").length;
  const delivered = rows.filter((r) => r.status === "delivered").length;
  const pending = rows.filter((r) => r.status === "shipment_created" || r.status === "pending").length;

  const cards = [
    { label: "Total Shipments", value: total, icon: Package, color: "text-primary", bg: "bg-primary/10" },
    { label: "In Transit", value: inTransit, icon: Truck, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Delivered", value: delivered, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending", value: pending, icon: Clock, color: "text-gold", bg: "bg-gold/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of all shipment activity</p>
        </div>
        <Button asChild className="bg-gold-gradient text-gold-foreground">
          <Link to="/admin/create"><PackagePlus className="h-4 w-4" /> New Shipment</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="shadow-card-soft">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{c.label}</div>
                  <div className="text-3xl font-bold mt-2">{c.value}</div>
                </div>
                <div className={`h-10 w-10 rounded-lg ${c.bg} ${c.color} flex items-center justify-center`}>
                  <c.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Recent shipments</h2>
            <Button asChild variant="ghost" size="sm"><Link to="/admin/shipments">View all <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          {rows.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No shipments yet.</p>
          ) : (
            <div className="divide-y">
              {rows.slice(0, 6).map((r) => (
                <Link key={r.id} to="/admin/shipments/$id" params={{ id: r.id }} className="flex items-center justify-between py-3 hover:bg-accent/40 -mx-2 px-2 rounded-md transition-colors">
                  <div>
                    <div className="font-mono text-xs font-semibold">{r.tracking_number}</div>
                    <div className="text-sm text-muted-foreground">{r.sender_name} → {r.recipient_name} · {r.destination}</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-secondary font-medium capitalize">{statusLabel(r.status)}</span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
