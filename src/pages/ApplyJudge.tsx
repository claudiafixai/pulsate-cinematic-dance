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

const ROLES = ["Judge", "Workshop Artist", "Both"] as const;
const BIO_MAX = 500;

const ApplyJudge = () => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    specialty: "",
    role: "",
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
    if (!form.name.trim()) e.name = t("judge.error.name");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t("judge.error.email");
    if (!form.bio.trim()) e.bio = t("judge.error.bio");
    if (form.bio.length > BIO_MAX) e.bio = t("judge.error.bioMax");
    if (!form.specialty.trim()) e.specialty = t("judge.error.specialty");
    if (!form.role) e.role = t("judge.error.role");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("judges").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        bio: form.bio.trim(),
        specialty: form.specialty.trim(),
        role: form.role,
        status: "Invited",
        contract_signed: false,
        language: form.language,
      });
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-email", {
          body: { email: form.email.trim(), source: "judge-invitation", name: form.name.trim() },
        });
      } catch {
        // email send is best-effort
      }

      setSubmitted(true);
    } catch {
      toast({ title: t("judge.error.generic"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md space-y-6"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-serif text-2xl text-foreground">{t("judge.success.title")}</h2>
          <p className="text-muted-foreground">{t("judge.success.message")}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero title={t("judge.hero.title")} subtitle={t("judge.hero.subtitle")} image={heroImg} />

      <Section className="max-w-lg mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("judge.field.name")} *</Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="bg-secondary border-border"
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("judge.field.email")} *</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="bg-secondary border-border"
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("judge.field.bio")} *</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
              rows={5}
              maxLength={BIO_MAX}
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.bio.length}/{BIO_MAX}
            </p>
            {errors.bio && <p className="text-xs text-destructive">{errors.bio}</p>}
          </div>

          {/* Specialty */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("judge.field.specialty")} *</Label>
            <Input
              value={form.specialty}
              onChange={(e) => set("specialty", e.target.value)}
              placeholder={t("judge.field.specialtyPlaceholder")}
              className="bg-secondary border-border"
            />
            {errors.specialty && <p className="text-xs text-destructive">{errors.specialty}</p>}
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("judge.field.role")} *</Label>
            <Select value={form.role} onValueChange={(v) => set("role", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder={t("judge.field.rolePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>{t(`judge.role.${r.toLowerCase().replace(" ", "")}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <Label className="text-sm text-muted-foreground">{t("judge.field.language")}</Label>
            <Select value={form.language} onValueChange={(v) => set("language", v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full btn-primary rounded-full mt-4"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {t("judge.submit")}
          </Button>
        </motion.div>
      </Section>
    </div>
  );
};

export default ApplyJudge;
