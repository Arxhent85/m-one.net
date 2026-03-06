
import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';

interface Product {
  name: string;
  image: string;
  description?: string;
  categoryName?: string;
}

interface Category {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  products?: Product[];
}

interface CategoryPageProps {
  category: Category;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { t } = useLanguage();
  const { goHome, navigateToProduct } = useNavigation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="min-h-screen bg-white dark:bg-neutral-950 pt-32"
    >
      {/* Header Section with Halo Influence */}
      <div className="container mx-auto px-6 mb-32">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          onClick={goHome}
          className="text-neutral-400 hover:text-brand-500 mb-12 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} />
          {t.modal.back}
        </motion.button>

        <div className="max-w-4xl">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="text-brand-500 font-bold tracking-[0.3em] uppercase mb-6 text-xs"
          >
            {category.subtitle}
          </motion.h4>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="text-5xl md:text-8xl font-black text-neutral-950 dark:text-white leading-[0.9] tracking-tighter mb-12"
          >
            {category.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-light leading-relaxed max-w-2xl"
          >
            {category.description}
          </motion.p>
        </div>
      </div>

      {/* Product Grid - Archival Index Logic */}
      <div className="container mx-auto px-6 pb-32">
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-600">
            {t.products.availableProducts}
          </h2>
          <div className="h-[1px] flex-grow bg-neutral-100 dark:bg-neutral-900"></div>
        </div>

        {category.products && category.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            {category.products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.05, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => navigateToProduct(product)}
                className="group cursor-pointer flex flex-col will-change-transform"
              >
                <div className="relative aspect-[4/5] mb-8 overflow-hidden bg-neutral-50 dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] dark:group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.45)]">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full p-12"
                    imgClassName="object-contain transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                    fallbackStrategy="picsum"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-end mb-4 group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <h3 className="text-2xl font-bold text-neutral-950 dark:text-white leading-tight pr-4">
                      {product.name}
                    </h3>
                    <motion.div
                      className="text-brand-500 mb-1"
                      whileHover={{ scale: 1.2, x: 5 }}
                    >
                      <ArrowRight size={24} />
                    </motion.div>
                  </div>

                  <div className="h-[1px] w-full bg-neutral-100 dark:bg-neutral-800 mb-4 scale-x-100 group-hover:scale-x-95 transition-transform origin-left duration-500"></div>

                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-500 mt-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {t.products.viewDetails}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-3xl">
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-xs mb-8">{t.modal.noProducts}</p>
            <button
              onClick={goHome}
              className="text-brand-500 font-black uppercase tracking-widest text-xs hover:tracking-[0.2em] transition-all"
            >
              ← {t.modal.back}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPage;
