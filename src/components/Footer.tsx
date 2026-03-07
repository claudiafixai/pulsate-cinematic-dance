import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/pulsate-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">Pulsate</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A cinematic dance competition designed for the big screen. Where dance meets film and community.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Explore</h4>
            <div className="space-y-2">
              {[
                { label: "About", to: "/about" },
                { label: "Competition", to: "/competition" },
                { label: "Workshops", to: "/workshops" },
                { label: "Premiere", to: "/premiere" },
                { label: "Get Involved", to: "/get-involved" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@pulsateproject.ca" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={14} /> info@pulsateproject.ca
              </a>
              <a href="tel:+15146194119" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone size={14} /> +1 514 619-4119
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>321 Blvd Saint-Martin O, Laval, QC</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">Get updates about Pulsate 2026.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-gold-light transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2026 Pulsate Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
