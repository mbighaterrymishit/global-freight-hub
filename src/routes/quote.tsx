import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Quote — International Cargo Dispatch" },
      { name: "description", content: "Request a custom freight quote. Air, sea, road, and warehousing pricing tailored to your shipment from the United States." },
      { property: "og:title", content: "Request a Quote" },
      { property: "og:description", content: "Get a tailored shipping quote from International Cargo Dispatch." },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Request a quote</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">Tell us about your shipment.</h1>
          <p className="mt-4 text-primary-foreground/80">Our US-based team responds with a tailored quote within 2 business hours.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16 max-w-3xl">
        <Card className="shadow-elegant">
          <CardContent className="p-6 md:p-10">
            <form
              action="https://formsubmit.co/info@internationalcargodispatch.com"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_subject" value="New Quote Request — ICD" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Full name *</Label>
                  <Input id="name" name="name" required maxLength={100} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" maxLength={100} className="mt-1.5" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" required maxLength={255} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" maxLength={30} className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="service">Service type *</Label>
                <Select name="service" required>
                  <SelectTrigger id="service" className="mt-1.5"><SelectValue placeholder="Select a service" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Air Freight">Air Freight</SelectItem>
                    <SelectItem value="Sea Freight (FCL)">Sea Freight — FCL</SelectItem>
                    <SelectItem value="Sea Freight (LCL)">Sea Freight — LCL</SelectItem>
                    <SelectItem value="Road Transport">Road Transport</SelectItem>
                    <SelectItem value="Warehousing">Warehousing & 3PL</SelectItem>
                    <SelectItem value="Customs">Customs Clearance</SelectItem>
                    <SelectItem value="Project Cargo">Project / Specialized Cargo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="origin">Origin (city, country) *</Label>
                  <Input id="origin" name="origin" required maxLength={120} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="destination">Destination (city, country) *</Label>
                  <Input id="destination" name="destination" required maxLength={120} className="mt-1.5" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input id="weight" name="weight" type="number" min="0" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="dimensions">Dimensions (L × W × H)</Label>
                  <Input id="dimensions" name="dimensions" maxLength={100} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="packages">Packages</Label>
                  <Input id="packages" name="packages" type="number" min="1" className="mt-1.5" />
                </div>
              </div>

              <div>
                <Label htmlFor="cargo">Cargo description *</Label>
                <Textarea id="cargo" name="cargo" required maxLength={1000} rows={5} className="mt-1.5" placeholder="Describe what you're shipping, special handling requirements, etc." />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground">
                <Send className="h-4 w-4" /> Submit Quote Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </SiteLayout>
  );
}
