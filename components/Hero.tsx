import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { motion, useScroll, useTransform } from 'motion/react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { t } = useLanguage();
  const { theme } = useTheme();

  const heroImage = theme === 'dark'
    ? '/images/hero/hero_dark.webp'
    : '/images/hero/hero_light.webp';

  return (
    <section
      id="hero"
      className={`relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}
    >
      {/* Background Desktop — 100% bright, NO overlay */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 hidden md:block will-change-transform"
      >
        <img
          src={heroImage + "?v=2"}
          alt="M-ONE Hero"
          className="w-full h-full object-cover object-center scale-110"
        />
      </motion.div>

      {/* Background Mobile — 100% bright, NO overlay */}
      <div className="absolute -inset-[2px] z-0 md:hidden overflow-hidden">
        <img
          src={heroImage + "?v=4"}
          alt="M-ONE Hero"
          className="absolute top-0 right-[-10%] sm:right-0 h-full w-auto max-w-none"
        />
      </div>

      {/* Compact Localized Glass Panel — minimal footprint */}
      <div className="relative z-20 container mx-auto px-4 pt-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="hero-glass-panel px-6 py-8 md:px-12 md:py-10 inline-flex flex-col items-center text-center max-w-2xl"
        >
          {/* Badge */}
          <div
            className={`inline-block px-5 py-1.5 mb-6 border rounded-full text-[10px] font-bold tracking-[0.25em] uppercase ${theme === 'dark'
              ? 'border-white/10 bg-white/5 text-white/50'
              : 'border-black/5 bg-black/5 text-black/50'
              }`}
          >
            {t.hero.since}
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-black leading-[0.9] mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}
          >
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
              className="block"
            >
              {t.hero.titleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-500 to-brand-600"
            >
              {t.hero.titleLine2}
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-base md:text-lg mb-8 leading-relaxed max-w-lg font-light tracking-wide ${theme === 'dark' ? 'text-white/65' : 'text-neutral-500'}`}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary — Solid Electric Orange */}
            <button
              className="group relative bg-brand-500 text-white px-10 py-4 rounded-full font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_16px_36px_-8px_rgba(255,107,0,0.5)] hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.startProject}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Secondary — Frosted Outline */}
            <button
              className={`px-10 py-4 rounded-full font-bold text-base border backdrop-blur-md transition-all duration-300 ${theme === 'dark'
                ? 'border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/25'
                : 'border-black/10 bg-black/5 text-neutral-700 hover:bg-black/10 hover:border-black/20'
                }`}
            >
              {t.hero.references}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t ${theme === 'dark' ? 'from-neutral-950' : 'from-white'} to-transparent z-10`} />
    </section>
  );
};

export default Hero;
