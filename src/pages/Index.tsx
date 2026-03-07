import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Award, Clapperboard, Eye, ChevronDown, Mail, Phone, MapPin } from "lucide-react";
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
    <div className="flex gap-4 sm:gap-6">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="text-3xl sm:text-5xl font-bold font-serif text-primary tabular-nums">
            {String(u.value).padStart(2, "0")}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mt-1 uppercase tracking-wider">{u.label}</div>
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
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Link to="/competition" className="inline-flex items-center justify-center px-8 py-3 font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors">
            Enter the Competition
          </Link>
          <Link to="/about" className="inline-flex items-center justify-center px-8 py-3 font-semibold border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
            Learn More
          </Link>
        </div>
        <div className="mt-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Registration opens March 31, 2026</p>
          <CountdownTimer />
        </div>
      </PageHero>

      {/* Opportunities */}
      <Section>
        <SectionHeading tag="Opportunities" title="A place for everyone in the Pulsate story" center />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunities.map((opp) => (
            <div key={opp.title} className="p-6 rounded-xl bg-card border border-border card-glow transition-all duration-300 hover:-translate-y-1">
              <opp.icon className="text-primary mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">{opp.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{opp.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* About Preview */}
      <Section variant="alt">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading tag="About Pulsate" title="A dance film project for every passionate mover" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              Pulsate is a hybrid dance and film project created to help passionate dancers grow in their art, feel empowered, and share the experience with their community. From first video submission to the movie theater premiere, the journey is designed to be fun, supportive, and open to all levels, ages, and styles.
            </p>
            <Link to="/about" className="inline-flex items-center text-primary font-medium hover:text-gold-light transition-colors gap-1">
              Discover the full story →
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-video rounded-xl overflow-hidden border border-border">
              <img src={heroImg} alt="Dancers performing" className="w-full h-full object-cover" />
            </div>
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
          ].map((p) => (
            <div key={p.name} className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-serif font-bold text-primary">{p.name[0]}</span>
              </div>
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{p.type}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section variant="alt">
        <SectionHeading tag="The Team" title="The people behind Pulsate" center />
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((m) => (
            <div key={m.name} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-primary">{m.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <h4 className="font-semibold">{m.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading tag="FAQ" title="Frequently asked questions" center />
        <div className="max-w-3xl mx-auto grid gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-card border border-border overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-medium text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown className={`text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} size={20} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-up">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
};

export default Index;
