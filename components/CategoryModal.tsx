
import * as React from 'react';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';

interface Product {
  name: string;
  image: string;
  description?: string;
}

interface Category {
  title: string;
  subtitle: string;
  description: string;
  products?: Product[];
}

interface CategoryModalProps {
  category: Category;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, onClose }) => {
  const { t } = useLanguage();

  // Prevent scrolling on body when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-white dark:bg-neutral-900 w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col transition-colors duration-300"
      >

        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-start bg-neutral-50 dark:bg-neutral-800/50 shrink-0">
          <div>
            <h4 className="text-brand-500 text-sm font-bold tracking-widest uppercase mb-2">{category.subtitle}</h4>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-900 dark:text-white">{category.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors text-neutral-500 dark:text-neutral-400 hover:text-brand-900 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8">
          <p className="text-neutral-600 dark:text-neutral-300 mb-10 text-lg max-w-3xl">
            {category.description}
          </p>

          {category.products && category.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
              {category.products.map((product, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  key={index}
                  className="group flex flex-col h-full bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 hover:border-brand-500/30 dark:hover:border-brand-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-t-xl bg-gray-50 dark:bg-neutral-800 aspect-[4/3] shrink-0">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover p-4 transition-transform duration-500 group-hover:scale-105 object-center mix-blend-multiply dark:mix-blend-normal"
                      fallbackStrategy="picsum"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-brand-900 dark:text-white group-hover:text-brand-500 transition-colors">{product.name}</h3>
                      <ArrowRight className="text-brand-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-400 font-medium">{t.modal.noProducts}</p>
              <button
                onClick={onClose}
                className="mt-6 text-brand-500 font-bold hover:underline"
              >
                {t.modal.back}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-bold text-neutral-600 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {t.modal.close}
          </button>
        </div>
      </motion.div >
    </div >
  );
};

export default CategoryModal;
