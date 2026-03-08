import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin/login", { replace: true });
      } else {
        setReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login", { replace: true });
      else setReady(true);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!ready) return null;

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
