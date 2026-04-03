import * as React from 'react';
import { ArrowRight, BrickWall, Wrench, SprayCan, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import ImageWithFallback from './ImageWithFallback';

const SLIDES = [
  { id: 'bau', name: 'Bau', icon: BrickWall, darkImg: '/images/hero/slideshow/HeroSilikonDunkel.png', lightImg: '/images/hero/slideshow/HeroSilikonHell.PNG' },
  { id: 'service', name: 'Service & KFZ', icon: Wrench, darkImg: '/images/hero/slideshow/HeroServiceDunkel.PNG', lightImg: '/images/hero/slideshow/HeroServiceHell.PNG' },
  { id: 'colors', name: 'Colors', icon: SprayCan, darkImg: '/images/hero/slideshow/HeroColorDunkel.png', lightImg: '/images/hero/slideshow/HeroColorHell.png' },
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, darkImg: '/images/hero/slideshow/HeroCleanDunkel.PNG', lightImg: '/images/hero/slideshow/HeroCleanHell.PNG' },
];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yDesktop = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  // Auto-advance slideshow
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section id="hero" className={`relative flex flex-col md:block min-h-[100dvh] w-full overflow-hidden ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}>
      
      {/* ── MOBILE: STACKED LAYOUT (Top Half) ── */}
      <div className="md:hidden relative w-full h-[55vh] mt-16 bg-neutral-950 border-b border-white/5 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide + theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={theme === 'dark' ? slide.darkImg : slide.lightImg}
              alt={`M-ONE ${slide.name}`}
              priority={true}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover object-right"
            />
          </motion.div>
        </AnimatePresence>

        {/* Subtle bottom gradient */}
        <div className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t ${theme === 'dark' ? 'from-neutral-950' : 'from-white'} to-transparent z-10`} />
      </div>

      {/* ── DESKTOP: FULL BACKGROUND ── */}
      <motion.div
        style={{ y: yDesktop, opacity }}
        className="hidden md:block absolute inset-0 w-full h-full z-0 will-change-transform"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide + theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={theme === 'dark' ? slide.darkImg : slide.lightImg}
              alt={`M-ONE ${slide.name}`}
              priority={true}
              className="w-full h-full"
              imgClassName="w-full h-full object-cover object-right scale-105"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Linear Gradient for Text Readability */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 25%, rgba(10,10,10,0) 65%)'
              : 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0) 65%)'
          }}
        />
      </motion.div>

      {/* ── CONTENT CONTAINER ── */}
      <div className={`relative z-20 flex-grow flex flex-col justify-center px-6 py-10 md:absolute md:inset-0 md:container md:mx-auto md:py-0 md:pt-20 ${theme === 'dark' ? 'bg-neutral-950 md:bg-transparent' : 'bg-white md:bg-transparent'}`}>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="w-full max-w-2xl text-left"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block px-4 py-1.5 mb-6 border rounded-full text-[10px] font-bold tracking-[0.25em] uppercase ${theme === 'dark'
              ? 'border-white/10 bg-white/5 text-white/60'
              : 'border-black/10 bg-black/5 text-neutral-500'
              }`}
          >
            {t.hero.since}
          </motion.div>

          {/* Headline */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-black leading-[0.95] mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              {t.hero.titleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-400 py-1"
            >
              {t.hero.titleLine2}
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-base md:text-lg lg:text-xl mb-10 leading-relaxed font-light ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {/* Primary CTA */}
            <button className="group relative bg-brand-500 text-white px-8 py-4 md:py-5 rounded-full font-bold text-sm md:text-base overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(255,107,0,0.5)] hover:shadow-[0_16px_36px_-8px_rgba(255,107,0,0.6)] hover:-translate-y-0.5">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.hero.startProject}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Secondary CTA */}
            <button className={`px-8 py-4 md:py-5 rounded-full font-bold text-sm md:text-base border transition-all duration-300 ${theme === 'dark'
                ? 'border-white/20 text-white/90 hover:bg-white/10'
                : 'border-black/20 text-neutral-800 hover:bg-black/5'
                }`}
            >
              {t.hero.references}
            </button>
          </motion.div>

          {/* Produktvielfalt */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-4 border-t border-neutral-200 dark:border-white/10 pt-6"
          >
            <span className={`text-xs font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Produktvielfalt entdecken:
            </span>
            <div className="flex items-center gap-3">
              {SLIDES.map((slideItem, index) => {
                const Icon = slideItem.icon;
                const isActive = currentSlide === index;
                return (
                  <button
                    key={slideItem.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-brand-500 text-white scale-110 shadow-lg' 
                        : theme === 'dark'
                          ? 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                          : 'bg-black/5 text-black/50 hover:bg-black/10 hover:text-black'
                    }`}
                    aria-label={`Show ${slideItem.name} variant`}
                    title={slideItem.name}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
