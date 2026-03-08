import { motion } from "framer-motion";

interface PageHeroProps {
  image?: string;
  vimeoId?: string;
  tag?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const PageHero = ({ image, vimeoId, tag, title, description, children }: PageHeroProps) => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[80vh] flex items-end overflow-hidden">
      {vimeoId ? (
        <>
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
              allow="autoplay; fullscreen"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto border-0"
              title="Hero video"
            />
          </div>
          <div className="absolute inset-0 bg-black/55 z-[1]" />
        </>
      ) : image ? (
        <div className="absolute inset-0">
          <motion.img
            src={image}
            alt=""
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ) : null}
      <div className="relative z-[2] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 pt-28 sm:pt-32 w-full">
        {tag && (
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {tag}
          </motion.span>
        )}
        <motion.h1
          className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-4 sm:mt-6 text-[15px] sm:text-lg text-cream-muted max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PageHero;