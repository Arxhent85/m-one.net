
import * as React from 'react';
import { CATEGORY_CONFIG } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import ImageWithFallback from './ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

const SketchGrid: React.FC = () => {
  const [activeId, setActiveId] = React.useState<string>('bau');
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const { t, getCategoryData } = useLanguage();
  const { navigateToCategory } = useNavigation();

  const categoryKeys = Object.keys(CATEGORY_CONFIG);

  return (
    <section id="categories" className="py-24 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="w-full max-w-[98%] mx-auto px-2 md:px-4">
        <div className="mb-12 container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-sans font-bold text-brand-900 dark:text-white mb-4"
          >
            {t.sections.servicesTitle}
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[600px] w-full">
          {categoryKeys.map((key) => {
            const category = getCategoryData(key);
            const isActive = activeId === key;
            const isHovered = hoveredId === key && !isActive;
            const flexClass = isActive ? 'flex-[5]' : isHovered ? 'flex-[1.25]' : 'flex-1';

            return (
              <motion.div
                key={key}
                onClick={() => {
                  if (activeId === key) {
                    navigateToCategory(key);
                  } else {
                    setActiveId(key);
                  }
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') {
                    setActiveId(key);
                    setHoveredId(key);
                  }
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === 'mouse') {
                    setHoveredId(null);
                  }
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`
                  relative 
                  overflow-hidden 
                  cursor-pointer 
                  min-w-0
                  rounded-2xl border border-neutral-200/50 dark:border-neutral-800
                  bg-brand-900
                  ${flexClass}
                  ${!isActive ? 'shadow-lg hover:shadow-xl' : 'shadow-md'}
                  transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                  group
                `}
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{
                    scale: isActive ? 1 : 1.05,
                    opacity: isActive ? 1 : 0.6
                  }}
                  whileHover={{ scale: isActive ? 1 : 1.1, opacity: isActive ? 1 : 0.7 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover object-center"
                    fallbackStrategy="picsum"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                  animate={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), rgba(0,0,0,0.4))'
                  }}
                  className="absolute inset-0"
                />

                {/* Content Container */}
                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end overflow-hidden">

                  {/* ACTIVE STATE CONTENT */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col justify-end"
                      >
                        <div className="max-w-3xl">
                          <div className="flex items-center gap-3 mb-4 text-brand-500">
                            <category.icon size={36} className="drop-shadow-sm" />
                            <span className="uppercase tracking-widest font-bold text-sm drop-shadow-sm text-brand-400">{t.modal.department}</span>
                          </div>
                          <h3 className="text-4xl md:text-6xl font-sans font-bold text-white mb-6 leading-[1.1] drop-shadow-md">
                            {category.title}
                          </h3>
                          <p className="text-neutral-200 text-sm md:text-lg mb-8 leading-relaxed border-l-[3px] border-brand-500 pl-5 drop-shadow-sm max-w-xl">
                            {category.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* INACTIVE STATE CONTENT */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {/* Desktop: Vertical Text */}
                        <div className="hidden lg:flex flex-col items-center gap-6">
                          <category.icon className="text-brand-500 drop-shadow-md group-hover:scale-110 group-hover:text-brand-400 transition-all duration-500 ease-out" size={32} />
                          <h3 className="vertical-text text-3xl font-sans font-bold text-white/90 tracking-widest uppercase rotate-180 drop-shadow-sm group-hover:text-brand-300 transition-colors duration-500 ease-out">
                            {category.title}
                          </h3>
                        </div>

                        {/* Mobile: Horizontal Text */}
                        <div className="lg:hidden flex flex-col items-center gap-2">
                          <category.icon className="text-brand-500" size={24} />
                          <h3 className="text-xl font-sans font-bold text-white/90 tracking-wider uppercase">
                            {category.title}
                          </h3>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
