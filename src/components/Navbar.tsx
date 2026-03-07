import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/pulsate-logo.png";

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Competition", to: "/competition" },
  { label: "Workshops & Seminars", to: "/workshops" },
  { label: "Premiere & Awards", to: "/premiere" },
  { label: "Get Involved", to: "/get-involved" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Pulsate" className="h-14 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              to="/get-involved"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors"
            >
              Get Tickets
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

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`block text-base font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/get-involved"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors"
            >
              Get Tickets
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
