
import * as React from 'react';
import { CATEGORY_CONFIG } from '../constants';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import { useTheme } from './ThemeContext';
import ImageWithFallback from './ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

const SketchGrid: React.FC = () => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const { t, getCategoryData } = useLanguage();
  const { navigateToCategory } = useNavigation();
  const { theme } = useTheme();

  const categoryKeys = Object.keys(CATEGORY_CONFIG);

  return (
    <section id="categories" className="py-20 md:py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="w-full max-w-[98%] mx-auto px-2 md:px-4">
        <div className="mb-10 md:mb-12 container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-sans font-bold text-brand-900 dark:text-white mb-4"
          >
            {t.sections.servicesTitle}
          </motion.h2>
        </div>

        {/* ═══════════════ MOBILE: 2×2 Tile Dashboard ═══════════════ */}
        <div className="lg:hidden grid grid-cols-2 gap-3 px-2">
          {categoryKeys.map((key) => {
            const category = getCategoryData(key);
            const config = CATEGORY_CONFIG[key as keyof typeof CATEGORY_CONFIG];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigateToCategory(key)}
                className="relative overflow-hidden rounded-xl cursor-pointer group active:scale-[0.98] transition-transform duration-200"
                style={{ aspectRatio: '1 / 1.15' }}
              >
                {/* Product Photography — 80% fill */}
                <div className="absolute inset-0 w-full h-full">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center saturate-[1.1] brightness-[1.05] contrast-[1.05]"
                    fallbackStrategy="picsum"
                  />
                </div>

                {/* Solid Dark Text Band at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 category-tile-band px-3 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <config.icon size={16} className="text-brand-500" />
                    <h3 className="text-sm font-sans font-bold text-white tracking-wider uppercase">
                      {category.title}
                    </h3>
                  </div>
                  <ChevronRight size={16} className="text-white/50" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══════════════ DESKTOP: Dynamic 4-Column Display ═══════════════ */}
        <div className="hidden lg:flex flex-row gap-3 h-[600px] w-full">
          {categoryKeys.map((key) => {
            const category = getCategoryData(key);
            const config = CATEGORY_CONFIG[key as keyof typeof CATEGORY_CONFIG];
            const isHovered = hoveredId === key;

            return (
              <motion.div
                key={key}
                onClick={() => navigateToCategory(key)}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setHoveredId(key);
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === 'mouse') setHoveredId(null);
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                animate={{
                  flex: isHovered ? 1.5 : (hoveredId && !isHovered) ? 0.85 : 1
                }}
                className={`
                  relative 
                  overflow-hidden 
                  cursor-pointer 
                  min-w-0
                  rounded-2xl border border-neutral-200/30 dark:border-neutral-800
                  bg-brand-900
                  shadow-lg hover:shadow-2xl
                  group
                  will-change-[flex]
                `}
                style={{
                  transition: 'box-shadow 0.5s cubic-bezier(0.16,1,0.3,1)'
                }}
              >
                {/* Background Image — GPU-accelerated scale */}
                <motion.div
                  className="absolute inset-0 w-full h-full will-change-transform"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'brightness(1.0) saturate(1.1)',
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center"
                    fallbackStrategy="picsum"
                  />
                </motion.div>

                {/* Content — Frosted Glass at Bottom */}
                <div className="absolute inset-0 flex flex-col justify-end overflow-hidden">
                  <motion.div
                    className="category-glass-panel overflow-hidden"
                    animate={{
                      paddingTop: isHovered ? '1.5rem' : '0.875rem',
                      paddingBottom: isHovered ? '1.5rem' : '0.875rem',
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-5 md:px-6">
                      {/* Always visible: icon + title */}
                      <div className="flex items-center gap-3 mb-0">
                        <config.icon
                          size={isHovered ? 24 : 20}
                          className="text-brand-500 transition-all duration-500"
                        />
                        <h3 className={`font-sans font-bold text-white tracking-wider uppercase transition-all duration-500 ${isHovered ? 'text-xl' : 'text-base'}`}>
                          {category.title}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          className={`ml-auto text-white/40 group-hover:text-brand-400 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                        />
                      </div>

                      {/* Expand on hover: description */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="text-neutral-300 text-sm leading-relaxed border-l-2 border-brand-500 pl-4 max-w-sm"
                          >
                            {category.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SketchGrid;
