import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Edit3, Trash2, PackagePlus, Search, Package } from "lucide-react";
import { statusLabel } from "@/lib/shipments";

export const Route = createFileRoute("/admin/shipments")({
  component: ShipmentsList,
});

type Row = {
  id: string; tracking_number: string; sender_name: string; recipient_name: string;
  status: string; created_at: string; origin: string; destination: string;
};

function ShipmentsList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");

  const load = async () => {
    const { data } = await supabase.from("shipments").select("id,tracking_number,sender_name,recipient_name,status,created_at,origin,destination").order("created_at", { ascending: false });
    setRows((data ?? []) as Row[]);
  };
  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this shipment? This cannot be undone.")) return;
    await supabase.from("shipment_events").delete().eq("shipment_id", id);
    await supabase.from("shipments").delete().eq("id", id);
    load();
  };

  const filtered = rows.filter((r) => {
    if (!q.trim()) return true;
    const s = q.toLowerCase();
    return r.tracking_number.toLowerCase().includes(s) || r.sender_name.toLowerCase().includes(s) || r.recipient_name.toLowerCase().includes(s) || r.destination.toLowerCase().includes(s);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Shipments</h1>
          <p className="text-sm text-muted-foreground">{rows.length} total</p>
        </div>
        <Button asChild className="bg-gold-gradient text-gold-foreground"><Link to="/admin/create"><PackagePlus className="h-4 w-4" /> New</Link></Button>
      </div>

      <Card className="shadow-card-soft">
        <CardContent className="p-0">
          <div className="p-4 border-b flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by tracking, sender, receiver, destination..." value={q} onChange={(e) => setQ(e.target.value)} className="border-0 shadow-none focus-visible:ring-0" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                  <Package className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  No shipments found.
                </TableCell></TableRow>
              )}
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs font-semibold">{r.tracking_number}</TableCell>
                  <TableCell className="text-sm">{r.sender_name}</TableCell>
                  <TableCell className="text-sm">{r.recipient_name}<div className="text-xs text-muted-foreground">{r.destination}</div></TableCell>
                  <TableCell><Badge variant="outline" className="capitalize">{statusLabel(r.status)}</Badge></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="ghost" title="View tracking"><a href={`/tracking?id=${r.tracking_number}`} target="_blank" rel="noreferrer"><Eye className="h-4 w-4" /></a></Button>
                    <Button asChild size="sm" variant="ghost" title="Edit / Update"><Link to="/admin/shipments/$id" params={{ id: r.id }}><Edit3 className="h-4 w-4" /></Link></Button>
                    <Button size="sm" variant="ghost" onClick={() => remove(r.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
