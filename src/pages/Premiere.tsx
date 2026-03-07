import { useState } from "react";
import { Film, Award, Star, Camera, Sparkles } from "lucide-react";
import premiereImg from "@/assets/premiere-cinema.jpg";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";

const filmDetails = [
  "Feature-length dance film with finalist pieces and collective creations",
  "Premiere at a cinema in Laval, Quebec (Cineplex location)",
  "Awards ceremony celebrating dancers, stories, and innovation",
  "VIP Glow-Up Lounge for elevated photos, networking, and celebration",
];

const awardCategories = [
  { icon: Star, title: "Best Solo Performance", desc: "Outstanding individual artistic expression" },
  { icon: Award, title: "Best Group Choreography", desc: "Most compelling group piece" },
  { icon: Film, title: "Best Cinematic Piece", desc: "Strongest dance-for-camera vision" },
  { icon: Camera, title: "Best Storytelling", desc: "Most emotionally impactful narrative" },
  { icon: Sparkles, title: "Audience Choice", desc: "Voted by the premiere audience" },
  { icon: Star, title: "Rising Star", desc: "Most promising emerging dancer" },
];

const Premiere = () => {
  const [email, setEmail] = useState("");

  return (
    <main>
      <PageHero
        image={premiereImg}
        tag="Premiere & Awards"
        title="Where the Pulsate journey meets the big screen"
        description="After months of creation, filming, and community, Pulsate comes together as a feature-length dance film premiering in December 2026 at a Cineplex theater in Laval, Quebec."
      >
        <div className="flex flex-wrap gap-4">
          <a href="#tickets" className="inline-flex items-center justify-center px-8 py-3 font-semibold bg-primary text-primary-foreground rounded-full hover:bg-gold-light transition-colors">
            Get premiere ticket updates
          </a>
          <a href="#awards" className="inline-flex items-center justify-center px-8 py-3 font-semibold border border-primary text-primary rounded-full hover:bg-primary/10 transition-colors">
            View award categories
          </a>
        </div>
      </PageHero>

      <Section>
        <SectionHeading tag="The Film" title="A cinematic celebration of dance" />
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
          {filmDetails.map((d, i) => (
            <div key={i} className="flex items-start gap-3 p-5 rounded-xl bg-card border border-border">
              <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-8">
          Exact premiere date and final Cineplex Laval details will be announced closer to December 2026.
        </p>
      </Section>

      <Section variant="alt" id="awards">
        <SectionHeading tag="Awards" title="Categories celebrating excellence" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardCategories.map((a) => (
            <div key={a.title} className="p-6 rounded-xl bg-card border border-border text-center card-glow transition-all duration-300 hover:-translate-y-1">
              <a.icon className="text-primary mx-auto mb-3" size={28} />
              <h3 className="font-bold mb-1">{a.title}</h3>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="tickets">
        <div className="max-w-xl mx-auto text-center">
          <SectionHeading tag="Tickets" title="Be the first to know when tickets drop" center />
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

export default Premiere;
