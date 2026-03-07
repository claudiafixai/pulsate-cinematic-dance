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
import logoCineplex from "@/assets/logo-cineplex.png";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

const CountdownTimer = () => {
  const target = new Date("2026-03-31T00:00:00").getTime();
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
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-4 sm:gap-8">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="text-3xl sm:text-5xl font-bold font-serif gold-gradient-text tabular-nums">
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-[10px] sm:text-xs text-muted-foreground mt-2 uppercase tracking-[0.2em]">{u.label}</div>
        </div>
      ))}
    </div>
  );
};

const opportunities = [
  { icon: Users, title: "Dancers", desc: "Submit your work and grow as an artist on the big screen." },
  { icon: Award, title: "Sponsors", desc: "Support the arts and gain visibility in the dance community." },
  { icon: Eye, title: "Judges", desc: "Help shape the future of dance film with your expertise." },
  { icon: Clapperboard, title: "Audience", desc: "Experience a premiere like no other at Cineplex Laval." },
];

const faqs = [
  { q: "Who can participate in Pulsate?", a: "Pulsate is open to dancers of all ages, levels, and styles. Whether you're a beginner or professional, solo or in a group, you're welcome." },
  { q: "How do I submit my video?", a: "After registration, you'll receive access to our submission portal. Upload your dance video following our guidelines before the deadline." },
  { q: "What styles of dance are accepted?", a: "All styles are welcome — contemporary, hip-hop, ballet, jazz, cultural dances, freestyle, and more." },
  { q: "Is there an age requirement?", a: "No age requirement. Pulsate is multi-age and designed for everyone from young dancers to adults." },
  { q: "Where is the premiere held?", a: "The premiere will be held at a Cineplex theater in Laval, Quebec in December 2026." },
  { q: "How much does it cost to enter?", a: "Registration fees vary by category. Visit the Competition page for detailed pricing." },
  { q: "Can I attend the workshops online?", a: "Yes! Workshops run in parallel — in-studio in Laval and online seminars during the same time blocks." },
  { q: "How are winners selected?", a: "A panel of judges evaluates entries based on storytelling, cinematic presence, creativity, and emotional impact." },
];

const team = [
  { name: "Barbara Villavicencio", role: "Founder & Creative Director" },
  { name: "Carlos Alejandro", role: "Co-Director & Brand Lead" },
  { name: "Patty Isabelle Jean Baptiste", role: "Community & Operations" },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main>
      <PageHero
        image={heroImg}
        tag="Pulsate 2026"
        title="Where dance meets film and community"
        description="A cinematic dance competition designed for the big screen. Submit your art, grow as an artist, and premiere in a real movie theater."
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Link to="/competition" className="btn-primary px-8 py-3.5 rounded-full text-sm">
            Enter the Competition
          </Link>
          <Link to="/about" className="btn-outline px-8 py-3.5 rounded-full text-sm">
            Learn More
          </Link>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Registration opens March 31, 2026</p>
          <CountdownTimer />
        </div>
      </PageHero>

      {/* Opportunities */}
      <Section>
        <SectionHeading tag="Opportunities" title="A place for everyone in the Pulsate story" center />
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
      <section className="relative h-[50vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -150]) }}
        >
          <img src={aboutGroupImg} alt="Group bachata dance class" className="w-full h-[130%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.p
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-center max-w-3xl px-4 gold-gradient-text"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Feel the rhythm. Tell your story.
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
            <SectionHeading tag="About Pulsate" title="A dance film project for every passionate mover" />
            <p className="text-muted-foreground leading-relaxed mb-8">
              Pulsate is a hybrid dance and film project created to help passionate dancers grow in their art, feel empowered, and share the experience with their community. From first video submission to the movie theater premiere, the journey is designed to be fun, supportive, and open to all levels, ages, and styles.
            </p>
            <Link to="/about" className="btn-primary px-6 py-2.5 rounded-full text-sm">
              Discover the full story →
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
              <motion.img
                src={heroImg}
                alt="Dancers performing"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-primary/20 -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl border border-primary/10 -z-10" />
          </motion.div>
        </div>
      </Section>

      {/* Brand Partners */}
      <Section>
        <SectionHeading tag="Brand Partners" title="Powered by passionate partners" center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-16">
          {[
            { name: "Danse Alejandro", logo: logoDanseAlejandro, url: "https://www.dansealejandro.com/", bg: "bg-white" },
            { name: "ClaudiaOps AI", logo: logoClaudiaOps, url: "https://claudiaops.ai/", bg: "bg-white" },
          ].map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-2xl glass-card text-center hover:-translate-y-2 transition-all duration-500 block group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`w-36 h-36 mx-auto mb-5 rounded-2xl ${p.bg} flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow duration-300`}>
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{p.name}</h4>
              <p className="text-xs text-primary/60 mt-1 uppercase tracking-[0.15em]">Brand Partner</p>
            </motion.a>
          ))}
        </div>

        <div className="divider-gold mb-16" />

        {/* Creative Collaborator */}
        <SectionHeading tag="Creative Collaborator" title="Bringing the vision to life" center />
        <div className="max-w-sm mx-auto mb-16">
          <motion.a
            href="https://alkimiaproductions.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-2xl glass-card text-center hover:-translate-y-2 transition-all duration-500 block group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-32 h-32 mx-auto mb-5 rounded-2xl bg-card flex items-center justify-center p-4 group-hover:shadow-xl transition-shadow duration-300">
              <img src={logoAlkimia} alt="Alkimia Productions" className="w-full h-full object-contain" />
            </div>
            <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Alkimia Productions</h4>
            <p className="text-xs text-primary/60 mt-1 uppercase tracking-[0.15em]">Creative Collaborator</p>
          </motion.a>
        </div>

        <div className="divider-gold mb-16" />

        {/* Vendors */}
        <SectionHeading tag="Vendors" title="Our trusted vendors" center />
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { name: "Cineplex", logo: logoCineplex, url: "https://www.cineplex.com/", bg: "bg-white" },
            { name: "Spa Mobile", logo: logoSpaMobile, url: "https://www.spa-mobile.com/", bg: "bg-white" },
            { name: "Studio Jolie Moi", logo: logoStudioJolieMoi, url: "https://studiojoliemoi.com/en", bg: "bg-white" },
          ].map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-card text-center hover:-translate-y-2 transition-all duration-500 block group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className={`w-28 h-28 mx-auto mb-4 rounded-xl ${p.bg} flex items-center justify-center p-3 group-hover:shadow-lg transition-shadow duration-300`}>
                <img src={p.logo} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">{p.name}</h4>
              <p className="text-xs text-primary/60 mt-1 uppercase tracking-[0.15em]">Vendor</p>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section variant="alt">
        <SectionHeading tag="The Team" title="The people behind Pulsate" center />
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
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
        <SectionHeading tag="FAQ" title="Frequently asked questions" center />
        <div className="max-w-3xl mx-auto grid gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-card border border-border overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors duration-300"
              >
                <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown className={`text-primary shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} size={18} />
              </button>
              {openFaq === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"
                >
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