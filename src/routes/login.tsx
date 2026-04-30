import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, LogIn, Info } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — International Cargo Dispatch" },
      { name: "description", content: "Secure login for International Cargo Dispatch staff and authorized partners." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <SiteLayout>
      <section className="container mx-auto px-4 lg:px-8 py-20 max-w-md">
        <Card className="shadow-elegant">
          <CardContent className="p-8">
            <div className="text-center mb-7">
              <div className="h-14 w-14 rounded-xl bg-hero-gradient mx-auto flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Sign in</h1>
              <p className="text-sm text-muted-foreground mt-1">Access the International Cargo Dispatch admin panel.</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@internationalcargodispatch.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground">
                <LogIn className="h-4 w-4" /> Sign in
              </Button>
            </form>

            <div className="mt-6 flex items-start gap-2 p-3 rounded-lg bg-secondary text-xs text-muted-foreground">
              <Info className="h-4 w-4 text-gold shrink-0 mt-0.5" />
              <p>Authentication is provisioned by our administrators. Accounts are not self-registered.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}
