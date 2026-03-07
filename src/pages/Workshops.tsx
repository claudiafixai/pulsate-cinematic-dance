import { useState } from "react";
import { Clock, MapPin, Monitor, Calendar } from "lucide-react";
import workshopImg from "@/assets/workshop-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

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

  return (
    <main>
      <PageHero
        image={workshopImg}
        tag="Pulsate 2026"
        title="Workshops & Seminars – December 5"
        description="One intensive afternoon to grow, connect, and get inspired. From 3:00 PM to 8:00 PM, join in-studio workshops in Laval and online seminars running in parallel sessions."
      >
        <div className="flex flex-wrap gap-4">
          <a href="#pricing" className="inline-flex items-center justify-center px-8 py-3 font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors">
            Get the full day pass – $80
          </a>
          <a href="#pricing" className="inline-flex items-center justify-center px-8 py-3 font-semibold border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
            Drop-in workshop – $25 per block
          </a>
        </div>
      </PageHero>

      <Section>
        <SectionHeading tag="Details" title="What to expect" />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <h.icon className="text-primary shrink-0" size={20} />
              <span className="text-sm">{h.text}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag="Schedule" title="Workshop timeline" center />
        <div className="max-w-2xl mx-auto space-y-4">
          {timeline.map((t, i) => (
            <div key={i} className="flex items-center gap-6 p-5 rounded-xl bg-card border border-border">
              <div className="text-primary font-mono text-sm font-semibold whitespace-nowrap w-36 shrink-0">{t.time}</div>
              <div>
                <h4 className="font-bold">{t.title}</h4>
                <p className="text-sm text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          Artists and final program to be announced soon.
        </p>
      </Section>

      <Section id="pricing">
        <SectionHeading tag="Pricing" title="Choose your experience" center />
        <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="p-8 rounded-xl bg-card border-2 border-primary text-center card-glow">
            <h3 className="text-2xl font-bold font-serif text-primary">$80</h3>
            <p className="font-semibold mt-2">Full Day Pass</p>
            <p className="text-sm text-muted-foreground mt-2">Access to all 5 blocks, in-studio or online.</p>
            <div className="mt-6 text-xs text-primary font-medium uppercase tracking-wider">Best Value</div>
          </div>
          <div className="p-8 rounded-xl bg-card border border-border text-center">
            <h3 className="text-2xl font-bold font-serif text-primary">$25</h3>
            <p className="font-semibold mt-2">Drop-in</p>
            <p className="text-sm text-muted-foreground mt-2">Per block. Pick the sessions that interest you.</p>
          </div>
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
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="px-6 py-3 font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-gold-light transition-colors">
              Notify Me
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default Workshops;
