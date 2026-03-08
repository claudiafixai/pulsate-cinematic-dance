import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Upload, Check, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import heroImg from "@/assets/hero-dance.jpg";

const AGE_GROUPS = ["Youth", "Teen", "Adult", "Senior"] as const;
const AGE_MAP: Record<string, string> = { Youth: "Kids", Teen: "Teens", Adult: "Adults", Senior: "Seniors" };
const LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"] as const;
const GROUP_TYPES_MAP: Record<string, string> = { Solo: "Solo", "Duo/Trio": "Duo", "Small Group (4–9)": "Group", "Large Group (10+)": "Group" };

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/quicktime", "video/mpeg"];
const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB

interface FormData {
  name: string;
  email: string;
  phone: string;
  ageGroup: string;
  guardianName: string;
  guardianEmail: string;
  guardianConsent: boolean;
  level: string;
  danceStyle: string;
  groupType: string;
  groupSize: string;
  groupName: string;
  videoFile: File | null;
  vipPass: boolean;
  waiverAgreed: boolean;
  privacyAgreed: boolean;
}

const initialForm: FormData = {
  name: "", email: "", phone: "", ageGroup: "",
  guardianName: "", guardianEmail: "", guardianConsent: false,
  level: "", danceStyle: "", groupType: "", groupSize: "", groupName: "",
  videoFile: null, vipPass: false, waiverAgreed: false, privacyAgreed: false,
};

const Register = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const TOTAL_STEPS = 4;

  const set = (key: keyof FormData, val: any) => {
    setForm(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: undefined }));
  };

  const needsGuardian = form.ageGroup === "Youth" || form.ageGroup === "Teen";
  const needsGroupDetails = form.groupType === "Duo/Trio" || form.groupType === "Small Group (4–9)" || form.groupType === "Large Group (10+)";

  const priceForAge = (ag: string) => {
    if (ag === "Youth") return "$179";
    if (ag === "Teen") return "$229";
    return "$269";
  };

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!form.name.trim()) e.name = t("reg.error.required");
      if (!form.email.trim() || !form.email.includes("@")) e.email = t("reg.error.invalidEmail");
      if (!form.phone.trim()) e.phone = t("reg.error.required");
      if (!form.ageGroup) e.ageGroup = t("reg.error.required");
      if (needsGuardian) {
        if (!form.guardianName.trim()) e.guardianName = t("reg.error.required");
        if (!form.guardianEmail.trim() || !form.guardianEmail.includes("@")) e.guardianEmail = t("reg.error.invalidEmail");
        if (!form.guardianConsent) e.guardianConsent = t("reg.error.required");
      }
    }
    if (s === 2) {
      if (!form.level) e.level = t("reg.error.required");
      if (!form.groupType) e.groupType = t("reg.error.required");
      if (needsGroupDetails && !form.groupSize) e.groupSize = t("reg.error.required");
      if (!form.videoFile) e.videoFile = t("reg.error.videoRequired");
    }
    if (s === 4) {
      if (!form.waiverAgreed) e.waiverAgreed = t("reg.error.required");
      if (!form.privacyAgreed) e.privacyAgreed = t("reg.error.required");
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => Math.min(s + 1, TOTAL_STEPS)); };
  const prev = () => setStep(s => Math.max(s - 1, 1));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_VIDEO_TYPES.includes(file.type)) {
      toast({ title: t("reg.error.videoFormat"), variant: "destructive" });
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      toast({ title: t("reg.error.videoSize"), variant: "destructive" });
      return;
    }
    set("videoFile", file);
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    try {
      // Upload video
      let videoUrl = "";
      if (form.videoFile) {
        setUploadProgress(10);
        const ext = form.videoFile.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        setUploadProgress(30);
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("dancer-videos")
          .upload(fileName, form.videoFile, { contentType: form.videoFile.type, upsert: false });
        if (uploadError) throw uploadError;
        setUploadProgress(70);
        const { data: urlData } = supabase.storage.from("dancer-videos").getPublicUrl(uploadData.path);
        videoUrl = urlData.publicUrl;
        setUploadProgress(90);
      }

      // Build internal notes for guardian info
      let internalNotes = "";
      if (needsGuardian) {
        internalNotes = JSON.stringify({
          guardian_name: form.guardianName,
          guardian_email: form.guardianEmail,
          guardian_consent: true,
        });
      }
      if (form.groupName.trim()) {
        const existing = internalNotes ? JSON.parse(internalNotes) : {};
        internalNotes = JSON.stringify({ ...existing, group_name: form.groupName.trim() });
      }

      // Insert dancer
      const { error: dbError } = await supabase.from("dancers").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        age_group: AGE_MAP[form.ageGroup] || form.ageGroup,
        level: form.level,
        dance_style: form.danceStyle.trim() || null,
        group_type: GROUP_TYPES_MAP[form.groupType] || "Solo",
        group_size: needsGroupDetails && form.groupSize ? parseInt(form.groupSize) : null,
        video_url: videoUrl || null,
        status: "Submitted",
        payment_status: "Unpaid",
        language,
        workshop_pass: true,
        vip_pass: form.vipPass,
        waiver_signed: true,
        internal_notes: internalNotes || null,
      });
      if (dbError) throw dbError;
      setUploadProgress(95);

      // Send confirmation email
      await supabase.functions.invoke("send-email", {
        body: { email: form.email.trim(), source: "dancer-submission-received", name: form.name.trim() },
      });
      setUploadProgress(100);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({ title: t("reg.error.generic"), description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <PageHero image={heroImg} tag={t("reg.hero.tag")} title={t("reg.hero.title")} />
        <Section>
          <motion.div className="max-w-xl mx-auto text-center py-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="text-primary" size={36} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-4">{t("reg.success.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("reg.success.body")}</p>
          </motion.div>
        </Section>
      </main>
    );
  }

  const inputCls = "w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-[15px]";
  const selectCls = inputCls;
  const labelCls = "block text-sm font-medium mb-1.5";
  const errorCls = "text-xs text-red-400 mt-1 flex items-center gap-1";

  const FieldError = ({ field }: { field: keyof FormData }) =>
    errors[field] ? <p className={errorCls}><AlertCircle size={12} />{errors[field]}</p> : null;

  return (
    <main>
      <PageHero image={heroImg} tag={t("reg.hero.tag")} title={t("reg.hero.title")} description={t("reg.hero.desc")} />

      <Section>
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  i + 1 <= step ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"
                }`}>
                  {i + 1 < step ? <Check size={16} /> : i + 1}
                </div>
                {i < TOTAL_STEPS - 1 && <div className={`w-8 sm:w-12 h-px transition-colors duration-300 ${i + 1 < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mb-8">
            {t("reg.stepOf").replace("{current}", String(step)).replace("{total}", String(TOTAL_STEPS))}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Step 1 */}
              {step === 1 && (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif">{t("reg.step1.title")}</h2>
                  <div>
                    <label className={labelCls}>{t("reg.step1.name")} *</label>
                    <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder={t("reg.step1.namePlaceholder")} />
                    <FieldError field="name" />
                  </div>
                  <div>
                    <label className={labelCls}>{t("reg.step1.email")} *</label>
                    <input type="email" className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder={t("reg.step1.emailPlaceholder")} />
                    <FieldError field="email" />
                  </div>
                  <div>
                    <label className={labelCls}>{t("reg.step1.phone")} *</label>
                    <input type="tel" className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder={t("reg.step1.phonePlaceholder")} />
                    <FieldError field="phone" />
                  </div>
                  <div>
                    <label className={labelCls}>{t("reg.step1.ageGroup")} *</label>
                    <select className={selectCls} value={form.ageGroup} onChange={e => set("ageGroup", e.target.value)}>
                      <option value="">{t("reg.step1.selectAgeGroup")}</option>
                      {AGE_GROUPS.map(ag => (
                        <option key={ag} value={ag}>{t(`reg.step1.age.${ag.toLowerCase()}`)} — {priceForAge(ag)}</option>
                      ))}
                    </select>
                    <FieldError field="ageGroup" />
                  </div>

                  {needsGuardian && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 p-5 rounded-xl bg-card border border-primary/20">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-primary">{t("reg.step1.guardian.title")}</h3>
                      <div>
                        <label className={labelCls}>{t("reg.step1.guardian.name")} *</label>
                        <input className={inputCls} value={form.guardianName} onChange={e => set("guardianName", e.target.value)} />
                        <FieldError field="guardianName" />
                      </div>
                      <div>
                        <label className={labelCls}>{t("reg.step1.guardian.email")} *</label>
                        <input type="email" className={inputCls} value={form.guardianEmail} onChange={e => set("guardianEmail", e.target.value)} />
                        <FieldError field="guardianEmail" />
                      </div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" checked={form.guardianConsent} onChange={e => set("guardianConsent", e.target.checked)} className="mt-1 accent-primary w-5 h-5" />
                        <span className="text-sm text-muted-foreground leading-relaxed">{t("reg.step1.guardian.consent")}</span>
                      </label>
                      <FieldError field="guardianConsent" />
                    </motion.div>
                  )}
                </>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif">{t("reg.step2.title")}</h2>
                  <div>
                    <label className={labelCls}>{t("reg.step2.level")} *</label>
                    <select className={selectCls} value={form.level} onChange={e => set("level", e.target.value)}>
                      <option value="">{t("reg.step2.selectLevel")}</option>
                      {LEVELS.map(l => <option key={l} value={l}>{t(`reg.step2.level.${l.toLowerCase()}`)}</option>)}
                    </select>
                    <FieldError field="level" />
                  </div>
                  <div>
                    <label className={labelCls}>{t("reg.step2.danceStyle")}</label>
                    <input className={inputCls} value={form.danceStyle} onChange={e => set("danceStyle", e.target.value)} placeholder={t("reg.step2.danceStylePlaceholder")} />
                  </div>
                  <div>
                    <label className={labelCls}>{t("reg.step2.groupType")} *</label>
                    <select className={selectCls} value={form.groupType} onChange={e => set("groupType", e.target.value)}>
                      <option value="">{t("reg.step2.selectGroupType")}</option>
                      {["Solo", "Duo/Trio", "Small Group (4–9)", "Large Group (10+)"].map(g => (
                        <option key={g} value={g}>{t(`reg.step2.group.${g.toLowerCase().replace(/[\s/(–)+]/g, "")}`)}</option>
                      ))}
                    </select>
                    <FieldError field="groupType" />
                  </div>

                  {needsGroupDetails && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
                      <div>
                        <label className={labelCls}>{t("reg.step2.groupSize")} *</label>
                        <input type="number" min="2" className={inputCls} value={form.groupSize} onChange={e => set("groupSize", e.target.value)} />
                        <FieldError field="groupSize" />
                      </div>
                      <div>
                        <label className={labelCls}>{t("reg.step2.groupName")}</label>
                        <input className={inputCls} value={form.groupName} onChange={e => set("groupName", e.target.value)} placeholder={t("reg.step2.groupNamePlaceholder")} />
                      </div>
                    </motion.div>
                  )}

                  <div className="p-4 rounded-xl bg-card border border-border text-sm text-muted-foreground leading-relaxed">
                    {t("reg.step2.soloNote")}
                  </div>

                  {/* Video upload */}
                  <div>
                    <label className={labelCls}>{t("reg.step2.video")} *</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
                    >
                      {form.videoFile ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <Check size={20} />
                          <span className="text-sm font-medium">{form.videoFile.name}</span>
                          <span className="text-xs text-muted-foreground">({(form.videoFile.size / (1024 * 1024)).toFixed(0)} MB)</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto mb-2 text-muted-foreground" size={28} />
                          <p className="text-sm text-muted-foreground">{t("reg.step2.videoUploadText")}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t("reg.step2.videoFormats")}</p>
                        </>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept=".mp4,.mov,.mpeg" className="hidden" onChange={handleFileChange} />
                    <FieldError field="videoFile" />
                  </div>
                </>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif">{t("reg.step3.title")}</h2>
                  <div className="p-6 rounded-xl bg-card border border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-medium">{t("reg.step3.dancerPass")}</span>
                      <span className="text-xl font-bold gold-gradient-text">{form.ageGroup ? priceForAge(form.ageGroup) : "—"}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t("reg.step3.basedOnAge")}: {form.ageGroup ? t(`reg.step1.age.${form.ageGroup.toLowerCase()}`) : "—"}</p>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                    <input type="checkbox" checked={form.vipPass} onChange={e => set("vipPass", e.target.checked)} className="mt-1 accent-primary w-5 h-5" />
                    <div>
                      <span className="font-medium">{t("reg.step3.vip")}</span>
                      <p className="text-sm text-muted-foreground mt-1">{t("reg.step3.vipPrice")}</p>
                    </div>
                  </label>

                  <div className="flex items-center gap-3 p-5 rounded-xl bg-primary/5 border border-primary/20">
                    <Check className="text-primary shrink-0" size={20} />
                    <span className="text-sm">{t("reg.step3.workshopIncluded")}</span>
                  </div>
                </>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif">{t("reg.step4.title")}</h2>
                  <div className="p-5 rounded-xl bg-card border border-border text-sm text-muted-foreground leading-relaxed">
                    {t("reg.step4.waiverText")}
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.waiverAgreed} onChange={e => set("waiverAgreed", e.target.checked)} className="mt-1 accent-primary w-5 h-5" />
                    <span className="text-sm">{t("reg.step4.waiverAgree")}</span>
                  </label>
                  <FieldError field="waiverAgreed" />

                  <div className="p-5 rounded-xl bg-card border border-border text-sm text-muted-foreground leading-relaxed">
                    {t("reg.step4.privacyText")}
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={form.privacyAgreed} onChange={e => set("privacyAgreed", e.target.checked)} className="mt-1 accent-primary w-5 h-5" />
                    <span className="text-sm">{t("reg.step4.privacyAgree")}</span>
                  </label>
                  <FieldError field="privacyAgreed" />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center mt-10 gap-4">
            {step > 1 ? (
              <button onClick={prev} className="btn-outline px-6 py-3 rounded-full text-sm flex items-center gap-2 min-h-[44px]">
                <ChevronLeft size={16} />{t("reg.nav.back")}
              </button>
            ) : <div />}

            {step < TOTAL_STEPS ? (
              <button onClick={next} className="btn-primary px-8 py-3 rounded-full text-sm flex items-center gap-2 min-h-[44px] ml-auto">
                {t("reg.nav.next")}<ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="btn-primary px-8 py-3 rounded-full text-sm flex items-center gap-2 min-h-[44px] ml-auto disabled:opacity-50">
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" />{t("reg.nav.submitting")} {uploadProgress > 0 && `${uploadProgress}%`}</>
                ) : (
                  t("reg.nav.submit")
                )}
              </button>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Register;
