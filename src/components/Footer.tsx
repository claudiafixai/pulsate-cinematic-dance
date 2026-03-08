import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import logo from "@/assets/pulsate-logo.png";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { submit, loading } = useEmailSubmit();
  const { t } = useLanguage();

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
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">{t("footer.explore")}</h4>
            <div className="space-y-2.5">
              {[
                { label: t("nav.about"), to: "/about" },
                { label: t("nav.competition"), to: "/competition" },
                { label: t("nav.workshops"), to: "/workshops" },
                { label: t("nav.premiere"), to: "/premiere" },
                { label: t("nav.getInvolved"), to: "/get-involved" },
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
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">{t("footer.contact")}</h4>
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
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">{t("footer.stayConnected")}</h4>
            <p className="text-sm text-muted-foreground mb-4">{t("footer.stayConnectedDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:flex-1 px-3 py-2.5 text-sm bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all min-h-[44px]"
              />
              <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full sm:w-auto px-4 py-2.5 text-sm rounded-lg disabled:opacity-50 min-h-[44px]">
                {loading ? t("common.loading") : t("footer.join")}
              </button>
            </div>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-8" />

        <div className="text-center text-sm text-muted-foreground">
          {t("footer.copyright")}
        </div>
        <div className="text-center text-xs text-muted-foreground/60 mt-2">
          Site &amp; systems by{" "}
          <a href="https://claudiaops.ai/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            ClaudiaOps AI
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
