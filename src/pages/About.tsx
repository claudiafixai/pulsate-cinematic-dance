import { Link } from "react-router-dom";
import { Heart, Film, Users, Star, Sparkles } from "lucide-react";
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
        <Link to="/get-involved" className="inline-flex items-center justify-center px-8 py-3 font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors">
          Get Tickets
        </Link>
      </PageHero>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading tag="What is Pulsate?" title="More than a competition — a movement" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pulsate is not a traditional stage competition. It is a dance-for-camera experience where your work is created, submitted, and selected with the final goal of appearing in a feature-length dance film that premieres in a movie theater.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Multi-style, multi-age, and open to all levels, the competition is built around growth, storytelling, and cinematic presence — not just tricks, medals, or speed.
            </p>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden border border-border">
            <img src={heroImg} alt="Dance performance" className="w-full h-full object-cover" />
          </div>
        </div>
      </Section>

      <Section variant="alt">
        <SectionHeading tag="Our Values" title="What drives Pulsate" center />
        <div className="grid sm:grid-cols-3 gap-8">
          {values.map((v) => (
            <div key={v.title} className="p-8 rounded-xl bg-card border border-border text-center card-glow transition-all duration-300 hover:-translate-y-1">
              <v.icon className="text-primary mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading tag="The Journey" title="From submission to screen in 5 steps" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {journey.map((j) => (
            <div key={j.step} className="relative p-6 rounded-xl bg-card border border-border">
              <span className="text-4xl font-bold font-serif text-primary/30">{j.step}</span>
              <h4 className="text-lg font-bold mt-2 mb-2">{j.title}</h4>
              <p className="text-sm text-muted-foreground">{j.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="alt">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading tag="AID – Art in Dance" title="Pulsate believes in Accessibility, Inclusion & Diversity" center />
          <p className="text-muted-foreground leading-relaxed mb-6">
            Pulsate is committed to making dance accessible to everyone. We celebrate all bodies, all backgrounds, and all styles. Our AID initiative ensures that financial barriers, physical limitations, and cultural differences never stand in the way of artistic expression.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="inline mr-2 text-primary" size={16} />
              <span className="text-sm font-medium">Accessibility</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <Star className="inline mr-2 text-primary" size={16} />
              <span className="text-sm font-medium">Inclusion</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-primary/10 border border-primary/20">
              <Users className="inline mr-2 text-primary" size={16} />
              <span className="text-sm font-medium">Diversity</span>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
};

export default About;
