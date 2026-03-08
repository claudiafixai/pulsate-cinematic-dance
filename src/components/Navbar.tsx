import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/pulsate-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.competition"), to: "/competition" },
    { label: t("nav.workshops"), to: "/workshops" },
    { label: t("nav.premiere"), to: "/premiere" },
    { label: t("nav.getInvolved"), to: "/get-involved" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Pulsate" className="h-14 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary relative ${
                  location.pathname === link.to ? "text-primary" : "text-foreground/70"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 text-xs font-medium">
              <button
                onClick={() => setLanguage("fr")}
                className={`px-2 py-1 rounded transition-all duration-300 ${
                  language === "fr"
                    ? "text-primary border-b border-primary"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                FR
              </button>
              <span className="text-foreground/20">|</span>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded transition-all duration-300 ${
                  language === "en"
                    ? "text-primary border-b border-primary"
                    : "text-foreground/40 hover:text-foreground/70"
                }`}
              >
                EN
              </button>
            </div>

            <Link
              to="/get-involved"
              className="btn-primary px-6 py-2.5 text-sm rounded-full"
            >
              {t("nav.getTickets")}
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block text-base font-medium transition-colors hover:text-primary min-h-[44px] flex items-center ${
                      location.pathname === link.to ? "text-primary" : "text-foreground/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile language toggle */}
              <div className="flex items-center gap-2 pt-3 pb-2">
                <button
                  onClick={() => setLanguage("fr")}
                  className={`text-sm font-medium min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-full transition-all flex items-center justify-center ${
                    language === "fr"
                      ? "text-primary border border-primary/30"
                      : "text-foreground/40"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`text-sm font-medium min-w-[44px] min-h-[44px] px-3 py-1.5 rounded-full transition-all flex items-center justify-center ${
                    language === "en"
                      ? "text-primary border border-primary/30"
                      : "text-foreground/40"
                  }`}
                >
                  EN
                </button>
              </div>

              <Link
                to="/get-involved"
                onClick={() => setOpen(false)}
                className="btn-primary px-6 py-3 text-sm rounded-full min-h-[44px] flex items-center justify-center"
              >
                {t("nav.getTickets")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
