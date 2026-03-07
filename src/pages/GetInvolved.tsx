import { useState } from "react";
import { Handshake, ShoppingBag, Mail, Phone, Star, Zap, Crown } from "lucide-react";
import heroImg from "@/assets/hero-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

const tiers = [
  {
    icon: Star,
    name: "Community Partner",
    price: "From $250",
    features: ["Logo on website", "Social media mentions", "Event access passes"],
  },
  {
    icon: Zap,
    name: "Gold Sponsor",
    price: "From $1,000",
    features: ["Logo on all materials", "VIP premiere access", "Workshop branding", "Dedicated social campaign"],
    highlighted: true,
  },
  {
    icon: Crown,
    name: "Presenting Partner",
    price: "Custom",
    features: ["Title sponsorship", "Full creative integration", "Keynote presence", "Film credits", "Custom deliverables"],
  },
];

const merchandise = [
  { name: "Pulsate T-Shirt", price: "$35" },
  { name: "Pulsate Hoodie", price: "$65" },
  { name: "Dance Bag", price: "$45" },
  { name: "Limited Edition Poster", price: "$20" },
];

const GetInvolved = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <main>
      <PageHero
        image={heroImg}
        tag="Get Involved"
        title="Be part of Pulsate beyond the screen"
        description="Pulsate is more than a dance film. It is a community project powered by dancers, studios, sponsors, and supporters who believe in giving young artists real opportunities."
      >
        <div className="flex flex-wrap gap-4">
          <a href="#sponsors" className="inline-flex items-center justify-center px-8 py-3 font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors">
            Sponsor or partner with Pulsate
          </a>
          <a href="#merch" className="inline-flex items-center justify-center px-8 py-3 font-semibold border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
            Explore Pulsate merchandise
          </a>
          <a href="#contact" className="text-primary font-medium underline underline-offset-4 flex items-center">
            Contact the team
          </a>
        </div>
      </PageHero>

      <Section id="sponsors">
        <SectionHeading tag="Sponsorship" title="Sponsors & partners" center />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Pulsate creates visibility for dancers, studios, and brands that care about arts, youth, and diversity. As a sponsor or partner, your brand becomes part of a movement.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <div key={t.name} className={`p-8 rounded-xl border text-center transition-all duration-300 hover:-translate-y-1 ${t.highlighted ? "bg-card border-primary card-glow" : "bg-card border-border"}`}>
              <t.icon className="text-primary mx-auto mb-4" size={32} />
              <h3 className="text-xl font-bold mb-1">{t.name}</h3>
              <p className="text-primary font-semibold text-lg mb-4">{t.price}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="alt" id="merch">
        <SectionHeading tag="Merchandise" title="Wear the movement" center />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {merchandise.map((m) => (
            <div key={m.name} className="p-6 rounded-xl bg-card border border-border text-center">
              <ShoppingBag className="text-primary mx-auto mb-3" size={24} />
              <h4 className="font-semibold text-sm">{m.name}</h4>
              <p className="text-primary font-bold mt-1">{m.price}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          Merchandise coming soon. Stay tuned for the official Pulsate store.
        </p>
      </Section>

      <Section id="contact">
        <div className="max-w-xl mx-auto">
          <SectionHeading tag="Contact" title="Get in touch with the team" center />
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              placeholder="Your message"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            />
            <button className="w-full px-6 py-3 font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-gold-light transition-colors">
              Send Message
            </button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted-foreground">
            <a href="mailto:info@pulsateproject.ca" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={14} /> info@pulsateproject.ca
            </a>
            <a href="tel:+15146194119" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={14} /> +1 514 619-4119
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default GetInvolved;
