import { Link } from "react-router-dom";
import { Heart, Film, Users, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import aboutImg from "@/assets/about-dance.jpg";
import heroImg from "@/assets/hero-dance.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

const values = [
  { icon: Heart, title: "Empowerment", desc: "Every dancer deserves to feel like a star. Pulsate creates a safe, supportive space for growth and expression." },
  { icon: Film, title: "Cinematic Vision", desc: "We bring dance to the big screen, merging movement with the art of filmmaking for a unique experience." },
  { icon: Users, title: "Community", desc: "Pulsate is built by dancers, for dancers — and everyone who believes in the power of movement." },
];

const journey = [
  { step: "01", title: "Register", desc: "Sign up and choose your category." },
  { step: "02", title: "Create & Film", desc: "Choreograph and film your dance piece with cinematic intent." },
  { step: "03", title: "Submit", desc: "Upload your video to the Pulsate portal." },
  { step: "04", title: "Selection", desc: "Our judges review all submissions for the final film." },
  { step: "05", title: "Premiere", desc: "Selected pieces are featured in the Pulsate film at Cineplex Laval." },
];

const About = () => {
  return (
    <main>
      <PageHero
        image={aboutImg}
        tag="About Pulsate"
        title="A dance film project for every passionate mover"
        description="Pulsate is a hybrid dance and film project created to help passionate dancers grow in their art, feel empowered, and share the experience with their community."
      >
        <Link to="/get-involved" className="btn-primary px-8 py-3.5 rounded-full text-sm">
          Get Tickets
        </Link>
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading tag="What is Pulsate?" title="More than a competition — a movement" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pulsate is not a traditional stage competition. It is a dance-for-camera experience where your work is created, submitted, and selected with the final goal of appearing in a feature-length dance film that premieres in a movie theater.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Multi-style, multi-age, and open to all levels, the competition is built around growth, storytelling, and cinematic presence — not just tricks, medals, or speed.
            </p>
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden border border-border">
            <img src={heroImg} alt="Dance performance" className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag="Our Values" title="What drives Pulsate" center />
        <div className="grid sm:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="p-8 rounded-2xl bg-card border border-border text-center card-glow hover:-translate-y-2 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
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
        <SectionHeading tag="The Journey" title="From submission to screen in 5 steps" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {journey.map((j, i) => (
            <motion.div
              key={j.step}
              className="relative p-6 rounded-2xl bg-card border border-border hover:-translate-y-1 transition-all duration-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-4xl font-bold font-serif gold-gradient-text opacity-50">{j.step}</span>
              <h4 className="text-lg font-bold mt-2 mb-2">{j.title}</h4>
              <p className="text-sm text-muted-foreground">{j.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading tag="AID – Art in Dance" title="Pulsate believes in Accessibility, Inclusion & Diversity" center />
          <p className="text-muted-foreground leading-relaxed mb-8">
            Pulsate is committed to making dance accessible to everyone. We celebrate all bodies, all backgrounds, and all styles. Our AID initiative ensures that financial barriers, physical limitations, and cultural differences never stand in the way of artistic expression.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Sparkles, label: "Accessibility" },
              { icon: Star, label: "Inclusion" },
              { icon: Users, label: "Diversity" },
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