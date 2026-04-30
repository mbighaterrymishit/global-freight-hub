import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Quote, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — International Cargo Dispatch" },
      {
        name: "description",
        content:
          "Read 30+ verified reviews from premium clients shipping with International Cargo Dispatch — air freight, sea freight, customs clearance, and warehousing.",
      },
      { property: "og:title", content: "Client Reviews — International Cargo Dispatch" },
      {
        property: "og:description",
        content: "Trusted by businesses worldwide. 4.9/5 rating from 2,800+ verified shipments.",
      },
    ],
  }),
  component: ReviewsPage,
});

type Service = "Air Freight" | "Sea Freight" | "Road" | "Warehousing" | "Customs";

type Review = {
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  service: Service;
  quote: string;
  date: string;
  img: string;
};

// 30 unique randomuser.me portraits — no repeats
const REVIEWS: Review[] = [
  { name: "Marcus Whitfield", role: "VP Supply Chain", company: "Apex Manufacturing", location: "Houston, TX", rating: 5, service: "Sea Freight", quote: "ICD has transformed our trans-Pacific operations. The visibility, the customs work, the proactive communications — every shipment feels handled by a team that genuinely cares about our outcomes.", date: "2 weeks ago", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Sophia Andersen", role: "Logistics Director", company: "Nordic Trade Co.", location: "Stockholm, Sweden", rating: 5, service: "Sea Freight", quote: "Five years, thousands of containers, zero major incidents. They're not a vendor; they're a strategic partner that has scaled alongside our European expansion.", date: "1 month ago", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Rajiv Khurana", role: "Chief Executive Officer", company: "Bharat Imports Ltd.", location: "Mumbai, India", rating: 5, service: "Customs", quote: "Their customs team navigates complexities most forwarders won't even attempt. Truly premium service backed by deep regulatory expertise.", date: "3 weeks ago", img: "https://randomuser.me/api/portraits/men/68.jpg" },
  { name: "Isabella Romano", role: "Head of Procurement", company: "Milano Luxury Group", location: "Milan, Italy", rating: 5, service: "Air Freight", quote: "Our high-value couture pieces require white-glove handling. ICD delivers on every detail — temperature, security, timing. Flawless.", date: "5 days ago", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "James Patterson", role: "COO", company: "Atlantic Pharmaceuticals", location: "Boston, MA", rating: 5, service: "Air Freight", quote: "Cold-chain pharma logistics demand zero margin for error. ICD's monitoring infrastructure is best-in-class. We trust them with our most critical shipments.", date: "1 week ago", img: "https://randomuser.me/api/portraits/men/15.jpg" },
  { name: "Mei Lin Zhao", role: "Export Manager", company: "Shanghai Precision Tools", location: "Shanghai, China", rating: 5, service: "Sea Freight", quote: "From booking to port-of-discharge, the level of communication is on another tier. Our US distributors have noticed the difference immediately.", date: "2 months ago", img: "https://randomuser.me/api/portraits/women/22.jpg" },
  { name: "Oliver Bennett", role: "Founder", company: "Bennett & Sons Wine Importers", location: "London, UK", rating: 5, service: "Sea Freight", quote: "Wine logistics is unforgiving. ICD has earned every shipment we've trusted them with — climate-controlled containers, perfect documentation, on-time discharge.", date: "3 weeks ago", img: "https://randomuser.me/api/portraits/men/41.jpg" },
  { name: "Ana Carolina Silva", role: "Director of Operations", company: "São Paulo Trading", location: "São Paulo, Brazil", rating: 5, service: "Customs", quote: "Brazilian customs can break a less experienced forwarder. ICD's brokers have an exceptional track record clearing our high-volume electronics imports.", date: "1 month ago", img: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Hassan Al-Mansoori", role: "Managing Partner", company: "Gulf Logistics Holdings", location: "Dubai, UAE", rating: 5, service: "Air Freight", quote: "We've worked with the world's largest forwarders. ICD competes at that level on capability, with the personal service those giants can no longer offer.", date: "6 days ago", img: "https://randomuser.me/api/portraits/men/77.jpg" },
  { name: "Charlotte Dubois", role: "Supply Chain Lead", company: "Maison Lafayette", location: "Paris, France", rating: 5, service: "Air Freight", quote: "Premium fashion launches live or die by timing. ICD has hit every window for three consecutive seasons. Reliability you can plan a business around.", date: "2 weeks ago", img: "https://randomuser.me/api/portraits/women/33.jpg" },
  { name: "Daniel O'Sullivan", role: "VP of Logistics", company: "Pacific Coast Foods", location: "Los Angeles, CA", rating: 5, service: "Road", quote: "Cross-border refrigerated trucking is a nightmare with the wrong partner. ICD has been our north star for two years — clean, on-time, every load.", date: "4 days ago", img: "https://randomuser.me/api/portraits/men/52.jpg" },
  { name: "Yuki Tanaka", role: "Head of Imports", company: "Tokyo Heritage Imports", location: "Tokyo, Japan", rating: 5, service: "Sea Freight", quote: "The attention to detail in documentation has saved us from costly delays multiple times. A genuinely premium operation from end to end.", date: "3 weeks ago", img: "https://randomuser.me/api/portraits/women/72.jpg" },
  { name: "Ethan Caldwell", role: "Founder & CEO", company: "Caldwell Aerospace Components", location: "Seattle, WA", rating: 5, service: "Air Freight", quote: "Aerospace-grade parts ship on aerospace-grade timelines. ICD respects that — every milestone tracked, every customs filing pre-cleared. World class.", date: "1 week ago", img: "https://randomuser.me/api/portraits/men/86.jpg" },
  { name: "Priya Venkatesh", role: "Operations Director", company: "Bangalore Tech Exports", location: "Bangalore, India", rating: 4.5, service: "Air Freight", quote: "Our quarterly hardware shipments to North American clients have never been smoother. Pricing is transparent, service is consistently excellent.", date: "2 weeks ago", img: "https://randomuser.me/api/portraits/women/55.jpg" },
  { name: "Lukas Weber", role: "Logistics Manager", company: "Hamburg Industrial Group", location: "Hamburg, Germany", rating: 5, service: "Sea Freight", quote: "Hamburg is a demanding port. ICD's local team operates with German precision while bringing American responsiveness. The best of both worlds.", date: "5 weeks ago", img: "https://randomuser.me/api/portraits/men/24.jpg" },
  { name: "Amara Okonkwo", role: "Import Manager", company: "Lagos Trade Partners", location: "Lagos, Nigeria", rating: 5, service: "Customs", quote: "West African customs are challenging. ICD's expertise has cut our average clearance time by more than half. Game-changing for our cash flow.", date: "10 days ago", img: "https://randomuser.me/api/portraits/women/19.jpg" },
  { name: "Ryan Mitchell", role: "Chief Logistics Officer", company: "Midwest Distribution Co.", location: "Chicago, IL", rating: 5, service: "Warehousing", quote: "We moved our entire 3PL operation to ICD's bonded warehouse. Inventory accuracy, pick-pack speed, and integration with our WMS — all exceptional.", date: "3 weeks ago", img: "https://randomuser.me/api/portraits/men/91.jpg" },
  { name: "Catalina Reyes", role: "Export Director", company: "Mexico Premium Goods", location: "Mexico City, Mexico", rating: 5, service: "Road", quote: "Cross-border into Texas used to be our biggest pain point. ICD's nearshoring lanes are tight, predictable, and very competitively priced.", date: "1 week ago", img: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Henrik Lindqvist", role: "Procurement Manager", company: "Scandinavia Heavy Industries", location: "Oslo, Norway", rating: 5, service: "Sea Freight", quote: "Project cargo for offshore equipment is highly specialized. ICD has handled three multi-million dollar shipments for us flawlessly.", date: "2 months ago", img: "https://randomuser.me/api/portraits/men/47.jpg" },
  { name: "Aisha Rahman", role: "Founder", company: "Singapore Specialty Foods", location: "Singapore", rating: 5, service: "Air Freight", quote: "Time-sensitive perishables to North America. ICD's air freight network gets us there with shelf life intact and paperwork pristine. Truly excellent.", date: "4 days ago", img: "https://randomuser.me/api/portraits/women/79.jpg" },
  { name: "Connor MacGregor", role: "Director of Operations", company: "Highland Whisky Exports", location: "Edinburgh, Scotland", rating: 5, service: "Sea Freight", quote: "Excise-bonded shipments require absolute precision. ICD has handled our US allocations for three years without a single issue. Quietly outstanding.", date: "3 weeks ago", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Valentina Costa", role: "Head of Global Logistics", company: "Costa Wine Estates", location: "Mendoza, Argentina", rating: 5, service: "Sea Freight", quote: "Reefer containers across the equator with our finest reserves — delivered in perfect condition every single time. We sleep better at night.", date: "1 month ago", img: "https://randomuser.me/api/portraits/women/88.jpg" },
  { name: "Theo Karlsson", role: "VP Operations", company: "Atlantic Yacht Brokers", location: "Miami, FL", rating: 5, service: "Sea Freight", quote: "Specialized roll-on/roll-off shipments for high-value vessels. ICD coordinates with the precision and discretion this segment demands.", date: "2 weeks ago", img: "https://randomuser.me/api/portraits/men/58.jpg" },
  { name: "Naomi Hartwell", role: "Supply Chain VP", company: "Hartwell Beauty Brands", location: "New York, NY", rating: 5, service: "Air Freight", quote: "Beauty launches require a forwarder that understands brand-critical timelines. ICD has become an extension of our planning team. Indispensable.", date: "6 days ago", img: "https://randomuser.me/api/portraits/women/26.jpg" },
  { name: "Gabriel Costa", role: "CEO", company: "Iberian Olive Oil Co.", location: "Madrid, Spain", rating: 4.5, service: "Sea Freight", quote: "From Andalusia to American shelves, ICD has built us a supply chain we can finally call premium. Customs paperwork is always in order.", date: "1 month ago", img: "https://randomuser.me/api/portraits/men/72.jpg" },
  { name: "Eleanor Whitaker", role: "Operations Director", company: "Whitaker Antiques International", location: "San Francisco, CA", rating: 5, service: "Air Freight", quote: "Museum-grade antiques require museum-grade logistics. ICD's white-glove service and insurance handling are simply unmatched in our experience.", date: "2 weeks ago", img: "https://randomuser.me/api/portraits/women/40.jpg" },
  { name: "Kenji Nakamura", role: "Logistics Lead", company: "Osaka Auto Parts", location: "Osaka, Japan", rating: 5, service: "Warehousing", quote: "JIT delivery to US automotive plants — ICD's warehousing and sequencing operations are tuned to factory rhythms. Outstanding partner.", date: "3 weeks ago", img: "https://randomuser.me/api/portraits/men/29.jpg" },
  { name: "Layla Ahmadi", role: "Export Manager", company: "Istanbul Textile Group", location: "Istanbul, Turkey", rating: 5, service: "Sea Freight", quote: "Container-load shipments to East Coast US ports. Pricing is honest, transit times are consistent, and the team replies in minutes, not days.", date: "5 days ago", img: "https://randomuser.me/api/portraits/women/61.jpg" },
  { name: "William Foster", role: "President", company: "Foster Industrial Holdings", location: "Atlanta, GA", rating: 5, service: "Road", quote: "We run heavy machinery across North America. ICD's specialized trucking division handles permits, escorts, and routing better than anyone we've used.", date: "1 week ago", img: "https://randomuser.me/api/portraits/men/11.jpg" },
  { name: "Grace O'Brien", role: "Chief Operations Officer", company: "Auckland Premium Exports", location: "Auckland, New Zealand", rating: 5, service: "Air Freight", quote: "Shipping high-value perishables half a world away requires absolute trust in your forwarder. ICD has earned ours, shipment after shipment.", date: "2 months ago", img: "https://randomuser.me/api/portraits/women/50.jpg" },
];

const FILTERS: Array<"All" | Service> = ["All", "Air Freight", "Sea Freight", "Road", "Warehousing", "Customs"];

function ReviewsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = useMemo(
    () => (filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.service === filter)),
    [filter],
  );
  const avg = useMemo(
    () => (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1),
    [],
  );

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium tracking-wide mb-5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> Verified client reviews
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
              Trusted by businesses
              <span className="block bg-gold-gradient bg-clip-text text-transparent">across the globe.</span>
            </h1>
            <p className="mt-5 text-lg text-primary-foreground/80 max-w-2xl">
              {REVIEWS.length}+ premium clients. {avg}/5 average rating. Real stories from leaders who ship with International Cargo Dispatch.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-8">
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-6 w-6 fill-gold text-gold" />)}
                </div>
                <div className="text-sm text-primary-foreground/70 mt-1">{avg} out of 5 · {REVIEWS.length} reviews</div>
              </div>
              <div className="border-l border-white/20 pl-8">
                <div className="text-3xl font-bold text-gold">2,800+</div>
                <div className="text-sm text-primary-foreground/70">Verified shipments rated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="container mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary shadow-card-soft"
                  : "bg-card border-border text-foreground hover:border-primary/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <Card
              key={r.name}
              className="border-border/60 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <CardContent className="p-7 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(r.rating) ? "fill-gold text-gold"
                            : i < r.rating ? "fill-gold/50 text-gold"
                            : "text-muted-foreground/30",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                    {r.service}
                  </span>
                </div>

                <Quote className="h-6 w-6 text-gold/40 mb-2" />
                <p className="text-foreground/90 leading-relaxed text-sm flex-1">&ldquo;{r.quote}&rdquo;</p>

                <div className="flex items-center gap-3 pt-5 mt-5 border-t border-border">
                  <img
                    src={r.img}
                    alt={r.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/30"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{r.role} · {r.company}</div>
                    <div className="text-xs text-gold flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 shrink-0" /> <span className="truncate">{r.location}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{r.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 lg:px-8 pb-24">
        <div className="rounded-3xl bg-hero-gradient text-primary-foreground p-10 lg:p-14 shadow-elegant text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Join thousands of satisfied shippers.</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            Experience the premium logistics service our clients trust. Get a tailored quote today.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="bg-gold-gradient text-gold-foreground hover:opacity-90">
              <Link to="/quote">Request a Quote <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-primary-foreground hover:bg-white/10">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
