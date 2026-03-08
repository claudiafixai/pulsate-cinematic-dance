import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdminDetailPanel from "@/components/admin/AdminDetailPanel";
import StatusEmailDialog from "@/components/admin/StatusEmailDialog";

const roleOptions = ["Judge", "Workshop Artist", "Both"];
const statusOptions = ["Invited", "Confirmed", "Declined"];

const AdminJudges = () => {
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<any>(null);
  const [emailDialog, setEmailDialog] = useState<{ open: boolean; judge: any; newStatus: string }>({ open: false, judge: null, newStatus: "" });
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: judges = [] } = useQuery({
    queryKey: ["admin-judges", filterRole, filterStatus],
    queryFn: async () => {
      let q = supabase.from("judges").select("*").order("created_at", { ascending: false });
      if (filterRole !== "all") q = q.eq("role", filterRole);
      if (filterStatus !== "all") q = q.eq("status", filterStatus);
      const { data } = await q;
      return data ?? [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { id, ...rest } = updates;
      const { error } = await supabase.from("judges").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-judges"] });
      qc.invalidateQueries({ queryKey: ["admin-judge-count"] });
      toast({ title: "Judge updated" });
    },
  });

  const handleSave = (data: any) => {
    const oldStatus = selected?.status;
    if (data.status !== oldStatus) {
      setEmailDialog({ open: true, judge: data, newStatus: data.status });
    } else {
      updateMutation.mutate(data);
      setSelected(null);
    }
  };

  const STATUS_SOURCE_MAP: Record<string, string> = {
    "Invited": "judge-invitation",
    "Confirmed": "judge-confirmed",
  };

  const handleEmailConfirm = async (sendEmail: boolean) => {
    const { judge, newStatus } = emailDialog;
    updateMutation.mutate(judge);
    if (sendEmail) {
      const emailSource = STATUS_SOURCE_MAP[newStatus] || "status-update";
      try {
        await supabase.functions.invoke("send-email", {
          body: { email: judge.email, source: emailSource, name: judge.name },
        });
      } catch {
        // Edge function handles logging
      }
    }
    setEmailDialog({ open: false, judge: null, newStatus: "" });
    setSelected(null);
  };

  const fields = [
    { key: "name", label: "Name", type: "text" as const },
    { key: "email", label: "Email", type: "text" as const },
    { key: "bio", label: "Bio", type: "textarea" as const },
    { key: "specialty", label: "Specialty", type: "text" as const },
    { key: "role", label: "Role", type: "select" as const, options: roleOptions },
    { key: "status", label: "Status", type: "select" as const, options: statusOptions },
    { key: "contract_signed", label: "Contract Signed", type: "checkbox" as const },
    { key: "internal_notes", label: "Notes", type: "textarea" as const },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-foreground">Judges</h1>
      <div className="flex flex-wrap gap-3">
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[150px] bg-secondary border-border text-sm"><SelectValue placeholder="Role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {roleOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px] bg-secondary border-border text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="glass-card rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contract</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {judges.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No judges found</TableCell></TableRow>
            ) : judges.map((j) => (
              <TableRow key={j.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => setSelected(j)}>
                <TableCell className="font-medium">{j.name}</TableCell>
                <TableCell className="text-xs">{j.email}</TableCell>
                <TableCell><Badge variant="secondary">{j.role ?? "—"}</Badge></TableCell>
                <TableCell><Badge className={j.status === "Confirmed" ? "bg-green-600/20 text-green-400" : j.status === "Declined" ? "bg-destructive/20 text-destructive" : "bg-yellow-600/20 text-yellow-400"}>{j.status}</Badge></TableCell>
                <TableCell>{j.contract_signed ? "✓" : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selected && <AdminDetailPanel title="Judge Details" fields={fields} data={selected} onSave={handleSave} onClose={() => setSelected(null)} />}
      <StatusEmailDialog open={emailDialog.open} recipientName={emailDialog.judge?.name} newStatus={emailDialog.newStatus} onConfirm={handleEmailConfirm} />
    </div>
  );
};

export default AdminJudges;
