import * as React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { motion, useScroll, useTransform } from 'motion/react';

const THEME_COLORS = [
  { id: 'default', name: 'M ONE Orange', hex: '#FF6B00', filter: 'hue-rotate(0deg)' },
  { id: 'schwarz', name: 'Schwarz', hex: '#111111', filter: 'grayscale(100%) brightness(0.7)' },
  { id: 'grau', name: 'Grau', hex: '#666666', filter: 'grayscale(100%) brightness(1.2)' },
  { id: 'weiss', name: 'Weiß', hex: '#EEEEEE', filter: 'grayscale(100%) brightness(2.0)' },
];

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yDesktop = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [activeColor, setActiveColor] = React.useState(THEME_COLORS[0]);

  const videoSrc = '/videos/hero.mp4';
  const posterImage = theme === 'dark' 
    ? '/images/hero/hero_dark.webp' 
    : '/images/hero/hero_light.webp';

  return (
    <section id="hero" className={`relative flex flex-col md:block min-h-[100dvh] w-full overflow-hidden ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}>
      
      {/* ── MOBILE: STACKED LAYOUT (Top Half) ── */}
      <div className="md:hidden relative w-full h-[55vh] mt-16 bg-neutral-950 border-b border-white/5 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterImage}
          className="w-full h-full object-cover object-right transition-all duration-700 ease-out"
          style={{ filter: activeColor.filter }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        {/* Subtle bottom gradient to blend into the solid text area below */}
        <div className={`absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t ${theme === 'dark' ? 'from-neutral-950' : 'from-white'} to-transparent`} />
      </div>

      {/* ── DESKTOP: FULL BACKGROUND VIDEO ── */}
      <motion.div
        style={{ y: yDesktop, opacity }}
        className="hidden md:block absolute inset-0 w-full h-full z-0 will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterImage}
          className="w-full h-full object-cover object-right scale-105 transition-all duration-700 ease-out"
          style={{ filter: activeColor.filter }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Linear Gradient for Text Readability - ONLY ON LEFT SIDE */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: theme === 'dark' 
              ? 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 25%, rgba(10,10,10,0) 65%)'
              : 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,0) 65%)'
          }}
        />
      </motion.div>


      {/* ── CONTENT CONTAINER ── */}
      <div className={`relative z-20 flex-grow flex flex-col justify-center px-6 py-10 md:absolute md:inset-0 md:container md:mx-auto md:py-0 md:pt-20 ${theme === 'dark' ? 'bg-neutral-950 md:bg-transparent' : 'bg-white md:bg-transparent'}`}>
        
        <div className="w-full max-w-2xl text-left">
          
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

          {/* Swatches disabled for video background to keep it premium and clean, 
              or kept if we want to allow tinting the video. 
              Let's keep them as it's a cool feature, and the user didn't say to remove them. */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-4 border-t border-neutral-200 dark:border-white/10 pt-6"
          >
            <span className={`text-xs font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
              Farbvielfalt entdecken:
            </span>
            <div className="flex items-center gap-3">
              {THEME_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setActiveColor(color)}
                  onMouseEnter={() => setActiveColor(color)}
                  className={`relative w-8 h-8 rounded-full shadow-inner transition-transform duration-300 ${activeColor.id === color.id ? 'scale-110 ring-2 ring-offset-2 ring-brand-500 dark:ring-offset-neutral-950' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Show ${color.name} variant`}
                  title={color.name}
                >
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] pointer-events-none" />
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
