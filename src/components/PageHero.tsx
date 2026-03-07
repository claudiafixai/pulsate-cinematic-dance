interface PageHeroProps {
  image: string;
  tag?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHero = ({ image, tag, title, description, children }: PageHeroProps) => {
  return (
    <section className="relative min-h-[70vh] flex items-end">
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 pt-32 w-full">
        {tag && (
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            {tag}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-base sm:text-lg text-cream-muted max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};

export default PageHero;
