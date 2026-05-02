import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Ship, LogIn, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/tracking", label: "Tracking" },
  { to: "/reviews", label: "Reviews" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-card-soft"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="h-9 w-9 rounded-lg bg-hero-gradient flex items-center justify-center shadow-elegant">
            <Ship className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display font-bold text-lg leading-tight">
            International Cargo
            <span className="block text-[10px] tracking-[0.2em] uppercase text-gold font-semibold">
              Dispatch
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">
              <LogIn className="h-4 w-4" /> Login
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-gold-gradient text-gold-foreground hover:opacity-90">
            <Link to="/quote">Request Quote</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-accent"
                activeProps={{ className: "bg-accent text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 mt-2 border-t border-border">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-gold-gradient text-gold-foreground">
                <Link to="/quote" onClick={() => setOpen(false)}>Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
