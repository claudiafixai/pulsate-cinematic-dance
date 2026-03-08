import { useState } from "react";
import { Clock, MapPin, Monitor, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import workshopImg from "@/assets/workshop-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";
import { useLanguage } from "@/contexts/LanguageContext";

const Workshops = () => {
  const [email, setEmail] = useState("");
  const { submit, loading } = useEmailSubmit();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    const success = await submit({ email, source: "workshop-notify" });
    if (success) setEmail("");
  };

  const timeline = [
    { time: "3:00 – 3:55 PM", title: t("workshops.schedule.block1"), desc: t("workshops.schedule.block1Desc") },
    { time: "4:05 – 5:00 PM", title: t("workshops.schedule.block2"), desc: t("workshops.schedule.block2Desc") },
    { time: "5:10 – 6:05 PM", title: t("workshops.schedule.block3"), desc: t("workshops.schedule.block3Desc") },
    { time: "6:15 – 7:10 PM", title: t("workshops.schedule.block4"), desc: t("workshops.schedule.block4Desc") },
    { time: "7:20 – 8:00 PM", title: t("workshops.schedule.block5"), desc: t("workshops.schedule.block5Desc") },
  ];

  const highlights = [
    { icon: Calendar, text: t("workshops.details.date") },
    { icon: MapPin, text: t("workshops.details.location") },
    { icon: Monitor, text: t("workshops.details.online") },
    { icon: Clock, text: t("workshops.details.format") },
  ];

  return (
    <main>
      <PageHero
        image={workshopImg}
        tag={t("workshops.hero.tag")}
        title={t("workshops.hero.title")}
        description={t("workshops.hero.description")}
      >
        <div className="flex flex-wrap gap-4">
          <a href="#pricing" className="btn-primary px-8 py-3.5 rounded-full text-sm">{t("workshops.hero.fullDay")}</a>
          <a href="#pricing" className="btn-outline px-8 py-3.5 rounded-full text-sm">{t("workshops.hero.dropIn")}</a>
        </div>
      </PageHero>

      <Section>
        <SectionHeading tag={t("workshops.details.tag")} title={t("workshops.details.title")} />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {highlights.map((h, i) => (
            <motion.div key={i} className="flex items-center gap-4 p-5 rounded-2xl glass-card" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><h.icon className="text-primary" size={18} /></div>
              <span className="text-sm">{h.text}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag={t("workshops.schedule.tag")} title={t("workshops.schedule.title")} center />
        <div className="max-w-2xl mx-auto space-y-3">
          {timeline.map((item, i) => (
            <motion.div key={i} className="flex items-center gap-6 p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div className="text-primary font-mono text-sm font-semibold whitespace-nowrap w-36 shrink-0">{item.time}</div>
              <div className="divider-gold w-8 shrink-0 hidden sm:block" />
              <div>
                <h4 className="font-bold">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">{t("workshops.schedule.artistsNote")}</p>
      </Section>

      <Section id="pricing">
        <SectionHeading tag={t("workshops.pricing.tag")} title={t("workshops.pricing.title")} center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div className="p-8 rounded-2xl bg-card border-2 border-primary text-center card-glow animate-pulse-glow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-bold font-serif gold-gradient-text">$80</h3>
            <p className="font-semibold mt-2">{t("workshops.pricing.fullDay")}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("workshops.pricing.fullDayDesc")}</p>
            <div className="mt-6 text-xs text-primary font-medium uppercase tracking-[0.2em]">{t("workshops.pricing.bestValue")}</div>
          </motion.div>
          <motion.div className="p-8 rounded-2xl bg-card border border-border text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-3xl font-bold font-serif gold-gradient-text">$25</h3>
            <p className="font-semibold mt-2">{t("workshops.pricing.dropIn")}</p>
            <p className="text-sm text-muted-foreground mt-2">{t("workshops.pricing.dropInDesc")}</p>
          </motion.div>
        </div>
      </Section>

      <Section variant="alt">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading tag={t("workshops.notify.tag")} title={t("workshops.notify.title")} center />
          <div className="flex gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("workshops.notify.placeholder")} className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
            <button onClick={handleSubmit} disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm disabled:opacity-50">{loading ? t("common.loading") : t("workshops.notify.button")}</button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Workshops;
