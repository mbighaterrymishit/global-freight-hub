import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — International Cargo Dispatch" },
      { name: "description", content: "Frequently asked questions about international cargo shipping, tracking, customs clearance, and freight forwarding services." },
      { property: "og:title", content: "Logistics FAQ — International Cargo Dispatch" },
      { property: "og:description", content: "Common questions about international cargo shipping and tracking." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  { q: "How do I track my shipment?", a: "Use the tracking page and enter your unique tracking number (format: ICD-YYYY-XXXXXX). You'll see real-time status, current location, and estimated delivery." },
  { q: "What countries do you ship to?", a: "We ship to 180+ countries across six continents through our network of owned offices and trusted partners." },
  { q: "How long does international shipping take?", a: "Air freight: 2–5 days to major hubs. Sea freight: 14–45 days depending on route. Road transport varies by region. Exact transit times appear in your quote." },
  { q: "Do you handle customs clearance?", a: "Yes. Our licensed customs brokers handle documentation, duties, tariff classification, and trade compliance for both export and import sides." },
  { q: "Are my shipments insured?", a: "Cargo insurance is available on every shipment with declared-value coverage. Our team will recommend the right policy for your cargo." },
  { q: "Can you handle dangerous goods or temperature-sensitive cargo?", a: "Yes. We're certified for dangerous goods (DG/IMDG) and offer temperature-controlled solutions across air, sea, and road freight." },
  { q: "How do I get a quote?", a: "Submit our online quote form or contact us directly. Our US team responds with a tailored quote within 2 business hours." },
  { q: "What payment methods do you accept?", a: "We accept bank transfer, major credit cards, and offer credit terms for established business clients." },
  { q: "What if my shipment is delayed?", a: "Our team monitors every shipment proactively. If a delay occurs, we notify you immediately with the cause, revised ETA, and any mitigation options." },
  { q: "Do you offer warehousing in the United States?", a: "Yes. We operate bonded and non-bonded warehouses in strategic US hubs with full 3PL fulfillment, pick-pack, and WMS integration." },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">FAQ</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Frequently asked questions.</h1>
          <p className="mt-4 text-primary-foreground/80">Everything you need to know about shipping with International Cargo Dispatch.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-5 bg-card">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
