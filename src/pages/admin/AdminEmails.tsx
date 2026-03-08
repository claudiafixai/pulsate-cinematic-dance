import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const recipientTypes = ["dancer", "judge", "vendor"];
const statusOptions = ["sent", "failed"];

const typeColors: Record<string, string> = {
  dancer: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  judge: "bg-purple-600/20 text-purple-400 border-purple-600/30",
  vendor: "bg-orange-600/20 text-orange-400 border-orange-600/30",
};

const AdminEmails = () => {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: emails = [] } = useQuery({
    queryKey: ["admin-emails", filterType, filterStatus],
    queryFn: async () => {
      let q = supabase.from("email_log").select("*").order("sent_at", { ascending: false });
      if (filterType !== "all") q = q.eq("recipient_type", filterType);
      if (filterStatus !== "all") q = q.eq("status", filterStatus);
      const { data } = await q;
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-foreground">Email Log</h1>
      <div className="flex flex-wrap gap-3">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px] bg-secondary border-border text-sm"><SelectValue placeholder="Recipient" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {recipientTypes.map((o) => <SelectItem key={o} value={o} className="capitalize">{o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[130px] bg-secondary border-border text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((o) => <SelectItem key={o} value={o} className="capitalize">{o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Email Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No emails logged yet</TableCell></TableRow>
            ) : emails.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="text-xs">{e.sent_at ? new Date(e.sent_at).toLocaleString() : "—"}</TableCell>
                <TableCell className="text-xs">{e.recipient_email}</TableCell>
                <TableCell>
                  <Badge className={typeColors[e.recipient_type ?? ""] ?? "bg-muted text-muted-foreground"}>
                    {e.recipient_type ?? "—"}
                  </Badge>
                </TableCell>
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
      </div>
    </div>
  );
};

export default AdminEmails;
