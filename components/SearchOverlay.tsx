
import * as React from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import ImageWithFallback from './ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  name: string;
  image: string;
  description?: string;
  categoryName?: string;
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

    return allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    });
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                >
                  {results.map((product, index) => (
                    <motion.div
                      variants={itemVariants}
                      key={index}
                      onClick={() => {
                        navigateToProduct(product);
                        onClose();
                      }}
                      className="group flex flex-col h-full bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700 hover:border-brand-500/30 dark:hover:border-brand-500/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-t-xl bg-neutral-50 dark:bg-neutral-100 aspect-[4/3] shrink-0 border-b border-neutral-100 dark:border-neutral-700">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full p-4"
                          imgClassName="object-contain transition-transform duration-500 group-hover:scale-105 object-center"
                          fallbackStrategy="picsum"
                        />
                        {product.categoryName && (
                          <div className="absolute top-2 right-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            {product.categoryName}
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-brand-900 dark:text-white group-hover:text-brand-500 transition-colors">{product.name}</h3>
                          <ArrowRight className="text-brand-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" />
                        </div>
                        {product.description && (
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed whitespace-pre-line flex-grow line-clamp-3">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
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
