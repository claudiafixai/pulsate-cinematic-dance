import { useState } from "react";
import { Video, Upload, Star, Film, Award, Mail } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

const steps = [
  { icon: Mail, title: "Register", desc: "Create your Pulsate account and select your category." },
  { icon: Video, title: "Choreograph & Film", desc: "Create your dance piece with cinematic intention. Film it with care." },
  { icon: Upload, title: "Submit Your Video", desc: "Upload your creation through the Pulsate portal before the deadline." },
  { icon: Star, title: "Judging & Selection", desc: "Our panel evaluates every entry for storytelling, creativity, and cinematic quality." },
  { icon: Film, title: "Premiere on Screen", desc: "Selected pieces are featured in the Pulsate film at Cineplex Laval." },
];

const categories = [
  "Solo", "Duo/Trio", "Small Group (4–9)", "Large Group (10+)", "Open Category"
];

const criteria = [
  { name: "Storytelling & Emotion", weight: "30%" },
  { name: "Cinematic Presence", weight: "25%" },
  { name: "Creativity & Originality", weight: "25%" },
  { name: "Technical Execution", weight: "20%" },
];

const Competition = () => {
  const [email, setEmail] = useState("");

  return (
    <main>
      <PageHero
        image={heroImg}
        tag="The Competition"
        title="A dance competition designed for the big screen"
        description="Pulsate is a dance-for-camera experience where your work is created, submitted, and selected with the final goal of appearing in a feature-length dance film."
      >
        <div className="flex flex-wrap gap-4">
          <a href="#how-it-works" className="btn-primary px-8 py-3.5 rounded-full text-sm">
            How it works
          </a>
          <a href="#register" className="btn-outline px-8 py-3.5 rounded-full text-sm">
            Ready to register?
          </a>
        </div>
      </PageHero>

      <Section id="how-it-works">
        <SectionHeading tag="How It Works" title="From creation to the big screen in 5 steps" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-card border border-border text-center card-glow hover:-translate-y-2 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag="Categories" title="Find your category" center />
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {categories.map((c, i) => (
            <motion.div
              key={c}
              className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {c}
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          All styles welcome: contemporary, hip-hop, ballet, jazz, cultural, freestyle, and more.
        </p>
      </Section>

      <Section>
        <SectionHeading tag="Judging" title="How entries are evaluated" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {criteria.map((c, i) => (
            <motion.div
              key={c.name}
              className="p-6 rounded-2xl bg-card border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="text-3xl font-bold font-serif gold-gradient-text mb-2">{c.weight}</div>
              <h4 className="font-semibold text-sm">{c.name}</h4>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt" id="register">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading tag="Stay Updated" title="Get notified when registration opens" center />
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            <button className="btn-primary px-6 py-3 rounded-xl text-sm">
              Notify Me
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Competition;