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
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
};

export default Section;
