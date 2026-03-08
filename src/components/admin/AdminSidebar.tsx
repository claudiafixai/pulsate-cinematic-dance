import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Gavel, Building2, Mail, LogOut, Menu, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import pulsateLogo from "@/assets/pulsate-logo.png";
import { cn } from "@/lib/utils";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/dancers", icon: Users, label: "Dancers" },
  { to: "/admin/judges", icon: Gavel, label: "Judges" },
  { to: "/admin/vendors", icon: Building2, label: "Vendors" },
  { to: "/admin/emails", icon: Mail, label: "Email Log" },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
      isActive ? "bg-primary/20 text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-secondary text-foreground"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay */}
      {open && <div className="fixed inset-0 z-30 bg-background/80 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:sticky top-0 left-0 z-40 h-screen w-60 flex flex-col border-r border-border bg-sidebar-background transition-transform md:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex justify-center border-b border-border">
          <img src={pulsateLogo} alt="Pulsate" className="h-8" />
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
              <l.icon size={18} />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
