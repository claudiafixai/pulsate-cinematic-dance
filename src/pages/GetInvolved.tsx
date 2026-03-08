import { useState } from "react";
import { ShoppingBag, Mail, Star, Zap, Crown } from "lucide-react";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";
import { useLanguage } from "@/contexts/LanguageContext";

const GetInvolved = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { submit, loading } = useEmailSubmit();
  const { t } = useLanguage();

  const handleContact = async () => {
    const success = await submit({
      email: form.email,
      source: "contact",
      name: form.name,
      message: form.message,
    });
    if (success) setForm({ name: "", email: "", message: "" });
  };

  const tiers = [
    {
      icon: Star,
      name: t("involved.tier.community"),
      price: t("involved.tier.communityPrice"),
      features: [t("involved.tier.communityF1"), t("involved.tier.communityF2"), t("involved.tier.communityF3")],
    },
    {
      icon: Zap,
      name: t("involved.tier.gold"),
      price: t("involved.tier.goldPrice"),
      features: [t("involved.tier.goldF1"), t("involved.tier.goldF2"), t("involved.tier.goldF3"), t("involved.tier.goldF4")],
      highlighted: true,
    },
    {
      icon: Crown,
      name: t("involved.tier.presenting"),
      price: t("involved.tier.presentingPrice"),
      features: [t("involved.tier.presentingF1"), t("involved.tier.presentingF2"), t("involved.tier.presentingF3"), t("involved.tier.presentingF4"), t("involved.tier.presentingF5")],
    },
  ];

  const merchandise = [
    { name: t("involved.merch.tshirt"), price: "$35" },
    { name: t("involved.merch.hoodie"), price: "$55" },
    { name: t("involved.merch.bag"), price: "$45" },
    { name: t("involved.merch.poster"), price: "$20" },
  ];

  return (
    <main>
      <PageHero
        image={heroImg}
        tag={t("involved.hero.tag")}
        title={t("involved.hero.title")}
        description={t("involved.hero.description")}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#sponsors" className="btn-primary px-8 py-3.5 rounded-full text-sm min-h-[44px] flex items-center justify-center">{t("involved.hero.sponsor")}</a>
          <a href="#merch" className="btn-outline px-8 py-3.5 rounded-full text-sm min-h-[44px] flex items-center justify-center">{t("involved.hero.merch")}</a>
          <a href="#contact" className="text-primary font-medium underline underline-offset-4 flex items-center min-h-[44px] hover:text-gold-light transition-colors">{t("involved.hero.contact")}</a>
        </div>
      </PageHero>

      <Section id="sponsors">
        <SectionHeading tag={t("involved.sponsorship.tag")} title={t("involved.sponsorship.title")} center />
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">{t("involved.sponsorship.description")}</p>
        <div className="grid sm:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div key={tier.name} className={`p-8 rounded-2xl border text-center hover:-translate-y-2 transition-all duration-500 ${tier.highlighted ? "bg-card border-primary card-glow animate-pulse-glow" : "bg-card border-border card-glow"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"><tier.icon className="text-primary" size={26} /></div>
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <p className="gold-gradient-text font-semibold text-lg mb-4">{tier.price}</p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 justify-center"><div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{f}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt" id="merch">
        <SectionHeading tag={t("involved.merch.tag")} title={t("involved.merch.title")} center />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {merchandise.map((m, i) => (
            <motion.div key={m.name} className="p-6 rounded-2xl glass-card text-center hover:-translate-y-1 transition-all duration-400" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center"><ShoppingBag className="text-primary" size={18} /></div>
              <h4 className="font-semibold text-sm">{m.name}</h4>
              <p className="gold-gradient-text font-bold mt-1">{m.price}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">{t("involved.merch.comingSoon")}</p>
      </Section>

      <Section id="contact">
        <div className="max-w-xl mx-auto">
          <SectionHeading tag={t("involved.contact.tag")} title={t("involved.contact.title")} center />
          <div className="space-y-4">
            <input type="text" placeholder={t("involved.contact.name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
            <input type="email" placeholder={t("involved.contact.email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" />
            <textarea placeholder={t("involved.contact.message")} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none transition-all" />
            <button onClick={handleContact} disabled={loading} className="btn-primary w-full px-6 py-3.5 rounded-xl text-sm disabled:opacity-50">{loading ? t("involved.contact.sending") : t("involved.contact.send")}</button>
          </div>
          <div className="mt-8 flex justify-center text-sm text-muted-foreground">
            <a href="mailto:info@pulsateproject.ca" className="flex items-center gap-2 hover:text-primary transition-colors duration-300"><Mail size={14} className="text-primary/60" /> info@pulsateproject.ca</a>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default GetInvolved;
