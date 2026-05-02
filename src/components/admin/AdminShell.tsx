import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";
import { LayoutDashboard, PackagePlus, Boxes, Settings, LogOut, Ship, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const nav: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/create", label: "Create Shipment", icon: PackagePlus },
  { to: "/admin/shipments", label: "Shipments", icon: Boxes },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children, email }: { children: ReactNode; email?: string }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  const SideContent = (
    <>
      <div className="px-5 py-5 border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-lg bg-hero-gradient flex items-center justify-center">
            <Ship className="h-5 w-5 text-primary-foreground" />
          </span>
          <div>
            <div className="font-display font-bold text-sm leading-tight text-sidebar-foreground">ICD Admin</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold">Control Center</div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map((n) => {
          const active = isActive(n.to, n.exact);
          return (
            <Link
              key={n.to}
              to={n.to as never}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        {email && <div className="px-3 py-2 text-xs text-sidebar-foreground/60 truncate">{email}</div>}
        <Button onClick={signOut} variant="ghost" className="w-full justify-start text-sidebar-foreground/80 hover:text-destructive">
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-secondary/40">
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        {SideContent}
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="relative w-64 flex flex-col bg-sidebar border-r border-sidebar-border">{SideContent}</aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-14 bg-card border-b flex items-center px-4 gap-3">
          <button onClick={() => setOpen(true)} className="p-2 rounded-md hover:bg-accent" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold">ICD Admin</span>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
