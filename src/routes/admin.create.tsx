import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Save, CheckCircle2, Copy, ExternalLink } from "lucide-react";
import { genTrackingNumber, SERVICE_TYPES, PAYMENT_MODES } from "@/lib/shipments";

export const Route = createFileRoute("/admin/create")({
  component: CreateShipment,
});

function CreateShipment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ tracking: string; url: string } | null>(null);
  const [form, setForm] = useState({
    sender_name: "", sender_address: "", sender_phone: "", sender_email: "",
    recipient_name: "", recipient_address: "", recipient_phone: "", recipient_email: "",
    package_description: "", origin: "", destination: "", current_location: "",
    carrier: "", shipment_type: "", service_type: "sea", product: "",
    weight_kg: "", quantity: "", payment_mode: "bank_transfer",
    estimated_delivery: "", pickup_at: "", departure_at: "", notes: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    const tracking_number = genTrackingNumber();
    const payload = {
      tracking_number,
      sender_name: form.sender_name,
      sender_address: form.sender_address,
      sender_phone: form.sender_phone || null,
      sender_email: form.sender_email || null,
      recipient_name: form.recipient_name,
      recipient_address: form.recipient_address,
      recipient_phone: form.recipient_phone || null,
      recipient_email: form.recipient_email || null,
      package_description: form.package_description || null,
      origin: form.origin,
      destination: form.destination,
      current_location: form.current_location || form.origin,
      carrier: form.carrier || null,
      shipment_type: form.shipment_type || null,
      service_type: form.service_type,
      product: form.product || null,
      weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
      quantity: form.quantity ? Number(form.quantity) : null,
      payment_mode: form.payment_mode || null,
      estimated_delivery: form.estimated_delivery || null,
      pickup_at: form.pickup_at || null,
      departure_at: form.departure_at || null,
      notes: form.notes || null,
      status: "shipment_created",
      created_by: user?.id,
    };
    const { error } = await supabase.from("shipments").insert(payload as never);
    if (error) { setError(error.message); setBusy(false); return; }
    await supabase.from("shipment_events").insert({
      shipment_id: undefined, // placeholder
    } as never).then(() => undefined).catch(() => undefined);
    // Insert initial event using fetched id
    const { data: row } = await supabase.from("shipments").select("id").eq("tracking_number", tracking_number).maybeSingle();
    if (row) {
      await supabase.from("shipment_events").insert({
        shipment_id: row.id,
        status: "shipment_created",
        location: form.origin,
        notes: "Shipment created",
      } as never);
    }
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setCreated({ tracking: tracking_number, url: `${origin}/tracking?id=${tracking_number}` });
    setBusy(false);
  };

  if (created) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-elegant border-emerald-500/30">
          <CardContent className="p-8 text-center">
            <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Shipment Created</h1>
            <p className="text-sm text-muted-foreground mb-6">Tracking number generated and saved. Status set to <strong>Shipment Created</strong>.</p>

            <div className="bg-secondary/50 rounded-lg p-4 mb-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Tracking Number</div>
              <div className="font-mono text-2xl font-bold">{created.tracking}</div>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-left">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Tracking Link</div>
              <div className="flex items-center gap-2">
                <code className="text-xs flex-1 truncate">{created.url}</code>
                <Button size="sm" variant="ghost" onClick={() => navigator.clipboard.writeText(created.url)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <Button asChild className="bg-primary"><Link to="/admin/shipments">View shipments</Link></Button>
              <Button asChild variant="outline"><a href={created.url} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /> Open tracking</a></Button>
              <Button onClick={() => { setCreated(null); navigate({ to: "/admin/create" }); }} variant="ghost">Create another</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-display">Create Shipment</h1>
        <p className="text-sm text-muted-foreground">Fill in shipment details. Tracking number is auto-generated on save.</p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        <Section title="Sender Information">
          <Field label="Sender Name *"><Input required value={form.sender_name} onChange={(e) => set("sender_name", e.target.value)} /></Field>
          <Field label="Sender Phone"><Input value={form.sender_phone} onChange={(e) => set("sender_phone", e.target.value)} /></Field>
          <Field label="Sender Email"><Input type="email" value={form.sender_email} onChange={(e) => set("sender_email", e.target.value)} /></Field>
          <Field label="Sender Address" full><Textarea rows={2} value={form.sender_address} onChange={(e) => set("sender_address", e.target.value)} /></Field>
        </Section>

        <Section title="Receiver Information">
          <Field label="Receiver Name *"><Input required value={form.recipient_name} onChange={(e) => set("recipient_name", e.target.value)} /></Field>
          <Field label="Receiver Phone"><Input value={form.recipient_phone} onChange={(e) => set("recipient_phone", e.target.value)} /></Field>
          <Field label="Receiver Email"><Input type="email" value={form.recipient_email} onChange={(e) => set("recipient_email", e.target.value)} /></Field>
          <Field label="Receiver Address" full><Textarea rows={2} value={form.recipient_address} onChange={(e) => set("recipient_address", e.target.value)} /></Field>
        </Section>

        <Section title="Shipment Details">
          <Field label="Package Description" full><Textarea rows={2} value={form.package_description} onChange={(e) => set("package_description", e.target.value)} /></Field>
          <Field label="Origin *"><Input required value={form.origin} onChange={(e) => set("origin", e.target.value)} placeholder="Newark, NJ, USA" /></Field>
          <Field label="Destination *"><Input required value={form.destination} onChange={(e) => set("destination", e.target.value)} placeholder="Hamburg, Germany" /></Field>
          <Field label="Current Location"><Input value={form.current_location} onChange={(e) => set("current_location", e.target.value)} placeholder="Defaults to origin" /></Field>
          <Field label="Carrier"><Input value={form.carrier} onChange={(e) => set("carrier", e.target.value)} placeholder="Maersk, DHL, ..." /></Field>
          <Field label="Type"><Input value={form.shipment_type} onChange={(e) => set("shipment_type", e.target.value)} placeholder="FCL, LCL, Express..." /></Field>
          <Field label="Service Type">
            <select className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={form.service_type} onChange={(e) => set("service_type", e.target.value)}>
              {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </Field>
          <Field label="Product"><Input value={form.product} onChange={(e) => set("product", e.target.value)} /></Field>
          <Field label="Weight (kg)"><Input type="number" step="0.01" value={form.weight_kg} onChange={(e) => set("weight_kg", e.target.value)} /></Field>
          <Field label="Quantity"><Input type="number" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} /></Field>
          <Field label="Payment Mode">
            <select className="h-9 w-full rounded-md border bg-transparent px-3 text-sm" value={form.payment_mode} onChange={(e) => set("payment_mode", e.target.value)}>
              {PAYMENT_MODES.map((s) => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
            </select>
          </Field>
          <Field label="Expected Delivery"><Input type="date" value={form.estimated_delivery} onChange={(e) => set("estimated_delivery", e.target.value)} /></Field>
          <Field label="Pick-up Date & Time"><Input type="datetime-local" value={form.pickup_at} onChange={(e) => set("pickup_at", e.target.value)} /></Field>
          <Field label="Departure Time"><Input type="datetime-local" value={form.departure_at} onChange={(e) => set("departure_at", e.target.value)} /></Field>
          <Field label="Notes" full><Textarea rows={2} value={form.notes} onChange={(e) => set("notes", e.target.value)} /></Field>
        </Section>

        {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

        <div className="flex gap-2 sticky bottom-4 bg-card/90 backdrop-blur p-3 rounded-lg border shadow-card-soft">
          <Button type="submit" disabled={busy} className="bg-primary">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Create shipment
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/admin/shipments" })}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="shadow-card-soft">
      <CardContent className="p-6">
        <h2 className="font-bold mb-4 text-base">{title}</h2>
        <div className="grid md:grid-cols-2 gap-4">{children}</div>
      </CardContent>
    </Card>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
