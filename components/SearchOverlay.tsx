"use client";

import * as React from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import { useTheme } from './ThemeContext';
import ImageWithFallback from './ImageWithFallback';
import { getProductScale, getProductPadding } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface Product {
  name: string;
  image: string;
  description?: string;
  categoryName?: string;
  colors?: string[];
  tags?: string[];
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { t, getAllProducts } = useLanguage();
  const { navigateToProduct } = useNavigation();
  const { theme } = useTheme();

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Search Logic
  const results = React.useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const allProducts = getAllProducts();

    const resultsWithScore = allProducts.map(product => {
      let score = 0;
      const name = product.name.toLowerCase();
      const description = (product.description || '').toLowerCase();
      const colors = (product.colors || []).map((c: string) => c.toLowerCase());
      const tags = (product.tags || []).map((t: string) => t.toLowerCase());

      // 1. Name Match (Highest priority)
      if (name.includes(searchTerm)) {
        score += 150;
        if (name.startsWith(searchTerm)) score += 50;
      }

      // 2. Tag Match (High priority)
      const tagMatch = tags.some((tag: string) => tag.includes(searchTerm));
      if (tagMatch) {
        score += 100;
        // Exact tag match bonus
        if (tags.includes(searchTerm)) score += 30;
      }

      // 3. Color Match (High priority)
      const colorMatch = colors.some((color: string) => color.includes(searchTerm));
      if (colorMatch) {
        score += 90;
        // Exact color match bonus
        if (colors.includes(searchTerm)) score += 40;
      }

      // 4. Description Match (Lower priority)
      if (description.includes(searchTerm)) {
        score += 40;
      }

      return { ...product, score };
    });

    return resultsWithScore
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query, getAllProducts]);

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl flex flex-col transition-colors duration-300"
        >
          {/* Header / Input Area */}
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-end mb-8">
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={32} className="text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>

            <div className="max-w-4xl mx-auto w-full relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400" size={32} />
              <input
                ref={inputRef}
                type="text"
                placeholder={t.search.placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-neutral-200 dark:border-neutral-700 py-4 pl-12 pr-4 text-3xl md:text-5xl font-sans font-bold text-brand-900 dark:text-white focus:outline-none focus:border-brand-500 placeholder:text-neutral-300 dark:placeholder:text-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-grow overflow-y-auto px-6 pb-20">
            <div className="container mx-auto max-w-6xl">
              {query.trim() === '' ? (
                <motion.div
                  key="empty-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-20 text-neutral-400 dark:text-neutral-500"
                >
                  <p className="text-lg">{t.search.startTyping}</p>
                </motion.div>
              ) : results.length > 0 ? (
                <motion.div
                  key="results-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-12"
                >
                  {results.map((product, index) => (
                    <Link
                      key={index}
                      href={`/produkte/${product.categorySlug}/${product.slug}`}
                      onClick={() => onClose()}
                      className="group flex flex-col h-full bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 hover:border-brand-500/30 dark:hover:border-brand-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-col h-full"
                      >
                      <div className="relative overflow-hidden rounded-t-xl bg-neutral-50 dark:bg-neutral-100 aspect-[3/4] shrink-0 border-b border-neutral-100 dark:border-neutral-700">
                        <ImageWithFallback
                          src={product.image.includes('/products/colors/')
                            ? product.image.replace('-hell.webp', `-${theme === 'light' ? 'hell' : 'dunkel'}.webp`)
                            : product.image}
                          alt={product.name}
                          className={`w-full h-full ${getProductPadding(product.image, true)} md:${getProductPadding(product.image, false)} origin-center ${getProductScale(product.image, true)} md:${getProductScale(product.image, false)}`}
                          imgClassName="object-contain transition-transform duration-500 group-hover:scale-105 object-center"
                          fallbackStrategy="picsum"
                        />
                        {product.categoryName && (
                          <div className="absolute top-2 right-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {product.categoryName}
                          </div>
                        )}
                      </div>
                      <div className="p-3 md:p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="text-sm md:text-xl font-bold text-brand-900 dark:text-white group-hover:text-brand-500 transition-colors min-h-[3.5rem] md:min-h-0 line-clamp-3">
                            {product.name}
                          </h3>
                          <ArrowRight size={16} className="text-brand-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" />
                        </div>
                        {product.description && (
                          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line flex-grow line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-20"
                >
                  <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium">{t.search.noResults.replace('{query}', query)}</p>
                  <p className="text-neutral-400 dark:text-neutral-500 mt-2">{t.search.tryAgain}</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
