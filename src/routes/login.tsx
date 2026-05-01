import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { Lock, LogIn, UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in or create an account — International Cargo Dispatch" },
      { name: "description", content: "Sign in or create your International Cargo Dispatch account to manage shipments, request quotes, and track deliveries." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

type Mode = "signin" | "signup";

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // Redirect if already authenticated
  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data.user) navigate({ to: "/" });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) navigate({ to: "/" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
          },
        });
        if (error) throw error;
        setInfo("Account created. You're being signed in…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 py-20 max-w-md">
        <Reveal from="up">
          <Card className="shadow-elegant">
            <CardContent className="p-8">
              <div className="text-center mb-7">
                <div className="h-14 w-14 rounded-xl bg-hero-gradient mx-auto flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === "signin"
                    ? "Sign in to manage shipments and quotes."
                    : "Join International Cargo Dispatch — it only takes a moment."}
                </p>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 mb-6 rounded-lg bg-secondary p-1">
                {(["signin", "signup"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => { setMode(m); setError(null); setInfo(null); }}
                    className={`text-sm font-medium py-2 rounded-md transition-all ${
                      mode === m ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "signin" ? "Sign in" : "Sign up"}
                  </button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1.5" required />
                  </div>
                )}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1.5" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5" required minLength={8} />
                  {mode === "signup" && (
                    <p className="text-xs text-muted-foreground mt-1.5">Minimum 8 characters.</p>
                  )}
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-xs">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> <span>{error}</span>
                  </div>
                )}
                {info && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary text-xs text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" /> <span>{info}</span>
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground" disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                  {mode === "signin" ? "Sign in" : "Create account"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-6">
                By continuing you agree to our{" "}
                <Link to="/contact" className="text-primary hover:text-gold underline">terms</Link>.
              </p>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
