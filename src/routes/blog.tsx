import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/lib/blog-data";
import { Calendar, ArrowRight, Clock } from "lucide-react";

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

function BlogPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <Reveal from="up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Insights</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-3">Logistics insights & industry news.</h1>
            <p className="mt-4 text-primary-foreground/80">Perspectives from our team on global trade, freight markets, and supply chain strategy.</p>
          </Reveal>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((p, i) => (
            <Reveal key={p.slug} from="up" delay={i * 80}>
              <Card className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full">
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="block">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <img src={p.cover} alt={p.title} loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded bg-white/95 text-primary">{p.category}</span>
                  </div>
                </Link>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {p.date}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {p.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 leading-snug">
                    <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:text-gold transition-colors">{p.title}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-gold">
                    Read article <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
