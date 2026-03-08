import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroImg from "@/assets/hero-dance.jpg";

const TYPE_OPTIONS = [
  { value: "Production Sponsor", labelKey: "sponsor.type.production" },
  { value: "Creative Collaborator", labelKey: "sponsor.type.creative" },
  { value: "Community Partner", labelKey: "sponsor.type.community" },
] as const;

const PACKAGE_OPTIONS = [
  { value: "Community", labelKey: "sponsor.package.community" },
  { value: "Gold", labelKey: "sponsor.package.gold" },
  { value: "Custom", labelKey: "sponsor.package.custom" },
] as const;

const MSG_MAX = 300;

const Sponsor = () => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    organization: "",
    contactName: "",
    email: "",
    type: "",
    package: "",
    message: "",
    language: language === "fr" ? "fr" : "en",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: string, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.organization.trim()) e.organization = t("sponsor.error.organization");
    if (!form.contactName.trim()) e.contactName = t("sponsor.error.contactName");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("sponsor.error.email");
    if (!form.type) e.type = t("sponsor.error.type");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("vendors").insert({
        organization: form.organization.trim(),
        contact_name: form.contactName.trim(),
        email: form.email.trim(),
        type: form.type,
        package: form.package || null,
        status: "Prospect",
        contract_signed: false,
        language: form.language,
        internal_notes: form.message.trim() || null,
      });
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-email", {
          body: { email: form.email.trim(), source: "vendor-kit-sent", name: form.contactName.trim() },
        });
      } catch {
        // best-effort
      }

      setSubmitted(true);
    } catch {
      toast({ title: t("sponsor.error.generic"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-2xl text-foreground">{t("sponsor.success.title")}</h2>
          <p className="text-muted-foreground">{t("sponsor.success.message")}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero title={t("sponsor.hero.title")} description={t("sponsor.hero.subtitle")} image={heroImg} />

      <Section className="max-w-lg mx-auto py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Organization */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.organization")} *</Label>
            <Input value={form.organization} onChange={(e) => set("organization", e.target.value)} className="bg-secondary border-border" />
            {errors.organization && <p className="text-xs text-destructive">{errors.organization}</p>}
          </div>

          {/* Contact Name */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.contactName")} *</Label>
            <Input value={form.contactName} onChange={(e) => set("contactName", e.target.value)} className="bg-secondary border-border" />
            {errors.contactName && <p className="text-xs text-destructive">{errors.contactName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.email")} *</Label>
            <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="bg-secondary border-border" />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Type */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.type")} *</Label>
            <Select value={form.type} onValueChange={(v) => set("type", v)}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder={t("sponsor.field.typePlaceholder")} /></SelectTrigger>
              <SelectContent>
                {TYPE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{t(o.labelKey)}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
          </div>

          {/* Package */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.package")}</Label>
            <Select value={form.package} onValueChange={(v) => set("package", v)}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue placeholder={t("sponsor.field.packagePlaceholder")} /></SelectTrigger>
              <SelectContent>
                {PACKAGE_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{t(o.labelKey)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.message")}</Label>
            <Textarea value={form.message} onChange={(e) => set("message", e.target.value)} rows={4} maxLength={MSG_MAX} className="bg-secondary border-border" />
            <p className="text-xs text-muted-foreground text-right">{form.message.length}/{MSG_MAX}</p>
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("sponsor.field.language")}</Label>
            <Select value={form.language} onValueChange={(v) => set("language", v)}>
              <SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSubmit} disabled={submitting} className="w-full btn-primary rounded-full mt-4">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {t("sponsor.submit")}
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default Sponsor;
