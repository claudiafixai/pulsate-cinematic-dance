import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/pulsate-logo.png";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { submit, loading } = useEmailSubmit();

  const handleSubmit = async () => {
    const success = await submit({ email, source: "footer-newsletter" });
    if (success) setEmail("");
  };

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/">
              <img src={logo} alt="Pulsate" className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A cinematic dance competition designed for the big screen. Where dance meets film and community.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">Explore</h4>
            <div className="space-y-2.5">
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
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@pulsateproject.ca" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                <Mail size={14} className="text-primary/60" /> info@pulsateproject.ca
              </a>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary/60" />
                <span>321 Blvd Saint-Martin O, Laval, QC</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">Get updates about Pulsate 2026.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <button onClick={handleSubmit} disabled={loading} className="btn-primary px-4 py-2.5 text-sm rounded-lg disabled:opacity-50">
                {loading ? "..." : "Join"}
              </button>
            </div>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-8" />

        <div className="text-center text-sm text-muted-foreground">
          © 2026 Pulsate Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
