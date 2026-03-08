import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Users, Award, Clapperboard, Eye, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "@/assets/hero-dance.jpg";
import aboutGroupImg from "@/assets/about-group-dance.jpg";
import logoDanseAlejandro from "@/assets/logo-danse-alejandro.png";
import logoClaudiaOps from "@/assets/logo-claudiaops.png";
import logoSpaMobile from "@/assets/logo-spa-mobile.jpg";
import logoStudioJolieMoi from "@/assets/logo-studio-jolie-moi.jpg";
import logoAlkimia from "@/assets/logo-alkimia.png";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const CountdownTimer = () => {
  const { t } = useLanguage();
  const target = new Date("2026-03-15T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: t("index.countdown.days"), value: timeLeft.days },
    { label: t("index.countdown.hours"), value: timeLeft.hours },
    { label: t("index.countdown.minutes"), value: timeLeft.minutes },
  ];

  return (
    <div className="flex gap-3 sm:gap-8">
      {units.map((u) => (
        <div key={u.label} className="text-center min-w-0 flex-1 sm:flex-none">
          <div className="text-2xl sm:text-5xl font-bold font-serif gold-gradient-text tabular-nums">
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mt-2 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{u.label}</div>
        </div>
      ))}
    </div>
  );
};

const Index = () => {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const opportunities = [
    { icon: Users, title: t("index.opp.dancers"), desc: t("index.opp.dancersDesc") },
    { icon: Award, title: t("index.opp.sponsors"), desc: t("index.opp.sponsorsDesc") },
    { icon: Eye, title: t("index.opp.judges"), desc: t("index.opp.judgesDesc") },
    { icon: Clapperboard, title: t("index.opp.audience"), desc: t("index.opp.audienceDesc") },
  ];

  const faqs = [
    { q: t("index.faq.q1"), a: t("index.faq.a1") },
    { q: t("index.faq.q2"), a: t("index.faq.a2") },
    { q: t("index.faq.q3"), a: t("index.faq.a3") },
    { q: t("index.faq.q4"), a: t("index.faq.a4") },
    { q: t("index.faq.q5"), a: t("index.faq.a5") },
    { q: t("index.faq.q6"), a: t("index.faq.a6") },
    { q: t("index.faq.q7"), a: t("index.faq.a7") },
    { q: t("index.faq.q8"), a: t("index.faq.a8") },
  ];

  const team = [
    { name: "Barbara Villavicencio", role: t("index.team.barbara.role") },
    { name: "Carlos Alejandro", role: t("index.team.carlos.role") },
    { name: "Patty Isabelle Jean Baptiste", role: t("index.team.patty.role") },
  ];

  return (
    <main>
      <PageHero
        image={heroImg}
        tag={t("index.hero.tag")}
        title={t("index.hero.title")}
        description={t("index.hero.description")}
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link to="/competition" className="btn-primary px-8 py-3.5 rounded-full text-sm">
            {t("index.hero.enterCompetition")}
          </Link>
          <Link to="/about" className="btn-outline px-8 py-3.5 rounded-full text-sm">
            {t("index.hero.learnMore")}
          </Link>
        </div>
        <div>
          <p className="text-lg sm:text-xl font-bold mb-2">{t("index.countdown.headline")}</p>
          <p className="text-sm text-muted-foreground mb-6 max-w-md">{t("index.countdown.subheadline")}</p>
          <CountdownTimer />
          <Link to="/competition" className="btn-outline px-6 py-2.5 rounded-full text-sm mt-6 inline-block">
            {t("index.countdown.cta")}
          </Link>
        </div>
      </PageHero>

      {/* Opportunities */}
      <Section>
        <SectionHeading tag={t("index.opportunities.tag")} title={t("index.opportunities.title")} center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((opp, i) => (
            <motion.div
              key={opp.title}
              className="group p-8 rounded-2xl bg-card border border-border card-glow hover:-translate-y-2 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <opp.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">{opp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{opp.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Parallax Dance Image */}
      <section ref={parallaxRef} className="relative h-[50vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
          <img src={aboutGroupImg} alt="Group bachata dance class" className="w-full h-[140%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background" />
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.p
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-center max-w-3xl px-4 gold-gradient-text"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t("index.parallax.quote")}
          </motion.p>
        </div>
      </section>

      {/* About Preview */}
      <Section variant="alt">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionHeading tag={t("index.about.tag")} title={t("index.about.title")} />
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t("index.about.description")}
            </p>
            <Link to="/about" className="btn-primary px-6 py-2.5 rounded-full text-sm">
              {t("index.about.cta")}
            </Link>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/5">
              <motion.img src={heroImg} alt="Dancers performing" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-primary/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl border border-primary/10 -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Sponsors */}
      <Section>
        <SectionHeading tag={t("index.sponsors.tag")} title={t("index.sponsors.title")} center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {[
            { name: "Danse Alejandro", logo: logoDanseAlejandro, url: "https://www.dansealejandro.com/", bg: "bg-white" },
            { name: "ClaudiaOps AI", logo: logoClaudiaOps, url: "https://claudiaops.ai/", bg: "bg-white" },
          ].map((p, i) => (
            <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="p-8 rounded-2xl glass-card text-center hover:-translate-y-2 transition-all duration-500 block group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className={`w-36 h-36 mx-auto mb-5 rounded-2xl ${p.bg} flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow duration-300`}>
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{p.name}</h4>
              <p className="text-xs text-primary/60 mt-1 uppercase tracking-[0.15em]">{t("index.sponsors.sponsor")}</p>
            </motion.a>
          ))}
        </div>

        <div className="divider-gold mb-16" />

        <SectionHeading tag={t("index.collaborator.tag")} title={t("index.collaborator.title")} center />
        <div className="max-w-sm mx-auto mb-16">
          <motion.a href="https://alkimiaproductions.com/" target="_blank" rel="noopener noreferrer" className="p-8 rounded-2xl glass-card text-center hover:-translate-y-2 transition-all duration-500 block group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-32 h-32 mx-auto mb-5 rounded-2xl bg-card flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow duration-300">
              <img src={logoAlkimia} alt="Alkimia Productions" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Alkimia Productions</h4>
            <p className="text-xs text-primary/60 mt-1 uppercase tracking-[0.15em]">{t("index.collaborator.label")}</p>
          </motion.a>
        </div>

        <div className="divider-gold mb-16" />

        <SectionHeading tag={t("index.vendors.tag")} title={t("index.vendors.title")} center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {[
            { name: "Spa Mobile", logo: logoSpaMobile, url: "https://www.spa-mobile.com/", bg: "bg-white" },
            { name: "Studio Jolie Moi", logo: logoStudioJolieMoi, url: "https://studiojoliemoi.com/en", bg: "bg-white" },
          ].map((p, i) => (
            <motion.a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl glass-card text-center hover:-translate-y-2 transition-all duration-500 block group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className={`w-28 h-28 mx-auto mb-4 rounded-xl ${p.bg} flex items-center justify-center p-3 group-hover:shadow-lg transition-shadow duration-300`}>
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{p.name}</h4>
              <p className="text-xs text-primary/60 mt-1 uppercase tracking-[0.15em]">{t("index.vendors.label")}</p>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section variant="alt">
        <SectionHeading tag={t("index.team.tag")} title={t("index.team.title")} center />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <motion.div key={m.name} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
                <span className="text-2xl font-serif font-bold gold-gradient-text">{m.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading tag={t("index.faq.tag")} title={t("index.faq.title")} center />
        <div className="max-w-3xl mx-auto grid gap-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} className="rounded-2xl bg-card border border-border overflow-hidden" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors duration-300">
                <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown className={`text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} size={18} />
              </button>
              {openFaq === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Index;
