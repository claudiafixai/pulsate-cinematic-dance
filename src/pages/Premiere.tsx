import { useState } from "react";
import { Film, Award, Star, Camera, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import premiereImg from "@/assets/premiere-cinema.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";
import { useLanguage } from "@/contexts/LanguageContext";

const Premiere = () => {
  const [email, setEmail] = useState("");
  const { submit, loading } = useEmailSubmit();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    const success = await submit({ email, source: "premiere-notify" });
    if (success) setEmail("");
  };

  const filmDetails = [
    t("premiere.film.detail1"),
    t("premiere.film.detail2"),
    t("premiere.film.detail3"),
    t("premiere.film.detail4"),
  ];

  const awardCategories = [
    { icon: Star, title: t("premiere.awards.bestSolo"), desc: t("premiere.awards.bestSoloDesc") },
    { icon: Award, title: t("premiere.awards.bestGroup"), desc: t("premiere.awards.bestGroupDesc") },
    { icon: Film, title: t("premiere.awards.bestCinematic"), desc: t("premiere.awards.bestCinematicDesc") },
    { icon: Camera, title: t("premiere.awards.bestStorytelling"), desc: t("premiere.awards.bestStorytellingDesc") },
    { icon: Sparkles, title: t("premiere.awards.audienceChoice"), desc: t("premiere.awards.audienceChoiceDesc") },
    { icon: Star, title: t("premiere.awards.risingStar"), desc: t("premiere.awards.risingStarDesc") },
  ];

  return (
    <main>
      <PageHero
        image={premiereImg}
        tag={t("premiere.hero.tag")}
        title={t("premiere.hero.title")}
        description={t("premiere.hero.description")}
      >
        <div className="flex flex-wrap gap-4">
          <a href="#tickets" className="btn-primary px-8 py-3.5 rounded-full text-sm">{t("premiere.hero.ticketUpdates")}</a>
          <a href="#awards" className="btn-outline px-8 py-3.5 rounded-full text-sm">{t("premiere.hero.viewAwards")}</a>
        </div>
      </PageHero>

      <Section>
        <SectionHeading tag={t("premiere.film.tag")} title={t("premiere.film.title")} />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {filmDetails.map((d, i) => (
            <motion.div key={i} className="flex items-start gap-4 p-5 rounded-2xl glass-card" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-sm leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-8">{t("premiere.film.note")}</p>
      </Section>

      <Section variant="alt" id="awards">
        <SectionHeading tag={t("premiere.awards.tag")} title={t("premiere.awards.title")} center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardCategories.map((a, i) => (
            <motion.div key={a.title} className="p-6 rounded-2xl bg-card border border-border text-center card-glow hover:-translate-y-2 transition-all duration-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><a.icon className="text-primary" size={22} /></div>
              <h3 className="font-bold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="tickets">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading tag={t("premiere.tickets.tag")} title={t("premiere.tickets.title")} center />
          <div className="flex gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("premiere.tickets.placeholder")} className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
            <button onClick={handleSubmit} disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm disabled:opacity-50">{loading ? t("common.loading") : t("premiere.tickets.button")}</button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Premiere;
