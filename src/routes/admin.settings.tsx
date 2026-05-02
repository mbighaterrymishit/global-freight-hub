import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Mail, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-display">Settings</h1>
        <p className="text-sm text-muted-foreground">Account & access</p>
      </div>

      <Card className="shadow-card-soft">
        <CardContent className="p-6 space-y-4">
          <Row icon={Mail} label="Email" value={user?.email ?? "—"} />
          <Row icon={Shield} label="Role" value={isAdmin ? "Administrator" : "User"} />
        </CardContent>
      </Card>

      <Card className="shadow-card-soft border-destructive/20">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <div className="font-semibold">Sign out</div>
            <p className="text-sm text-muted-foreground">End your admin session.</p>
          </div>
          <Button onClick={signOut} variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
