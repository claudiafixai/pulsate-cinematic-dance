import { useState } from "react";
import { Clock, MapPin, Monitor, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import workshopImg from "@/assets/workshop-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";

const timeline = [
  { time: "3:00 – 3:55 PM", title: "Block 1", desc: "Opening workshop session" },
  { time: "4:05 – 5:00 PM", title: "Block 2", desc: "Mid-afternoon session" },
  { time: "5:10 – 6:05 PM", title: "Block 3", desc: "Core workshop block" },
  { time: "6:15 – 7:10 PM", title: "Block 4", desc: "Late afternoon session" },
  { time: "7:20 – 8:00 PM", title: "Block 5", desc: "Closing session" },
];

const highlights = [
  { icon: Calendar, text: "December 5 – 3:00 PM to 8:00 PM" },
  { icon: MapPin, text: "In-studio workshops (Laval – venue to be confirmed)" },
  { icon: Monitor, text: "Online seminars during the same time blocks" },
  { icon: Clock, text: "5 × 55-minute sessions with short breaks" },
];

const Workshops = () => {
  const [email, setEmail] = useState("");
  const { submit, loading } = useEmailSubmit();

  const handleSubmit = async () => {
    const success = await submit({ email, source: "workshop-notify" });
    if (success) setEmail("");
  };

  return (
    <main>
      <PageHero
        image={workshopImg}
        tag="Pulsate 2026"
        title="Workshops & Seminars – December 5"
        description="One intensive afternoon to grow, connect, and get inspired. From 3:00 PM to 8:00 PM, join in-studio workshops in Laval and online seminars running in parallel sessions."
      >
        <div className="flex flex-wrap gap-4">
          <a href="#pricing" className="btn-primary px-8 py-3.5 rounded-full text-sm">
            Get the full day pass – $80
          </a>
          <a href="#pricing" className="btn-outline px-8 py-3.5 rounded-full text-sm">
            Drop-in workshop – $25 per block
          </a>
        </div>
      </PageHero>

      <Section>
        <SectionHeading tag="Details" title="What to expect" />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 p-5 rounded-2xl glass-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <h.icon className="text-primary" size={18} />
              </div>
              <span className="text-sm">{h.text}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag="Schedule" title="Workshop timeline" center />
        <div className="max-w-2xl mx-auto space-y-3">
          {timeline.map((t, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-6 p-5 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="text-primary font-mono text-sm font-semibold whitespace-nowrap w-36 shrink-0">{t.time}</div>
              <div className="divider-gold w-8 shrink-0 hidden sm:block" />
              <div>
                <h4 className="font-bold">{t.title}</h4>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          Artists and final program to be announced soon.
        </p>
      </Section>

      <Section id="pricing">
        <SectionHeading tag="Pricing" title="Choose your experience" center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div
            className="p-8 rounded-2xl bg-card border-2 border-primary text-center card-glow animate-pulse-glow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-serif gold-gradient-text">$80</h3>
            <p className="font-semibold mt-2">Full Day Pass</p>
            <p className="text-sm text-muted-foreground mt-2">Access to all 5 blocks, in-studio or online.</p>
            <div className="mt-6 text-xs text-primary font-medium uppercase tracking-[0.2em]">Best Value</div>
          </motion.div>
          <motion.div
            className="p-8 rounded-2xl bg-card border border-border text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-3xl font-bold font-serif gold-gradient-text">$25</h3>
            <p className="font-semibold mt-2">Drop-in</p>
            <p className="text-sm text-muted-foreground mt-2">Per block. Pick the sessions that interest you.</p>
          </motion.div>
        </div>
      </Section>

      <Section variant="alt">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading tag="Stay Updated" title="Get workshop details first" center />
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
            <button onClick={handleSubmit} disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm disabled:opacity-50">
              {loading ? "..." : "Notify Me"}
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Workshops;
