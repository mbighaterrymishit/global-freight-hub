import { Link } from "@tanstack/react-router";
import { Ship, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="h-9 w-9 rounded-lg bg-gold-gradient flex items-center justify-center">
              <Ship className="h-5 w-5 text-gold-foreground" />
            </span>
            <span className="font-display font-bold text-lg">International Cargo Dispatch</span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Premium global freight forwarding and cargo logistics. Headquartered in the United States, serving 180+ countries.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gold">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/services" className="hover:text-gold">Air Freight</Link></li>
            <li><Link to="/services" className="hover:text-gold">Sea Freight</Link></li>
            <li><Link to="/services" className="hover:text-gold">Road Transport</Link></li>
            <li><Link to="/services" className="hover:text-gold">Warehousing</Link></li>
            <li><Link to="/services" className="hover:text-gold">Customs Clearance</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gold">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/reviews" className="hover:text-gold">Reviews</Link></li>
            <li><Link to="/blog" className="hover:text-gold">Insights</Link></li>
            <li><Link to="/faq" className="hover:text-gold">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-gold" /> United States</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-gold" /> info@internationalcargodispatch.com</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 text-gold" /> +1 (555) 010-0199</li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} International Cargo Dispatch. All rights reserved.</p>
          <p>Headquartered in the United States · Global logistics network</p>
        </div>
      </div>
    </footer>
  );
}
