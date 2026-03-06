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

  // Hero image selection based on theme
  const heroImage = theme === 'dark'
    ? '/images/hero/hero_dark.webp'
    : '/images/hero/hero_light.webp';

  return (
    <section
      id="hero"
      className={`relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}
    >
      {/* Visual Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <img
          src={heroImage + "?v=2"}
          alt="M-ONE Hero"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-black/60 via-black/30 to-transparent' : 'from-white/40 via-white/10 to-transparent'}`} />
      </motion.div>

      {/* Content Container with Aggressive Whitespace */}
      <div className="relative z-20 container mx-auto px-6 pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className={`inline-block px-6 py-2 mb-12 border rounded-full backdrop-blur-xl text-xs font-bold tracking-[0.2em] uppercase ${theme === 'dark'
              ? 'border-white/10 bg-white/5 text-white/60'
              : 'border-black/5 bg-black/5 text-black/60'
              }`}
          >
            {t.hero.since}
          </motion.div>

          <h1
            className={`text-6xl md:text-[8rem] lg:text-[10rem] font-sans font-black leading-[0.9] mb-12 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-neutral-950'
              }`}
          >
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
              className="block"
            >
              {t.hero.titleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
              className="block text-transparent bg-clip-text bg-gradient-to-b from-brand-500 to-brand-600"
            >
              {t.hero.titleLine2}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className={`text-xl md:text-2xl mb-16 leading-relaxed max-w-2xl font-light tracking-wide ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'
              }`}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-8"
          >
            <button
              className="group relative bg-brand-500 text-white px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t.hero.startProject}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <button
              className={`px-12 py-5 rounded-full font-bold text-lg border premium-transition ${theme === 'dark'
                ? 'border-white/10 text-white hover:bg-white/5'
                : 'border-black/10 text-neutral-900 hover:bg-black/5'
                }`}
            >
              {t.hero.references}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade for seamless scroll transition */}
      <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t ${theme === 'dark' ? 'from-neutral-950' : 'from-white'} to-transparent z-10`} />
    </section>
  );
};

export default Hero;
