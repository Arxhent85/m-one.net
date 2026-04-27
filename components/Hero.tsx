"use client";

import * as React from 'react';
import { ArrowRight, BrickWall, Wrench, SprayCan, Sparkles, Hand } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence, PanInfo } from 'motion/react';
import ImageWithFallback from './ImageWithFallback';

const SLIDES = [
  { id: 'bau', name: 'Bau', icon: BrickWall, darkImg: '/images/hero/slideshow/HeroSilikonDunkel.png', lightImg: '/images/hero/slideshow/HeroSilikonHell.PNG', slug: '/produkte/bau' },
  { id: 'service', name: 'Service & KFZ', icon: Wrench, darkImg: '/images/hero/slideshow/HeroServiceDunkel.PNG', lightImg: '/images/hero/slideshow/HeroServiceHell.PNG', slug: '/produkte/service--kfz' },
  { id: 'colors', name: 'Colors', icon: SprayCan, darkImg: '/images/hero/slideshow/HeroColorDunkel.png', lightImg: '/images/hero/slideshow/HeroColorHell.png', slug: '/produkte/colors' },
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, darkImg: '/images/hero/slideshow/HeroCleanDunkel.PNG', lightImg: '/images/hero/slideshow/HeroCleanHell.PNG', slug: '/produkte/cleaning' },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yDesktop = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const { t } = useLanguage();
  const { theme, setIsHeroVideoActive } = useTheme();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [videoEnded, setVideoEnded] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  // Sync internal video state with global theme context
  React.useEffect(() => {
    setIsHeroVideoActive(!videoEnded);
    // Cleanup on unmount to reset global video state
    return () => setIsHeroVideoActive(false);
  }, [videoEnded, setIsHeroVideoActive]);

  // Restore the video variables.
  const videoSrc = '/videos/HeroVideoFinal.mp4';

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setHasInteracted(true);
    let nextSlide = currentSlide + newDirection;
    if (nextSlide < 0) nextSlide = SLIDES.length - 1;
    if (nextSlide >= SLIDES.length) nextSlide = 0;
    setCurrentSlide(nextSlide);
  };

  const handleDragEnd = (e: Event, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const router = useRouter();
  const slide = SLIDES[currentSlide];

  const handleHeroClick = (e: React.MouseEvent) => {
    // Only navigate if we clicked the background, not buttons or specific interactive elements
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    if (videoEnded) {
      router.push(slide.slug);
    } else {
      document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Variants for desktop & mobile
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <section 
      id="hero" 
      onClick={handleHeroClick}
      className={`relative flex flex-col md:block min-h-[100dvh] w-full overflow-hidden cursor-pointer ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}
    >
      {/* ── IMAGE PRELOADER (Hidden) ── */}
      <div className="hidden pointer-events-none" aria-hidden="true">
        {SLIDES.map((s, idx) => (
          <React.Fragment key={s.id}>
            {/* We render next/previous images to trigger browser cache */}
            {idx !== currentSlide && (
              <>
                <img src={s.darkImg} alt="" />
                <img src={s.lightImg} alt="" />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* ── MOBILE: STACKED LAYOUT (Top Half) ── */}
      <div className="md:hidden relative w-full h-[55vh] mt-16 bg-neutral-950 border-b border-white/5 overflow-hidden">
        
        {/* Slideshow background (visible underneath or after video) */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide + theme}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <ImageWithFallback
              src={theme === 'dark' ? slide.darkImg : slide.lightImg}
              alt={`M-ONE ${slide.name}`}
              priority={true}
              className="w-full h-full pointer-events-none"
              imgClassName="w-full h-full object-cover object-right"
            />
          </motion.div>
        </AnimatePresence>

        {/* Swipe Hint Animation */}
        {videoEnded && !hasInteracted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, x: [-10, 10, -10] }}
            transition={{ opacity: { delay: 2, duration: 1 }, x: { repeat: Infinity, duration: 2 } }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-black/50 text-white' : 'bg-white/50 text-black'} backdrop-blur-sm`}>
              <Hand size={24} className="animate-pulse" />
              <span className="sr-only">Swipe to explore</span>
            </div>
          </motion.div>
        )}

        {/* Overlay Initial Video */}
        <AnimatePresence>
          {!videoEnded && (
            <motion.video
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setVideoEnded(true)}
              onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 2.0; }}
              className="absolute inset-0 w-full h-full object-cover object-center z-20 pointer-events-none"
            >
              <source src={videoSrc} type="video/mp4" />
            </motion.video>
          )}
        </AnimatePresence>

        {/* Subtle bottom gradient */}
        <div className={`absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t ${theme === 'dark' ? 'from-neutral-950' : 'from-white/60'} to-transparent z-10 pointer-events-none`} />

        {/* ── PAGINATION DOTS (MOBILE) ── */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-6 left-0 right-0 z-30 flex flex-col items-center justify-center gap-2 pointer-events-none"
            >
              {/* Optional: we omit the text "Produktvielfalt..." on mobile to keep it cleaner, as requested for a subtle look. */}
              <div className="flex items-center gap-3 bg-black/20 dark:bg-black/60 shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/10 pointer-events-auto">
                {SLIDES.map((slideItem, index) => {
                  const Icon = slideItem.icon;
                  const isActive = currentSlide === index;
                  return (
                    <button
                      key={slideItem.id}
                      onClick={() => {
                        setDirection(index > currentSlide ? 1 : -1);
                        setCurrentSlide(index);
                        setHasInteracted(true);
                      }}
                      className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 ease-out flex-shrink-0 ${
                        isActive 
                          ? 'bg-brand-500 text-white scale-110 shadow-[0_4px_16px_-4px_rgba(255,107,0,0.6)]' 
                          : theme === 'dark'
                            ? 'bg-transparent text-white/60 hover:bg-white/10 hover:text-white'
                            : 'bg-transparent text-white/80 hover:bg-black/20 hover:text-white'
                      }`}
                      aria-label={`Show ${slideItem.name} variant`}
                    >
                      <Icon size={isActive ? 18 : 16} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-500" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ── DESKTOP: FULL BACKGROUND ── */}
      <motion.div
        style={{ y: yDesktop, opacity }}
        className="hidden md:block absolute inset-0 w-full h-full z-0 will-change-transform"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide + theme}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <ImageWithFallback
              src={theme === 'dark' ? slide.darkImg : slide.lightImg}
              alt={`M-ONE ${slide.name}`}
              priority={true}
              className="w-full h-full pointer-events-none"
              imgClassName="w-full h-full object-cover object-right scale-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Initial Video */}
        <AnimatePresence>
          {!videoEnded && (
            <motion.video
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setVideoEnded(true)}
              onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 2.0; }}
              className="absolute inset-0 w-full h-full object-cover object-right scale-105 z-20 pointer-events-none"
            >
              <source src={videoSrc} type="video/mp4" />
            </motion.video>
          )}
        </AnimatePresence>

        {/* Swipe Hint Animation Desktop */}
        {videoEnded && !hasInteracted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6, x: [-15, 15, -15] }}
            transition={{ opacity: { delay: 2, duration: 1.5 }, x: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
            className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10"
          >
            <div className={`p-4 rounded-full ${theme === 'dark' ? 'bg-black/40 text-white/80' : 'bg-white/40 text-black/80'} backdrop-blur-sm shadow-xl`}>
              <Hand size={32} />
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs font-bold tracking-widest uppercase text-center whitespace-nowrap">Wischen</div>
            </div>
          </motion.div>
        )}
        
        {/* Linear Gradient for Text Readability */}
        <AnimatePresence>
          {videoEnded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: theme === 'dark' 
                  ? 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.8) 45%, rgba(10,10,10,0) 65%)'
                  : 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0) 65%)'
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── CONTENT CONTAINER (MOBILE - Always Visible) ── */}
      <div className={`relative z-20 flex-grow flex md:hidden flex-col justify-center px-6 py-10 pointer-events-none ${theme === 'dark' ? 'bg-neutral-950' : 'bg-white'}`}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="w-full max-w-2xl text-left pointer-events-auto"
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
          <h1 className={`text-5xl sm:text-6xl font-sans font-black leading-[0.95] mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
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
            className={`text-base mb-10 leading-relaxed font-light ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-4 mb-12 border-b border-transparent pb-6" 
          >
            {/* Primary CTA */}
            <button className="group relative bg-brand-500 text-white px-8 py-4 rounded-full font-bold text-sm overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(255,107,0,0.5)] active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.hero.startProject}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* Secondary CTA */}
            <button className={`px-8 py-4 rounded-full font-bold text-sm border transition-all duration-300 active:scale-95 ${theme === 'dark'
                ? 'border-white/20 text-white/90 hover:bg-white/10'
                : 'border-black/20 text-neutral-800 hover:bg-black/5'
                }`}
            >
              {t.hero.references}
            </button>
          </motion.div>

        </motion.div>
      </div>

      {/* ── CONTENT CONTAINER (DESKTOP - Visible After Video) ── */}
      <div className={`hidden md:flex absolute inset-0 z-20 container flex-col justify-center mx-auto pointer-events-none`}>
        <AnimatePresence>
          {videoEnded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="w-full max-w-2xl text-left pointer-events-auto"
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
              <h1 className={`md:text-7xl lg:text-[5.5rem] font-sans font-black leading-[0.95] mb-6 tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-neutral-950'}`}>
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
                className={`md:text-lg lg:text-xl mb-10 leading-relaxed font-light ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'}`}
              >
                {t.hero.subtitle}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-row gap-4 mb-12" 
              >
                {/* Primary CTA */}
                <button className="group relative bg-brand-500 text-white px-8 py-5 rounded-full font-bold text-base overflow-hidden transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(255,107,0,0.5)] hover:shadow-[0_16px_36px_-8px_rgba(255,107,0,0.6)] hover:-translate-y-0.5">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t.hero.startProject}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>

                {/* Secondary CTA */}
                <button className={`px-8 py-5 rounded-full font-bold text-base border transition-all duration-300 ${theme === 'dark'
                    ? 'border-white/20 text-white/90 hover:bg-white/10'
                    : 'border-black/20 text-neutral-800 hover:bg-black/5'
                    }`}
                >
                  {t.hero.references}
                </button>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── PAGINATION DOTS (DESKTOP) ── */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden md:flex absolute bottom-8 left-0 right-0 z-30 flex-col items-center justify-center gap-3 pointer-events-none"
          >
            <span className={`text-[10px] font-bold tracking-[0.2em] uppercase blur-[0.3px] ${theme === 'dark' ? 'text-white/60' : 'text-neutral-500'} ${hasInteracted ? 'opacity-0' : 'opacity-100'} transition-opacity duration-[2000ms]`}>
              Produktvielfalt entdecken
            </span>
            <div className="flex items-center gap-4 bg-black/20 dark:bg-black/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 pointer-events-auto">
              {SLIDES.map((slideItem, index) => {
                const Icon = slideItem.icon;
                const isActive = currentSlide === index;
                return (
                  <button
                    key={slideItem.id}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1);
                      setCurrentSlide(index);
                      setHasInteracted(true);
                    }}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-full transition-all duration-500 ease-out flex-shrink-0 ${
                      isActive 
                        ? 'bg-brand-500 text-white scale-110 shadow-[0_4px_20px_-4px_rgba(255,107,0,0.6)]' 
                        : theme === 'dark'
                          ? 'bg-transparent text-white/40 hover:bg-white/10 hover:text-white'
                          : 'bg-transparent text-white hover:bg-black/20 hover:text-white'
                    }`}
                    aria-label={`Show ${slideItem.name} variant`}
                    title={slideItem.name}
                  >
                    <Icon size={isActive ? 22 : 18} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-500" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
