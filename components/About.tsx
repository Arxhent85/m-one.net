
import * as React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';

const About: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 bg-brand-50 dark:bg-brand-900 transition-colors duration-300 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <ImageWithFallback
                src="https://picsum.photos/id/449/400/500"
                alt="Team working"
                className="rounded-2xl shadow-lg w-full h-full object-cover mt-8 hover:scale-[1.02] transition-transform duration-500"
                fallbackStrategy="picsum"
              />
              <ImageWithFallback
                src="https://picsum.photos/id/175/400/500"
                alt="Architectural detail"
                className="rounded-2xl shadow-lg w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                fallbackStrategy="picsum"
              />
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.4, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 bg-brand-500 text-white p-8 rounded-full shadow-lg hidden md:block"
            >
              <p className="font-sans font-bold text-3xl text-center leading-none drop-shadow-sm">
                28+<br />
                <span className="text-sm font-sans font-medium opacity-90">Jahre</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <motion.h4 variants={itemVariants} className="text-brand-500 font-bold uppercase tracking-wider mb-2">{t.sections.aboutTitle}</motion.h4>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-[3.5rem] font-sans font-bold text-brand-900 dark:text-white mb-6 leading-[1.1]">
              {t.sections.aboutHeading}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-brand-800 dark:text-neutral-300 text-lg mb-8 leading-relaxed">
              {t.sections.aboutText}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {t.sections.aboutList.map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <CheckCircle2 className="text-brand-500 flex-shrink-0 group-hover:scale-110 transition-all duration-300" />
                  <span className="text-brand-900 dark:text-neutral-200 font-medium group-hover:text-brand-600 dark:group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.button
              variants={itemVariants}
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
