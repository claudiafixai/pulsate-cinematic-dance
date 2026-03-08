import { useState } from "react";
import { Video, Upload, Star, Film, Award, Mail, Users } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";
import { useLanguage } from "@/contexts/LanguageContext";

const Competition = () => {
  const [email, setEmail] = useState("");
  const { submit, loading } = useEmailSubmit();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    const success = await submit({ email, source: "competition-notify" });
    if (success) setEmail("");
  };

  const steps = [
    { icon: Mail, title: t("comp.step.register"), desc: t("comp.step.registerDesc") },
    { icon: Video, title: t("comp.step.create"), desc: t("comp.step.createDesc") },
    { icon: Upload, title: t("comp.step.submit"), desc: t("comp.step.submitDesc") },
    { icon: Star, title: t("comp.step.selection"), desc: t("comp.step.selectionDesc") },
    { icon: Film, title: t("comp.step.premiere"), desc: t("comp.step.premiereDesc") },
  ];

  const groupCategories = [
    t("comp.categories.solo"), t("comp.categories.duoTrio"), t("comp.categories.smallGroup"), t("comp.categories.largeGroup"), t("comp.categories.openCategory")
  ];
  const ageCategories = [t("comp.categories.kids"), t("comp.categories.teens"), t("comp.categories.adults"), t("comp.categories.seniors")];
  const levelCategories = [t("comp.categories.beginner"), t("comp.categories.intermediate"), t("comp.categories.advanced"), t("comp.categories.professional")];

  const criteria = [
    { name: t("comp.judging.storytelling"), weight: "30%" },
    { name: t("comp.judging.cinematic"), weight: "25%" },
    { name: t("comp.judging.creativity"), weight: "25%" },
    { name: t("comp.judging.technical"), weight: "20%" },
  ];

  return (
    <main>
      <PageHero
        image={heroImg}
        tag={t("comp.hero.tag")}
        title={t("comp.hero.title")}
        description={t("comp.hero.description")}
      >
        <div className="flex flex-wrap gap-4">
          <a href="#how-it-works" className="btn-primary px-8 py-3.5 rounded-full text-sm">{t("comp.hero.howItWorks")}</a>
          <a href="#register" className="btn-outline px-8 py-3.5 rounded-full text-sm">{t("comp.hero.readyToRegister")}</a>
        </div>
      </PageHero>

      <Section id="how-it-works">
        <SectionHeading tag={t("comp.howItWorks.tag")} title={t("comp.howItWorks.title")} center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} className="p-6 rounded-2xl bg-card border border-border text-center card-glow hover:-translate-y-2 transition-all duration-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><s.icon className="text-primary" size={24} /></div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag={t("comp.categories.tag")} title={t("comp.categories.title")} center />
        <div className="max-w-3xl mx-auto mb-10">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">{t("comp.categories.byGroup")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {groupCategories.map((c, i) => (
              <motion.div key={c} className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:border-primary/30 transition-all duration-300" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>{c}</motion.div>
            ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto mb-10">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">{t("comp.categories.byAge")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {ageCategories.map((c, i) => (
              <motion.div key={c} className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:border-primary/30 transition-all duration-300" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>{c}</motion.div>
            ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">{t("comp.categories.byLevel")}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {levelCategories.map((c, i) => (
              <motion.div key={c} className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:border-primary/30 transition-all duration-300" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>{c}</motion.div>
            ))}
          </div>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">{t("comp.categories.allStyles")}</p>
      </Section>

      <Section>
        <SectionHeading tag={t("comp.judging.tag")} title={t("comp.judging.title")} center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {criteria.map((c, i) => (
            <motion.div key={c.name} className="p-6 rounded-2xl bg-card border border-border text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="text-3xl font-bold font-serif gold-gradient-text mb-2">{c.weight}</div>
              <h4 className="font-semibold text-sm">{c.name}</h4>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt" id="register">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading tag={t("comp.notify.tag")} title={t("comp.notify.title")} center />
          <div className="flex gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("comp.notify.placeholder")} className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
            <button onClick={handleSubmit} disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm disabled:opacity-50">{loading ? t("common.loading") : t("comp.notify.button")}</button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Competition;
