import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2, Plus, Trash2, Edit3, Package, ShieldAlert, LogOut, MapPin, Save, X,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — International Cargo Dispatch" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Shipment = {
  id: string;
  tracking_number: string;
  sender_name: string;
  recipient_name: string;
  origin: string;
  destination: string;
  service_type: string;
  status: string;
  current_location: string | null;
  estimated_delivery: string | null;
  weight_kg: number | null;
  cost_usd: number | null;
  notes: string | null;
  created_at: string;
};

type ShipmentEvent = {
  id: string;
  shipment_id: string;
  status: string;
  location: string | null;
  notes: string | null;
  occurred_at: string;
};

const STATUSES = ["pending", "picked_up", "in_transit", "customs", "out_for_delivery", "delivered", "exception"];
const SERVICES = ["air", "sea", "road", "rail", "express", "warehousing"];

function genTrackingNumber() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ICD-${new Date().getFullYear()}-${rand}`;
}

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [events, setEvents] = useState<Record<string, ShipmentEvent[]>>({});
  const [busy, setBusy] = useState(false);
  const [editing, setEditing] = useState<Shipment | null>(null);
  const [creating, setCreating] = useState(false);
  const [eventFor, setEventFor] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const loadShipments = async () => {
    const { data, error } = await supabase
      .from("shipments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setShipments((data ?? []) as Shipment[]);
  };

  useEffect(() => {
    if (isAdmin) loadShipments();
  }, [isAdmin]);

  const loadEvents = async (shipmentId: string) => {
    const { data } = await supabase
      .from("shipment_events")
      .select("*")
      .eq("shipment_id", shipmentId)
      .order("occurred_at", { ascending: false });
    setEvents((s) => ({ ...s, [shipmentId]: (data ?? []) as ShipmentEvent[] }));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const handleSave = async (form: Partial<Shipment>) => {
    setBusy(true); setError(null);
    try {
      if (editing) {
        const { error } = await supabase.from("shipments").update(form).eq("id", editing.id);
        if (error) throw error;
      } else {
        const payload = {
          ...form,
          tracking_number: form.tracking_number || genTrackingNumber(),
          created_by: user?.id,
        };
        const { error } = await supabase.from("shipments").insert(payload as never);
        if (error) throw error;
      }
      setEditing(null); setCreating(false);
      await loadShipments();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally { setBusy(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this shipment?")) return;
    await supabase.from("shipments").delete().eq("id", id);
    await loadShipments();
  };

  const handleAddEvent = async (form: { status: string; location: string; notes: string }) => {
    if (!eventFor) return;
    setBusy(true);
    const { error } = await supabase.from("shipment_events").insert({
      shipment_id: eventFor.id,
      status: form.status,
      location: form.location || null,
      notes: form.notes || null,
    });
    if (error) setError(error.message);
    else {
      // also bump shipment status + current_location
      await supabase.from("shipments").update({
        status: form.status,
        current_location: form.location || eventFor.current_location,
      }).eq("id", eventFor.id);
      await loadEvents(eventFor.id);
      await loadShipments();
    }
    setBusy(false);
  };

  if (loading) {
    return <SiteLayout><div className="container py-32 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div></SiteLayout>;
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <SiteLayout>
        <section className="container mx-auto px-4 py-24 max-w-md">
          <Card className="shadow-elegant">
            <CardContent className="p-8 text-center">
              <ShieldAlert className="h-12 w-12 text-gold mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Admin access required</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Your account ({user.email}) doesn't have admin privileges. Contact us to request access.
              </p>
              <div className="flex gap-2 justify-center">
                <Button asChild variant="outline"><Link to="/">Go home</Link></Button>
                <Button onClick={handleSignOut} variant="ghost"><LogOut className="h-4 w-4" /> Sign out</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{shipments.length} shipments · Signed in as {user.email}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => { setCreating(true); setEditing(null); }} className="bg-gold-gradient text-gold-foreground">
              <Plus className="h-4 w-4" /> New Shipment
            </Button>
            <Button variant="outline" onClick={handleSignOut}><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
        )}

        {(creating || editing) && (
          <ShipmentForm
            initial={editing ?? undefined}
            busy={busy}
            onCancel={() => { setEditing(null); setCreating(false); }}
            onSave={handleSave}
          />
        )}

        <Card className="shadow-card-soft">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking #</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    No shipments yet. Click "New Shipment" to add one.
                  </TableCell></TableRow>
                )}
                {shipments.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs font-semibold">{s.tracking_number}</TableCell>
                    <TableCell className="text-sm">{s.origin} → {s.destination}</TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{s.service_type}</Badge></TableCell>
                    <TableCell><Badge className="capitalize">{s.status.replace(/_/g, " ")}</Badge></TableCell>
                    <TableCell className="text-sm">{s.estimated_delivery ?? "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => { setEventFor(s); loadEvents(s.id); }} title="Events">
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => { setEditing(s); setCreating(false); }}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)} className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {eventFor && (
          <EventsPanel
            shipment={eventFor}
            events={events[eventFor.id] ?? []}
            busy={busy}
            onClose={() => setEventFor(null)}
            onAdd={handleAddEvent}
            onDelete={async (id) => {
              await supabase.from("shipment_events").delete().eq("id", id);
              await loadEvents(eventFor.id);
            }}
          />
        )}
      </section>
    </SiteLayout>
  );
}

function ShipmentForm({
  initial, busy, onSave, onCancel,
}: {
  initial?: Shipment;
  busy: boolean;
  onSave: (form: Partial<Shipment>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Shipment>>(
    initial ?? {
      tracking_number: "",
      sender_name: "", recipient_name: "",
      origin: "", destination: "",
      service_type: "sea", status: "pending",
      current_location: "", estimated_delivery: "",
      weight_kg: null, cost_usd: null, notes: "",
    },
  );
  const set = <K extends keyof Shipment>(k: K, v: Shipment[K] | string) =>
    setForm((s) => ({ ...s, [k]: v as Shipment[K] }));

  return (
    <Card className="mb-6 shadow-elegant border-gold/30">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4">{initial ? "Edit shipment" : "New shipment"}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Tracking number (auto if blank)">
            <Input value={form.tracking_number ?? ""} onChange={(e) => set("tracking_number", e.target.value)} placeholder="ICD-2026-XXXXXX" />
          </Field>
          <Field label="Service type">
            <select className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={form.service_type} onChange={(e) => set("service_type", e.target.value)}>
              {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Sender name"><Input value={form.sender_name ?? ""} onChange={(e) => set("sender_name", e.target.value)} required /></Field>
          <Field label="Recipient name"><Input value={form.recipient_name ?? ""} onChange={(e) => set("recipient_name", e.target.value)} required /></Field>
          <Field label="Origin"><Input value={form.origin ?? ""} onChange={(e) => set("origin", e.target.value)} placeholder="Newark, NJ, USA" required /></Field>
          <Field label="Destination"><Input value={form.destination ?? ""} onChange={(e) => set("destination", e.target.value)} placeholder="Hamburg, Germany" required /></Field>
          <Field label="Status">
            <select className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={form.status} onChange={(e) => set("status", e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
            </select>
          </Field>
          <Field label="Current location"><Input value={form.current_location ?? ""} onChange={(e) => set("current_location", e.target.value)} /></Field>
          <Field label="Estimated delivery"><Input type="date" value={form.estimated_delivery ?? ""} onChange={(e) => set("estimated_delivery", e.target.value)} /></Field>
          <Field label="Weight (kg)"><Input type="number" step="0.01" value={form.weight_kg ?? ""} onChange={(e) => set("weight_kg", e.target.value === "" ? null : Number(e.target.value) as never)} /></Field>
          <Field label="Cost (USD)"><Input type="number" step="0.01" value={form.cost_usd ?? ""} onChange={(e) => set("cost_usd", e.target.value === "" ? null : Number(e.target.value) as never)} /></Field>
          <div className="md:col-span-2">
            <Field label="Notes"><Textarea rows={3} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} /></Field>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <Button onClick={() => onSave(form)} disabled={busy} className="bg-primary">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
          </Button>
          <Button onClick={onCancel} variant="outline"><X className="h-4 w-4" /> Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function EventsPanel({
  shipment, events, busy, onClose, onAdd, onDelete,
}: {
  shipment: Shipment;
  events: ShipmentEvent[];
  busy: boolean;
  onClose: () => void;
  onAdd: (f: { status: string; location: string; notes: string }) => void;
  onDelete: (id: string) => void;
}) {
  const [status, setStatus] = useState("in_transit");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-elegant">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Tracking events</h2>
              <p className="text-xs font-mono text-muted-foreground">{shipment.tracking_number}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4" /></Button>
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-3">
            <select className="h-9 rounded-md border bg-transparent px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
            </select>
            <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <Button
            disabled={busy}
            onClick={() => { onAdd({ status, location, notes }); setLocation(""); setNotes(""); }}
            className="bg-gold-gradient text-gold-foreground mb-5"
          >
            <Plus className="h-4 w-4" /> Add event
          </Button>

          <div className="space-y-3 border-t pt-4">
            {events.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No events yet.</p>}
            {events.map((ev) => (
              <div key={ev.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <div className="font-semibold capitalize">{ev.status.replace(/_/g, " ")}</div>
                  {ev.location && <div className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {ev.location}</div>}
                  {ev.notes && <div className="text-xs text-muted-foreground mt-1">{ev.notes}</div>}
                  <div className="text-xs text-muted-foreground mt-1">{new Date(ev.occurred_at).toLocaleString()}</div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onDelete(ev.id)} className="text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
