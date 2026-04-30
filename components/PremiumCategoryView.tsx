"use client";

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Award } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import { useTheme } from './ThemeContext';
import ImageWithFallback from './ImageWithFallback';
import { CATEGORY_CONFIG, getCategoryHref, getProductPadding, getProductScale, slugify } from '../constants';
import { motion } from 'motion/react';
import { translations } from '../translations';

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
  image?: string;
  applications?: string;
  projects?: string;
  madeInGermany?: string;
  learnMore?: string;
  products?: Product[];
}

interface PremiumCategoryViewProps {
  category: Category;
  categoryId: string;
}



const PremiumCategoryView: React.FC<PremiumCategoryViewProps> = ({ category, categoryId }) => {
  const { t } = useLanguage();
  const { goHome } = useNavigation();
  const { theme } = useTheme();



  // Map internal categoryId to the URL slug used in filesystem routes
  const categoryUrlSlug = categoryId === 'service' ? 'service--kfz' : categoryId;
  // Get German products for canonical slug generation
  const deProducts = (translations.de.categories as any)[categoryId]?.products || [];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="relative min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-white overflow-hidden pt-6 lg:pt-10 transition-colors duration-500"
    >
      {/* 1. ATMOSPHERIC GHOST TITLE (2026 CONCEPT - ASYMMETRIC) */}
      <div className="absolute top-[-5%] left-[-10%] w-[120%] h-[60vh] pointer-events-none overflow-hidden z-0 select-none flex items-start justify-start">
        <motion.span 
          initial={{ opacity: 0, x: -100, rotate: -2 }}
          animate={{ opacity: 0.08, x: 0, rotate: -2 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[30vw] font-black uppercase tracking-tighter text-slate-950 dark:text-white whitespace-nowrap leading-none select-none blur-[2px]"
        >
          {category.title}
        </motion.span>
      </div>

      {/* BACKGROUND DYNAMICS: Technical grid pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: theme === 'dark'
              ? 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)', 
            backgroundSize: '80px 80px' 
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 mb-10">
        {/* BREADCRUMBS COMPACT */}
        <div className="flex items-center gap-2 mb-8 lg:mb-12">
          <Link
            href="/"
            className="text-slate-400 dark:text-neutral-500 hover:text-brand-500 transition-colors uppercase tracking-widest text-[9px] font-black"
          >
            M ONE
          </Link>
          <span className="text-slate-300 dark:text-neutral-800 text-[9px]">/</span>
          <span className="text-slate-900 dark:text-white uppercase tracking-widest text-[9px] font-black">
            {category.title}
          </span>
        </div>

        {/* 2. BENTO HEADER STRUCTURE */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-between mb-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full">
                <h4 className="text-brand-500 font-black tracking-[0.2em] uppercase text-[9px]">
                  {category.subtitle}
                </h4>
              </div>
              <div className="h-[1px] w-8 bg-slate-200 dark:bg-white/10"></div>
              <span className="text-slate-400 dark:text-neutral-500 text-[9px] font-bold uppercase tracking-widest">
                Professional Series
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter mb-6"
            >
              {category.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-orange-400">Engineering</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-base md:text-lg text-slate-600 dark:text-neutral-400 font-medium max-w-2xl leading-relaxed"
            >
              {category.description}
            </motion.p>
          </div>

        </div>


      </div>

      {/* Floating Cards Grid Section */}
      <div className="relative z-10 container mx-auto px-6 pb-32">
        {category.products && category.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
            {category.products.map((product, index) => {
              // Always use German product names for URL slugs to match filesystem routes
              const deProduct = deProducts[index];
              const slug = deProduct ? slugify(deProduct.name) : slugify(product.name);
              
              // Use centralized helper to get correct category segment (e.g., 'service--kfz')
              const categoryHref = getCategoryHref(categoryId);
              
              return (
                <Link
                  key={index}
                  href={`${categoryHref}/${slug}`}
                  className="group cursor-pointer flex flex-col will-change-transform"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                    className="relative aspect-[3/4] overflow-hidden bg-neutral-50 dark:bg-neutral-900/40 rounded-3xl border border-slate-200/50 dark:border-white/5 transition-all duration-700 group-hover:bg-white dark:group-hover:bg-neutral-800/80 group-hover:border-brand-500/30 group-hover:-translate-y-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] group-hover:shadow-[0_40px_80px_-20px_rgba(255,107,0,0.12)]"
                  >
                    {/* MESH GRADIENT HOVER EFFECT (2026 CONCEPT) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,#FF6B00_0%,transparent_50%),radial-gradient(circle_at_100%_0%,#FF8C00_0%,transparent_50%)]"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageWithFallback
                        src={product.image.includes('/products/colors/')
                          ? product.image.replace('-hell.webp', `-${theme === 'light' ? 'hell' : 'dunkel'}.webp`)
                          : product.image}
                        alt={product.name}
                        className={`w-full h-full ${getProductPadding(product.image, false)} origin-center ${getProductScale(product.image, false)}`}
                        imgClassName="object-contain transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                        fallbackStrategy="picsum"
                      />
                    </div>

                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                       <div className="w-8 h-8 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/5 flex items-center justify-center text-brand-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-500">
                          <Zap size={14} fill="currentColor" />
                       </div>
                    </div>
                  </motion.div>

                  {/* Compact Product Label */}
                  <div className="w-full pt-6 flex flex-col items-center text-center">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white leading-tight tracking-tight group-hover:text-brand-500 transition-colors duration-500">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-40 text-center border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl backdrop-blur-sm bg-slate-50/50 dark:bg-neutral-900/30">
             <p className="text-slate-400 dark:text-neutral-400 font-bold uppercase tracking-widest text-xs mb-8">{t.modal.noProducts}</p>
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

export default PremiumCategoryView;
