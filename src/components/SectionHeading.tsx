interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  center?: boolean;
}

const SectionHeading = ({ tag, title, description, center = false }: SectionHeadingProps) => {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {tag && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
          {tag}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{title}</h2>
      {description && (
        <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed text-base sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
