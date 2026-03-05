import * as React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-brand-900 border-t border-brand-800 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
        >

          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <img
                src="/logos/M-ONE_logo_Lang_weiss.webp"
                alt="M-ONE Logo"
                style={{ height: '36px', width: 'auto' }}
                className="object-contain block"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('span');
                  fallback.className = 'text-2xl font-sans font-bold text-white tracking-widest';
                  fallback.textContent = 'M ONE';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </div>
            <p className="text-neutral-400 mb-6">
              {t.footer.text}
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={i}
                  href="#"
                  className="bg-brand-950 hover:bg-brand-500 p-2 rounded-full transition-colors duration-300"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 font-sans tracking-wide text-brand-500">{t.footer.company}</h3>
            <ul className="space-y-3 text-neutral-400">
              <li><a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{t.nav.services}</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">{t.footer.projects}</a></li>
              <li><a href="#career" className="hover:text-white transition-colors">{t.footer.career}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{t.nav.contact}</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 font-sans tracking-wide text-brand-500">{t.footer.legal}</h3>
            <ul className="space-y-3 text-neutral-400">
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.imprint}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 font-sans tracking-wide text-brand-500">{t.nav.contact}</h3>
            <ul className="space-y-4 text-neutral-400">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-brand-500" size={20} />
                <span>Musterstraße 123<br />10115 Berlin</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-brand-500" size={20} />
                <span>+49 (0) 30 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-brand-500" size={20} />
                <span>info@m-one-gmbh.de</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-brand-800/50 pt-8 text-center text-neutral-400 text-sm"
        >
          <p>&copy; {new Date().getFullYear()} {t.footer.rights}</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
