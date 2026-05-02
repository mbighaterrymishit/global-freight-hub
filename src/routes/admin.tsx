import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Loader2, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Panel — International Cargo Dispatch" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md shadow-elegant">
          <CardContent className="p-8 text-center">
            <ShieldAlert className="h-12 w-12 text-gold mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access denied</h1>
            <p className="text-sm text-muted-foreground mb-6">
              {user.email} doesn't have admin privileges.
            </p>
            <Button onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }} variant="outline">
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AdminShell email={user.email ?? undefined}>
      <Outlet />
    </AdminShell>
  );
}
