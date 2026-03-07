import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Award, Clapperboard, Eye, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-dance.jpg";
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

      {/* About Preview */}
      <Section variant="alt">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading tag="About Pulsate" title="A dance film project for every passionate mover" />
            <p className="text-muted-foreground leading-relaxed mb-8">
              Pulsate is a hybrid dance and film project created to help passionate dancers grow in their art, feel empowered, and share the experience with their community. From first video submission to the movie theater premiere, the journey is designed to be fun, supportive, and open to all levels, ages, and styles.
            </p>
            <Link to="/about" className="btn-outline px-6 py-2.5 rounded-full text-sm">
              Discover the full story →
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden border border-border">
              <img src={heroImg} alt="Dancers performing" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl border border-primary/20 -z-10" />
          </div>
        </div>
      </Section>

      {/* Partners & Sponsors */}
      <Section>
        <SectionHeading tag="Our Community" title="Brand partners & sponsors" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { name: "Dance Alejandro", type: "Brand Partner" },
            { name: "Claudia Ops.ai", type: "Brand Partner" },
            { name: "Spa Mobile", type: "Sponsor" },
            { name: "Studio Jolie Moi", type: "Sponsor" },
          ].map((p, i) => (
            <motion.div
              key={p.name}
              className="p-6 rounded-2xl glass-card text-center hover:-translate-y-1 transition-all duration-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-serif font-bold text-primary">{p.name[0]}</span>
              </div>
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{p.type}</p>
            </motion.div>
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