import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type FieldDef = {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  options?: string[];
};

interface Props {
  title: string;
  fields: FieldDef[];
  data: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  onClose: () => void;
}

const AdminDetailPanel = ({ title, fields, data, onSave, onClose }: Props) => {
  const [form, setForm] = useState({ ...data });

  const set = (key: string, value: any) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <>
      <div className="fixed inset-0 z-40 bg-background/60" onClick={onClose} />
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="font-serif text-lg text-foreground">{title}</h2>
          <button onClick={onClose}><X size={20} className="text-muted-foreground" /></button>
        </div>
        <div className="p-5 space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">{f.label}</Label>
              {f.type === "text" && (
                <Input value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} className="bg-secondary border-border" />
              )}
              {f.type === "number" && (
                <Input type="number" value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value ? Number(e.target.value) : null)} className="bg-secondary border-border" />
              )}
              {f.type === "textarea" && (
                <Textarea value={form[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} rows={3} className="bg-secondary border-border" />
              )}
              {f.type === "select" && f.options && (
                <Select value={form[f.key] ?? ""} onValueChange={(v) => set(f.key, v)}>
                  <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {f.options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                  </SelectContent>
                </Select>
              )}
              {f.type === "checkbox" && (
                <Switch checked={!!form[f.key]} onCheckedChange={(v) => set(f.key, v)} />
              )}
            </div>
          ))}
          <Button onClick={() => onSave(form)} className="w-full btn-primary rounded-full mt-6">Save Changes</Button>
        </div>
      </div>
    </>
  );
};

export default AdminDetailPanel;
