import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Loader2, Save, Plus, Trash2, MapPin, ExternalLink } from "lucide-react";
import { STATUSES, statusLabel } from "@/lib/shipments";

export const Route = createFileRoute("/admin/shipments/$id")({
  component: EditShipment,
});

type Shipment = Record<string, unknown> & {
  id: string; tracking_number: string; status: string; current_location: string | null;
  origin: string; destination: string; sender_name: string; recipient_name: string;
};

type Event = { id: string; status: string; location: string | null; notes: string | null; occurred_at: string };

function EditShipment() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [newStatus, setNewStatus] = useState("in_transit");
  const [newLocation, setNewLocation] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const load = async () => {
    const { data } = await supabase.from("shipments").select("*").eq("id", id).maybeSingle();
    setShipment((data as Shipment) ?? null);
    if (data) setNewLocation((data as Shipment).current_location ?? "");
    const { data: ev } = await supabase.from("shipment_events").select("*").eq("shipment_id", id).order("occurred_at", { ascending: false });
    setEvents((ev ?? []) as Event[]);
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const updateField = (k: string, v: unknown) => setShipment((s) => s ? { ...s, [k]: v } as Shipment : s);

  const save = async () => {
    if (!shipment) return;
    setBusy(true); setErr(null);
    const { id: _id, tracking_number: _tn, ...rest } = shipment;
    void _id; void _tn;
    const { error } = await supabase.from("shipments").update(rest).eq("id", id);
    if (error) setErr(error.message);
    setBusy(false);
  };

  const addEvent = async () => {
    if (!shipment) return;
    setBusy(true);
    const { error } = await supabase.from("shipment_events").insert({
      shipment_id: shipment.id, status: newStatus,
      location: newLocation || null, notes: newNotes || null,
    } as never);
    if (!error) {
      await supabase.from("shipments").update({
        status: newStatus,
        current_location: newLocation || shipment.current_location,
      }).eq("id", shipment.id);
      setNewNotes("");
      await load();
    } else setErr(error.message);
    setBusy(false);
  };

  const deleteEvent = async (eid: string) => {
    await supabase.from("shipment_events").delete().eq("id", eid);
    load();
  };

  if (!shipment) {
    return <div className="text-center py-16"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>;
  }

  const trackingUrl = typeof window !== "undefined" ? `${window.location.origin}/tracking?id=${shipment.tracking_number}` : "";

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm"><Link to="/admin/shipments"><ArrowLeft className="h-4 w-4" /> Back</Link></Button>
        <div className="flex-1">
          <div className="font-mono text-sm font-bold">{shipment.tracking_number}</div>
          <div className="text-xs text-muted-foreground">{shipment.origin} → {shipment.destination}</div>
        </div>
        <Button asChild variant="outline" size="sm"><a href={trackingUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> Public tracking</a></Button>
      </div>

      <Card className="shadow-card-soft">
        <CardContent className="p-6">
          <h2 className="font-bold mb-4">Update Status & Add Timeline Event</h2>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">New Status</Label>
              <select className="mt-1.5 h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
              </select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Location</Label>
              <Input className="mt-1.5" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="City, Country" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notes</Label>
              <Input className="mt-1.5" value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
            </div>
          </div>
          <Button onClick={addEvent} disabled={busy} className="bg-primary mt-4">
            <Plus className="h-4 w-4" /> Add timeline update
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-card-soft">
        <CardContent className="p-6">
          <h2 className="font-bold mb-4">Timeline ({events.length})</h2>
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No events yet.</p>
          ) : (
            <div className="space-y-3">
              {events.map((e) => (
                <div key={e.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <div className="font-semibold capitalize">{statusLabel(e.status)}</div>
                    {e.location && <div className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.location}</div>}
                    {e.notes && <div className="text-xs text-muted-foreground mt-1">{e.notes}</div>}
                    <div className="text-xs text-muted-foreground mt-1">{new Date(e.occurred_at).toLocaleString()}</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => deleteEvent(e.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card-soft">
        <CardContent className="p-6">
          <h2 className="font-bold mb-4">Edit Shipment Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              ["sender_name", "Sender Name"], ["sender_phone", "Sender Phone"],
              ["sender_email", "Sender Email"], ["sender_address", "Sender Address"],
              ["recipient_name", "Receiver Name"], ["recipient_phone", "Receiver Phone"],
              ["recipient_email", "Receiver Email"], ["recipient_address", "Receiver Address"],
              ["origin", "Origin"], ["destination", "Destination"],
              ["current_location", "Current Location"], ["carrier", "Carrier"],
              ["shipment_type", "Type"], ["service_type", "Service Type"],
              ["product", "Product"], ["payment_mode", "Payment Mode"],
              ["package_description", "Package Description"],
            ].map(([k, label]) => (
              <div key={k}>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
                <Input className="mt-1.5" value={(shipment[k] as string) ?? ""} onChange={(e) => updateField(k, e.target.value)} />
              </div>
            ))}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Weight (kg)</Label>
              <Input type="number" step="0.01" className="mt-1.5" value={(shipment.weight_kg as number | null) ?? ""} onChange={(e) => updateField("weight_kg", e.target.value === "" ? null : Number(e.target.value))} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Quantity</Label>
              <Input type="number" className="mt-1.5" value={(shipment.quantity as number | null) ?? ""} onChange={(e) => updateField("quantity", e.target.value === "" ? null : Number(e.target.value))} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Expected Delivery</Label>
              <Input type="date" className="mt-1.5" value={(shipment.estimated_delivery as string | null) ?? ""} onChange={(e) => updateField("estimated_delivery", e.target.value || null)} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Pickup</Label>
              <Input type="datetime-local" className="mt-1.5" value={((shipment.pickup_at as string | null) ?? "").slice(0, 16)} onChange={(e) => updateField("pickup_at", e.target.value || null)} />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Departure</Label>
              <Input type="datetime-local" className="mt-1.5" value={((shipment.departure_at as string | null) ?? "").slice(0, 16)} onChange={(e) => updateField("departure_at", e.target.value || null)} />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Notes</Label>
              <Textarea className="mt-1.5" rows={3} value={(shipment.notes as string | null) ?? ""} onChange={(e) => updateField("notes", e.target.value)} />
            </div>
          </div>
          {err && <div className="mt-3 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{err}</div>}
          <div className="flex gap-2 mt-5">
            <Button onClick={save} disabled={busy} className="bg-primary">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: "/admin/shipments" })}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
