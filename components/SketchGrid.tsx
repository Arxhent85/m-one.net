"use client";

import * as React from 'react';
import Link from 'next/link';
import { CATEGORY_CONFIG, getCategoryHref } from '../constants';

import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import { useTheme } from './ThemeContext';
import ImageWithFallback from './ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

const SketchGrid: React.FC = () => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const { t, getCategoryData } = useLanguage();
  const { theme } = useTheme();

  const categoryKeys = Object.keys(CATEGORY_CONFIG);

  return (
    <section id="categories" className="py-20 md:py-28 bg-brand-50 dark:bg-neutral-950 transition-colors duration-300">
      <div className="w-full max-w-[98%] mx-auto px-2 md:px-6">
        <div className="mb-10 md:mb-16 container mx-auto px-4 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-sans font-black text-brand-900 dark:text-white mb-4 tracking-tight"
          >
            {t.sections.servicesTitle}
          </motion.h2>
          <div className="w-24 h-1 bg-brand-500 rounded-full" />
        </div>

        {/* ═══════════════ MOBILE: 2×2 Tile Dashboard ═══════════════ */}
        <div className="lg:hidden grid grid-cols-2 gap-4 px-2">
          {categoryKeys.map((key) => {
            const category = getCategoryData(key);
            const config = CATEGORY_CONFIG[key as keyof typeof CATEGORY_CONFIG];

            return (
              <Link key={key} href={getCategoryHref(key)}>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col h-full overflow-hidden rounded-2xl cursor-pointer group active:scale-[0.97] transition-all duration-300 shadow-lg ${theme === 'dark' ? 'bg-neutral-900 shadow-black/40' : 'bg-white shadow-neutral-200/50'}`}
                  style={{ aspectRatio: '1 / 1.15' }}
                >
                  {/* Unmasked Product Photography — Top 75% */}
                  <div className="relative h-[75%] w-full overflow-hidden bg-white dark:bg-neutral-800">
                    <ImageWithFallback
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      fallbackStrategy="picsum"
                      loading="lazy"
                    />
                  </div>

                  {/* Solid White/Dark Content Area — Bottom 25% */}
                  <div className="flex-grow px-4 py-3 flex items-center justify-between border-t border-neutral-100 dark:border-white/5">
                    <div className="flex items-center gap-2">
                      <config.icon size={16} className={`${theme === 'dark' ? 'text-white' : 'text-neutral-900'} group-hover:text-brand-500 transition-colors`} />
                      <h3 className={`text-xs font-sans font-bold tracking-[0.15em] uppercase ${theme === 'dark' ? 'text-white' : 'text-neutral-900'} group-hover:text-brand-500 transition-colors`}>
                        {category.title}
                      </h3>
                    </div>
                    <ChevronRight size={16} className="text-neutral-400 group-hover:text-brand-500 transition-colors" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* ═══════════════ DESKTOP: Dynamic 4-Column Display ═══════════════ */}
        <div className="hidden lg:flex flex-row justify-center gap-6 h-[650px] w-full max-w-[1600px] mx-auto">
          {categoryKeys.map((key) => {
            const category = getCategoryData(key);
            const config = CATEGORY_CONFIG[key as keyof typeof CATEGORY_CONFIG];
            const isHovered = hoveredId === key;

            return (
              <Link key={key} href={getCategoryHref(key)} className="block h-full" style={{ flex: isHovered ? 1.6 : (hoveredId && !isHovered) ? 0.8 : 1, transition: 'flex 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
                <motion.div
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setHoveredId(key);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setHoveredId(null);
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`
                    relative h-full
                    flex flex-col 
                    overflow-hidden 
                    cursor-pointer 
                    min-w-0
                    rounded-3xl border border-neutral-200/50 dark:border-white/5
                    ${theme === 'dark' ? 'bg-neutral-900 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]' : 'bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]'}
                    group
                    will-change-[flex]
                  `}
                >
                  {/* Background Image — Unmasked, GPU-accelerated */}
                  <div className="relative flex-grow overflow-hidden bg-white dark:bg-neutral-800">
                    <motion.div
                      className="absolute inset-0 w-full h-full will-change-transform"
                      animate={{
                        scale: isHovered ? 1.05 : 1,
                        filter: isHovered ? 'brightness(1.05) saturate(1.1)' : 'brightness(1.0) saturate(1.0)',
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ImageWithFallback
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover object-center"
                        fallbackStrategy="picsum"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>

                  {/* Content — Solid Block at Bottom (No Glassmorphism) */}
                  <div
                    className={`relative z-10 w-full border-t flex flex-col justify-end
                    ${theme === 'dark' ? 'bg-neutral-900 border-white/5' : 'bg-white border-neutral-100'} 
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                    style={{
                      padding: isHovered ? '2rem' : '1.5rem',
                      minHeight: isHovered ? '14rem' : '5rem'
                    }}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {/* Always visible header */}
                        <div className="flex items-center gap-3">
                          <config.icon
                            size={isHovered ? 28 : 22}
                            className={`transition-all duration-500 ${isHovered ? 'text-brand-500' : (theme === 'dark' ? 'text-white' : 'text-neutral-900')}`}
                          />
                          <h3 className={`font-sans font-bold tracking-[0.15em] uppercase transition-all duration-500 
                            ${isHovered ? 'text-xl text-brand-500' : (theme === 'dark' ? 'text-base text-white' : 'text-base text-neutral-900')}`
                          }>
                            {category.title}
                          </h3>
                          <ArrowUpRight
                            size={20}
                            className={`ml-auto transition-all duration-500 
                              ${isHovered ? 'text-brand-500 opacity-100 translate-x-0' : 'text-neutral-400 opacity-0 -translate-x-4'}`
                            }
                          />
                        </div>

                        {/* Expand on hover: description */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                              className={`text-sm leading-relaxed max-w-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}
                            >
                              {category.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Animated Orange Line bottom border */}
                      <div
                        className="absolute bottom-0 left-0 h-1 bg-brand-500 transition-all duration-700 ease-out"
                        style={{ width: isHovered ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SketchGrid;
