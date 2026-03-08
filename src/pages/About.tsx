import { Link } from "react-router-dom";
import { Heart, Film, Users, Star, Sparkles } from "lucide-react";
import idaLogo from "@/assets/logo-ida.jpg";
import { motion } from "framer-motion";
import aboutImg from "@/assets/about-dance.jpg";
import heroImg from "@/assets/hero-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: Heart, title: t("about.values.empowerment"), desc: t("about.values.empowermentDesc") },
    { icon: Film, title: t("about.values.cinematic"), desc: t("about.values.cinematicDesc") },
    { icon: Users, title: t("about.values.community"), desc: t("about.values.communityDesc") },
  ];

  const journey = [
    { step: "01", title: t("about.journey.step1.title"), desc: t("about.journey.step1.desc") },
    { step: "02", title: t("about.journey.step2.title"), desc: t("about.journey.step2.desc") },
    { step: "03", title: t("about.journey.step3.title"), desc: t("about.journey.step3.desc") },
    { step: "04", title: t("about.journey.step4.title"), desc: t("about.journey.step4.desc") },
    { step: "05", title: t("about.journey.step5.title"), desc: t("about.journey.step5.desc") },
  ];

  return (
    <main>
      <PageHero
        image={aboutImg}
        tag={t("about.hero.tag")}
        title={t("about.hero.title")}
        description={t("about.hero.description")}
      >
        <Link to="/get-involved" className="btn-primary px-8 py-3.5 rounded-full text-sm">
          {t("about.hero.cta")}
        </Link>
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading tag={t("about.what.tag")} title={t("about.what.title")} />
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.what.p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.what.p2")}</p>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-border">
            <img src={heroImg} alt="Dance performance" className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag={t("about.values.tag")} title={t("about.values.title")} center />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} className="p-8 rounded-2xl bg-card border border-border text-center card-glow hover:-translate-y-2 transition-all duration-500" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
              <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-primary/10 flex items-center justify-center">
                <v.icon className="text-primary" size={26} />
              </div>
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading tag={t("about.journey.tag")} title={t("about.journey.title")} center />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{t("about.journey.intro")}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {journey.map((j, i) => (
            <motion.div key={j.step} className="relative p-6 rounded-2xl bg-card border border-border hover:-translate-y-1 transition-all duration-400" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <span className="text-4xl font-bold font-serif gold-gradient-text opacity-50">{j.step}</span>
              <h4 className="text-lg font-bold mt-2 mb-2">{j.title}</h4>
              <p className="text-sm text-muted-foreground">{j.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading tag={t("about.ida.tag")} title={t("about.ida.title")} center />
          <p className="text-muted-foreground leading-relaxed mb-4">{t("about.ida.p1")}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{t("about.ida.p2")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Sparkles, label: t("about.ida.accessibility") },
              { icon: Star, label: t("about.ida.inclusion") },
              { icon: Users, label: t("about.ida.diversity") },
            ].map((item) => (
              <div key={item.label} className="px-6 py-3 rounded-full glass-card flex items-center gap-2">
                <item.icon className="text-primary" size={16} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
};

export default About;
