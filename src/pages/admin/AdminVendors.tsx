import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdminDetailPanel from "@/components/admin/AdminDetailPanel";

const typeOptions = ["Production Sponsor", "Creative Collaborator", "Community Partner"];
const statusOptions = ["Prospect", "Proposal Sent", "Confirmed", "Invoiced", "Paid"];

const AdminVendors = () => {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<any>(null);
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: vendors = [] } = useQuery({
    queryKey: ["admin-vendors", filterType, filterStatus],
    queryFn: async () => {
      let q = supabase.from("vendors").select("*").order("created_at", { ascending: false });
      if (filterType !== "all") q = q.eq("type", filterType);
      if (filterStatus !== "all") q = q.eq("status", filterStatus);
      const { data } = await q;
      return data ?? [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { id, ...rest } = updates;
      const { error } = await supabase.from("vendors").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-vendors"] });
      qc.invalidateQueries({ queryKey: ["admin-vendor-count"] });
      toast({ title: "Vendor updated" });
    },
  });

  const handleSave = (data: any) => {
    updateMutation.mutate(data);
    setSelected(null);
  };

  const fields = [
    { key: "organization", label: "Organization", type: "text" as const },
    { key: "contact_name", label: "Contact Name", type: "text" as const },
    { key: "email", label: "Email", type: "text" as const },
    { key: "type", label: "Type", type: "select" as const, options: typeOptions },
    { key: "package", label: "Package", type: "select" as const, options: ["Community", "Gold", "Custom"] },
    { key: "status", label: "Status", type: "select" as const, options: statusOptions },
    { key: "contract_signed", label: "Contract Signed", type: "checkbox" as const },
    { key: "internal_notes", label: "Notes", type: "textarea" as const },
  ];

  const statusColor = (s: string | null) => {
    if (s === "Confirmed" || s === "Paid") return "bg-green-600/20 text-green-400";
    if (s === "Prospect") return "bg-muted text-muted-foreground";
    return "bg-yellow-600/20 text-yellow-400";
  };

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-foreground">Vendors</h1>
      <div className="flex flex-wrap gap-3">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px] bg-secondary border-border text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {typeOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
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
              <TableHead>Organization</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contract</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No vendors found</TableCell></TableRow>
            ) : vendors.map((v) => (
              <TableRow key={v.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => setSelected(v)}>
                <TableCell className="font-medium">{v.organization}</TableCell>
                <TableCell className="text-xs">{v.contact_name}</TableCell>
                <TableCell><Badge variant="secondary">{v.type ?? "—"}</Badge></TableCell>
                <TableCell><Badge className={statusColor(v.status)}>{v.status}</Badge></TableCell>
                <TableCell>{v.contract_signed ? "✓" : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selected && <AdminDetailPanel title="Vendor Details" fields={fields} data={selected} onSave={handleSave} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default AdminVendors;
