import * as React from 'react';
import { Menu, X, Search, Globe, Moon, Sun } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import SearchOverlay from './SearchOverlay';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { useNavigation } from './NavigationContext';
import ImageWithFallback from './ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { currentPage, goHome } = useNavigation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (currentPage !== 'home') {
      goHome();
      // Delay scrolling to allow render
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const LanguageSwitcher = () => (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <button
        onClick={() => setLanguage('de')}
        className={`${language === 'de' ? 'text-brand-500' : 'text-brand-900/70 hover:text-brand-900 dark:text-white/70 dark:hover:text-white'} transition-colors`}
      >
        DE
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`${language === 'en' ? 'text-brand-500' : 'text-brand-900/70 hover:text-brand-900 dark:text-white/70 dark:hover:text-white'} transition-colors`}
      >
        EN
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => setLanguage('sq')}
        className={`${language === 'sq' ? 'text-brand-500' : 'text-brand-900/70 hover:text-brand-900 dark:text-white/70 dark:hover:text-white'} transition-colors`}
      >
        SQ
      </button>
    </div>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || currentPage !== 'home' ? 'glass-panel py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={goHome}>
            <img
              src={theme === 'light'
                ? "/logos/M-ONE_logo_Lang_schwarz.webp"
                : "/logos/M-ONE_logo_Lang_weiss.webp"}
              alt="M-ONE Logo"
              style={{ height: '40px', width: 'auto' }}
              className="object-contain block transition-all duration-300"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`font-medium transition-colors hover:text-brand-500 ${theme === 'light' ? 'text-brand-900' : 'text-white/90'}`}
              >
                {t.nav[link.id as keyof typeof t.nav]}
              </a>
            ))}

            <div className="flex items-center gap-4 ml-4">
              {/* Language Switcher Desktop */}
              <LanguageSwitcher />

              {/* Theme Toggle Desktop */}
              <button
                onClick={toggleTheme}
                className={`transition-colors hover:text-brand-500 ${theme === 'light' ? 'text-brand-900' : 'text-white'}`}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Search Button Desktop */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors p-2 hover:text-brand-500 ${theme === 'light' ? 'text-brand-900' : 'text-white'}`}
              aria-label={t.nav.searchLabel}
            >
              <Search size={22} />
            </button>

            <button className="btn-primary py-2 px-5 text-sm rounded-full">
              {t.nav.requestQuote}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className={`transition-colors hover:text-brand-500 ${theme === 'light' ? 'text-brand-900' : 'text-white'}`}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Search Button Mobile */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`transition-colors hover:text-brand-500 ${theme === 'light' ? 'text-brand-900' : 'text-white'}`}
              aria-label={t.nav.searchLabel}
            >
              <Search size={24} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="text-brand-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full glass-panel flex flex-col p-6 gap-6 md:hidden overflow-hidden"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="text-lg font-medium text-brand-900 dark:text-brand-200 hover:text-brand-500 dark:hover:text-brand-400"
                >
                  {t.nav[link.id as keyof typeof t.nav]}
                </a>
              ))}

              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-between">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium text-sm">Language / Sprache / Gjuha</span>
                <div className="flex gap-4">
                  <button onClick={() => setLanguage('de')} className={`font-bold ${language === 'de' ? 'text-brand-500' : 'text-neutral-400'}`}>DE</button>
                  <button onClick={() => setLanguage('en')} className={`font-bold ${language === 'en' ? 'text-brand-500' : 'text-neutral-400'}`}>EN</button>
                  <button onClick={() => setLanguage('sq')} className={`font-bold ${language === 'sq' ? 'text-brand-500' : 'text-neutral-400'}`}>SQ</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
