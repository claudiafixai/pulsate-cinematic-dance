import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "alt";
  id?: string;
}

const Section = ({ children, className = "", variant = "default", id }: SectionProps) => {
  const bg = variant === "alt" ? "bg-secondary" : "bg-background";
  return (
    <section id={id} className={`section-padding ${bg} ${className}`}>
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;