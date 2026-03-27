
import * as React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';

const About: React.FC = () => {
  const { t } = useLanguage();

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-brand-50 dark:bg-brand-900 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Centered Headline — Generous Negative Space ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <h4 className="text-brand-500 font-bold uppercase tracking-[0.3em] mb-4 text-xs">
            {t.sections.aboutTitle}
          </h4>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-black text-brand-900 dark:text-white leading-[1.05] tracking-tight">
            {t.sections.aboutHeading}
          </h2>
        </motion.div>

        {/* ── Multi-Image Grid — Uniform, Rounded, Balanced ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-16 md:mb-20"
        >
          {/* Image 1 — Precision Silicone Application */}
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] col-span-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=600"
              alt="Precision Craftsmanship"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              fallbackStrategy="unsplash"
            />
          </div>
          {/* Image 2 — Automotive Premium Finish */}
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] col-span-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600"
              alt="Premium Automotive Finish"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              fallbackStrategy="unsplash"
            />
          </div>
          {/* Image 3 — High-Tech Factory / hidden on mobile */}
          <div className="relative overflow-hidden rounded-xl aspect-[4/3] col-span-2 md:col-span-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
              alt="High-Tech Manufacturing"
              className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
              fallbackStrategy="unsplash"
            />
          </div>
        </motion.div>

        {/* ── Description + Feature Grid ── */}
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-brand-800 dark:text-neutral-300 text-lg md:text-xl mb-10 leading-relaxed text-center max-w-3xl mx-auto"
          >
            {t.sections.aboutText}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ staggerChildren: 0.08 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-10"
          >
            {t.sections.aboutList.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3 group"
              >
                <CheckCircle2 className="text-brand-500 flex-shrink-0 group-hover:scale-110 transition-all duration-300" size={18} />
                <span className="text-brand-900 dark:text-neutral-200 font-medium text-sm group-hover:text-brand-600 dark:group-hover:text-white transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              {t.sections.teamButton}
            </motion.button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;
