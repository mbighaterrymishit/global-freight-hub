import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights & Logistics News — International Cargo Dispatch" },
      { name: "description", content: "Articles, insights, and news on international cargo shipping, freight markets, customs regulations, and global logistics trends." },
      { property: "og:title", content: "Logistics Insights — International Cargo Dispatch" },
      { property: "og:description", content: "Expert articles on international cargo shipping and global logistics." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  { title: "2026 Ocean Freight Outlook: Rates, Capacity & Trade Lanes", excerpt: "Our annual deep-dive into projected sea freight market dynamics, key trade-lane shifts, and what shippers should expect.", date: "Apr 22, 2026", category: "Market Insights" },
  { title: "Navigating US Customs in 2026: A Practical Guide", excerpt: "From HS classification updates to CBP entry filings, here's what importers need to know to stay compliant and efficient.", date: "Apr 14, 2026", category: "Customs" },
  { title: "Air Freight vs. Sea Freight: Choosing the Right Mode", excerpt: "Total landed cost, transit time, and reliability — a framework for picking the right freight mode for every shipment.", date: "Apr 5, 2026", category: "Operations" },
  { title: "Building Resilient Supply Chains in a Volatile World", excerpt: "Geopolitical disruption is the new normal. Here's how leading importers are designing for resilience without inflating costs.", date: "Mar 28, 2026", category: "Strategy" },
  { title: "Cold Chain Logistics: Best Practices for Pharma & Food", excerpt: "Maintaining temperature integrity across continents requires more than reefer containers. A premium approach to cold chain.", date: "Mar 18, 2026", category: "Specialized" },
  { title: "Nearshoring to Mexico: The Logistics Playbook", excerpt: "How to design a high-performing US/MX cross-border lane — from customs preparation to last-mile distribution.", date: "Mar 9, 2026", category: "Strategy" },
];

function BlogPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Insights</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Logistics insights & industry news.</h1>
          <p className="mt-4 text-primary-foreground/80">Perspectives from our team on global trade, freight markets, and supply chain strategy.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p) => (
            <Card key={p.title} className="hover:shadow-elegant transition-all hover:-translate-y-1 overflow-hidden">
              <div className="aspect-[16/9] bg-hero-gradient relative">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/95 text-primary">{p.category}</span>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" /> {p.date}
                </div>
                <h3 className="text-lg font-semibold mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
                <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                  Read article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
