import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Users, Gavel, Building2, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const statuses = ["Submitted", "Under Review", "Selected", "Not Selected"] as const;

const AdminDashboard = () => {
  const { data: dancerCount = 0 } = useQuery({
    queryKey: ["admin-dancer-count"],
    queryFn: async () => {
      const { count } = await supabase.from("dancers").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: judgeCount = 0 } = useQuery({
    queryKey: ["admin-judge-count"],
    queryFn: async () => {
      const { count } = await supabase.from("judges").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: vendorCount = 0 } = useQuery({
    queryKey: ["admin-vendor-count"],
    queryFn: async () => {
      const { count } = await supabase.from("vendors").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: emailCount = 0 } = useQuery({
    queryKey: ["admin-email-count"],
    queryFn: async () => {
      const { count } = await supabase.from("email_log").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: statusBreakdown = [] } = useQuery({
    queryKey: ["admin-status-breakdown"],
    queryFn: async () => {
      const { data } = await supabase.from("dancers").select("status");
      const counts: Record<string, number> = {};
      statuses.forEach((s) => (counts[s] = 0));
      data?.forEach((d) => { if (d.status) counts[d.status] = (counts[d.status] || 0) + 1; });
      return statuses.map((s) => ({ status: s, count: counts[s] }));
    },
  });

  const { data: recentEmails = [] } = useQuery({
    queryKey: ["admin-recent-emails"],
    queryFn: async () => {
      const { data } = await supabase.from("email_log").select("*").order("sent_at", { ascending: false }).limit(10);
      return data ?? [];
    },
  });

  const stats = [
    { label: "Total Dancers", value: dancerCount, icon: Users },
    { label: "Total Judges", value: judgeCount, icon: Gavel },
    { label: "Total Vendors", value: vendorCount, icon: Building2 },
    { label: "Emails Sent", value: emailCount, icon: Mail },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-2xl text-foreground">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass-card border-border">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="p-3 rounded-xl bg-primary/10">
                <s.icon size={22} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Status breakdown */}
      <Card className="glass-card border-border">
        <CardHeader><CardTitle className="text-base">Dancer Status Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {statusBreakdown.map((s) => (
              <div key={s.status} className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">{s.status}</span>
                <span className="text-lg font-bold text-foreground">{s.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="glass-card border-border">
        <CardHeader><CardTitle className="text-base">Recent Email Activity</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEmails.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No emails sent yet</TableCell></TableRow>
              ) : recentEmails.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-xs">{e.sent_at ? new Date(e.sent_at).toLocaleDateString() : "—"}</TableCell>
                  <TableCell className="text-xs">{e.recipient_email}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{e.email_type}</Badge></TableCell>
                  <TableCell>
                    <Badge className={e.status === "sent" ? "bg-green-600/20 text-green-400 border-green-600/30" : "bg-destructive/20 text-destructive border-destructive/30"}>
                      {e.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
