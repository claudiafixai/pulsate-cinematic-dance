import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdminDetailPanel from "@/components/admin/AdminDetailPanel";
import StatusEmailDialog from "@/components/admin/StatusEmailDialog";

const statusOptions = ["Submitted", "Under Review", "Selected", "Not Selected"];
const ageOptions = ["Kids", "Teens", "Adults", "Seniors"];
const levelOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];

const AdminDancers = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterAge, setFilterAge] = useState<string>("all");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [selected, setSelected] = useState<any>(null);
  const [emailDialog, setEmailDialog] = useState<{ open: boolean; dancer: any; newStatus: string }>({ open: false, dancer: null, newStatus: "" });
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: dancers = [] } = useQuery({
    queryKey: ["admin-dancers", filterStatus, filterAge, filterLevel],
    queryFn: async () => {
      let q = supabase.from("dancers").select("*").order("created_at", { ascending: false });
      if (filterStatus !== "all") q = q.eq("status", filterStatus);
      if (filterAge !== "all") q = q.eq("age_group", filterAge);
      if (filterLevel !== "all") q = q.eq("level", filterLevel);
      const { data } = await q;
      return data ?? [];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { id, ...rest } = updates;
      const { error } = await supabase.from("dancers").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-dancers"] });
      qc.invalidateQueries({ queryKey: ["admin-dancer-count"] });
      toast({ title: "Dancer updated" });
    },
  });

  const handleSave = (data: any) => {
    const oldStatus = selected?.status;
    if (data.status !== oldStatus) {
      setEmailDialog({ open: true, dancer: data, newStatus: data.status });
    } else {
      updateMutation.mutate(data);
      setSelected(null);
    }
  };

  const STATUS_SOURCE_MAP: Record<string, string> = {
    "Submitted": "dancer-submission-received",
    "Under Review": "dancer-under-review",
    "Selected": "dancer-selected",
    "Not Selected": "dancer-not-selected",
  };

  const handleEmailConfirm = async (sendEmail: boolean) => {
    const { dancer, newStatus } = emailDialog;
    updateMutation.mutate(dancer);
    if (sendEmail) {
      const emailSource = STATUS_SOURCE_MAP[newStatus] || "status-update";
      try {
        await supabase.functions.invoke("send-email", {
          body: { email: dancer.email, source: emailSource, name: dancer.name },
        });
      } catch {
        // Edge function handles logging
      }
    }
    setEmailDialog({ open: false, dancer: null, newStatus: "" });
    setSelected(null);
  };

  const fields = [
    { key: "name", label: "Name", type: "text" as const },
    { key: "email", label: "Email", type: "text" as const },
    { key: "phone", label: "Phone", type: "text" as const },
    { key: "age_group", label: "Age Group", type: "select" as const, options: ageOptions },
    { key: "level", label: "Level", type: "select" as const, options: levelOptions },
    { key: "group_type", label: "Group Type", type: "select" as const, options: ["Solo", "Duo", "Group"] },
    { key: "group_size", label: "Group Size", type: "number" as const },
    { key: "dance_style", label: "Dance Style", type: "text" as const },
    { key: "video_url", label: "Video URL", type: "text" as const },
    { key: "status", label: "Status", type: "select" as const, options: statusOptions },
    { key: "payment_status", label: "Payment", type: "select" as const, options: ["Unpaid", "Paid"] },
    { key: "waiver_signed", label: "Waiver Signed", type: "checkbox" as const },
    { key: "workshop_pass", label: "Workshop Pass", type: "checkbox" as const },
    { key: "vip_pass", label: "VIP Pass", type: "checkbox" as const },
    { key: "language", label: "Language", type: "select" as const, options: ["fr", "en"] },
    { key: "internal_notes", label: "Notes", type: "textarea" as const },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-foreground">Dancers</h1>

      <div className="flex flex-wrap gap-3">
        <FilterSelect label="Status" value={filterStatus} onChange={setFilterStatus} options={statusOptions} />
        <FilterSelect label="Age" value={filterAge} onChange={setFilterAge} options={ageOptions} />
        <FilterSelect label="Level" value={filterLevel} onChange={setFilterLevel} options={levelOptions} />
      </div>

      <div className="glass-card rounded-xl border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dancers.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No dancers found</TableCell></TableRow>
            ) : dancers.map((d) => (
              <TableRow key={d.id} className="cursor-pointer hover:bg-secondary/50" onClick={() => setSelected(d)}>
                <TableCell className="font-medium">{d.name}</TableCell>
                <TableCell className="text-xs">{d.email}</TableCell>
                <TableCell><Badge variant="secondary">{d.age_group ?? "—"}</Badge></TableCell>
                <TableCell className="text-xs">{d.level ?? "—"}</TableCell>
                <TableCell><StatusBadge status={d.status} /></TableCell>
                <TableCell><Badge className={d.payment_status === "Paid" ? "bg-green-600/20 text-green-400" : "bg-muted text-muted-foreground"}>{d.payment_status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selected && (
        <AdminDetailPanel title="Dancer Details" fields={fields} data={selected} onSave={handleSave} onClose={() => setSelected(null)} />
      )}

      <StatusEmailDialog
        open={emailDialog.open}
        recipientName={emailDialog.dancer?.name}
        newStatus={emailDialog.newStatus}
        onConfirm={handleEmailConfirm}
      />
    </div>
  );
};

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px] bg-secondary border-border text-sm">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {label}</SelectItem>
        {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

function StatusBadge({ status }: { status: string | null }) {
  const colors: Record<string, string> = {
    "Submitted": "bg-blue-600/20 text-blue-400",
    "Under Review": "bg-yellow-600/20 text-yellow-400",
    "Selected": "bg-green-600/20 text-green-400",
    "Not Selected": "bg-destructive/20 text-destructive",
  };
  return <Badge className={colors[status ?? ""] ?? "bg-muted text-muted-foreground"}>{status ?? "—"}</Badge>;
}

export default AdminDancers;
