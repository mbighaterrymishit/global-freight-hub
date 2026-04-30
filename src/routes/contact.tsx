import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — International Cargo Dispatch" },
      { name: "description", content: "Contact International Cargo Dispatch in the United States. Email info@internationalcargodispatch.com for global freight quotes and support." },
      { property: "og:title", content: "Contact International Cargo Dispatch" },
      { property: "og:description", content: "Reach our US-based logistics team 24/7." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact us</span>
          <h1 className="text-3xl md:text-5xl font-bold mt-3">We&apos;re here, around the clock.</h1>
          <p className="mt-4 text-primary-foreground/80">Reach our US headquarters or talk to a logistics specialist anywhere in the world.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-5">
          {[
            { icon: Mail, t: "Email us", v: "info@internationalcargodispatch.com" },
            { icon: Phone, t: "Call us", v: "+1 (555) 010-0199" },
            { icon: MapPin, t: "Headquarters", v: "United States" },
            { icon: Clock, t: "Hours", v: "24 / 7 global support · Office: Mon–Fri 8am–7pm EST" },
          ].map((c) => (
            <Card key={c.t}><CardContent className="p-5 flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-gold-gradient flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-gold-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.t}</div>
                <div className="font-semibold mt-0.5 break-words">{c.v}</div>
              </div>
            </CardContent></Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          <Card className="shadow-elegant">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-1">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-6">We typically reply within 2 business hours.</p>
              <form
                action="https://formsubmit.co/info@internationalcargodispatch.com"
                method="POST"
                className="space-y-5"
              >
                <input type="hidden" name="_subject" value="New Contact — ICD Website" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cname">Full name *</Label>
                    <Input id="cname" name="name" required maxLength={100} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="cemail">Email *</Label>
                    <Input id="cemail" name="email" type="email" required maxLength={255} className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="csubject">Subject</Label>
                  <Input id="csubject" name="subject" maxLength={150} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="cmsg">Message *</Label>
                  <Textarea id="cmsg" name="message" required maxLength={1500} rows={6} className="mt-1.5" />
                </div>
                <Button type="submit" size="lg" className="bg-primary text-primary-foreground">
                  <Send className="h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="rounded-2xl overflow-hidden border shadow-card-soft aspect-[16/6]">
          <iframe
            title="United States map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-125,24,-66,50&layer=mapnik"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
