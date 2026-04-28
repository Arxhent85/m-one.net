"use client";

import * as React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Star, Award } from 'lucide-react';
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

const getProjectsForCategory = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('bau') || t.includes('construction') || t.includes('ndërtim')) {
    return {
      description: 'Referenzen, die Beständigkeit beweisen. Einblicke in Bauprojekte mit M ONE Premium Systemen.',
      items: [
        { title: 'Residential Tower, Berlin', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80', rating: 5, tags: ['Fassade', 'Dichtung'], standard: 'Industrial Standard' },
        { title: 'Commercial Estate, Munich', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', rating: 5, tags: ['Verklebung'], standard: 'Industrial Standard' },
        { title: 'Luxury Villa, Hamburg', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80', rating: 5, tags: ['Sanitär', 'Naturstein'], standard: 'Premium Standard' },
        { title: 'Boutique Hotel, Frankfurt', img: 'https://images.unsplash.com/photo-1582719478250-c89402bb802b?auto=format&fit=crop&q=80', rating: 5, tags: ['Innenausbau'], standard: 'Premium Standard' },
      ]
    };
  } else if (t.includes('service') || t.includes('shërbim')) {
    return {
      description: 'Maschinen am Limit. Sehen Sie selbst, wie M ONE Service-Produkte die Lebensdauer maximieren.',
      items: [
        { title: 'Porsche GT3 Engine Bay', img: 'https://images.unsplash.com/photo-1610647752706-3bb12232b311?auto=format&fit=crop&q=80', rating: 5, tags: ['Motor', 'Reinigung'], standard: 'Performance Standard' },
        { title: 'Heavy Machinery, Ruhr', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80', rating: 5, tags: ['Schmierung', 'Rost'], standard: 'Industrial Standard' },
        { title: 'Classic Car Restoration', img: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80', rating: 5, tags: ['Wartung'], standard: 'Premium Standard' },
        { title: 'Race Track Pit Stop', img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80', rating: 5, tags: ['Bremsen', 'Teile'], standard: 'Professional' },
      ]
    };
  } else if (t.includes('color') || t.includes('ngjyrat')) {
    return {
      description: 'Farbbrillanz und makellose Finishes. Von Felgenrestauration bis hin zu Spezialarchitekturen.',
      items: [
        { title: 'Custom Alloy Wheels', img: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80', rating: 5, tags: ['Felgen', 'Lack'], standard: 'Design Edition' },
        { title: 'Industrial Coating', img: 'https://images.unsplash.com/photo-1581092580497-a0d24cb5f533?auto=format&fit=crop&q=80', rating: 5, tags: ['Korrosionsschutz'], standard: 'Industrial Standard' },
        { title: 'Exhaust Heat Paint', img: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?auto=format&fit=crop&q=80', rating: 5, tags: ['Hitze', 'Versiegelung'], standard: 'Performance Standard' },
        { title: 'Vintage Restauration', img: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80', rating: 5, tags: ['Restauration'], standard: 'Premium Standard' },
      ]
    };
  } else {
    return {
      description: 'Strahlende Ergebnisse für Industrie und Werterhalt. Kompromisslose Sauberkeit.',
      items: [
        { title: 'Industrial Floor', img: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80', rating: 5, tags: ['Industrie'], standard: 'Industrial Standard' },
        { title: 'Corporate Facade', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80', rating: 5, tags: ['Fassade'], standard: 'Premium Standard' },
        { title: 'Hygiene Standards', img: 'https://images.unsplash.com/photo-1584820927505-df6b88b22b78?auto=format&fit=crop&q=80', rating: 5, tags: ['Hygiene'], standard: 'Sanitary Standard' },
        { title: 'Workshop Clean', img: 'https://images.unsplash.com/photo-1621259457635-4299e5251662?auto=format&fit=crop&q=80', rating: 5, tags: ['Werkstatt'], standard: 'Professional' },
      ]
    };
  }
};

const PremiumCategoryView: React.FC<PremiumCategoryViewProps> = ({ category, categoryId }) => {
  const { t } = useLanguage();
  const { goHome } = useNavigation();
  const { theme } = useTheme();

  const referenceData = getProjectsForCategory(category.title);

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

      {/* REFERENCE PROJECTS SECTION */}
      <div className="relative z-10 py-32 lg:py-48 bg-slate-50 dark:bg-neutral-950 border-t border-slate-200 dark:border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-200/50 dark:to-neutral-900/50 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 lg:mb-24">
             <div>
               <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
                  {category.projects || 'Referenzprojekte'}
                </h2>
                <div className="h-[2px] w-16 bg-brand-500/40 dark:bg-white/20"></div>
             </div>
             <p className="text-slate-600 dark:text-neutral-300 max-w-sm mt-6 md:mt-0 font-light text-lg">
                {referenceData.description}
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {referenceData.items.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                  className="group relative overflow-hidden flex flex-col bg-white dark:bg-neutral-900 rounded-[10px] border border-slate-200 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                >
                   <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                      
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex gap-1 items-center">
                        <Star size={12} fill="#FF6B00" className="text-brand-500" />
                        <span className="text-white text-xs font-bold leading-none mt-0.5">{project.rating}.0</span>
                      </div>
                   </div>

                   <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map(tag => (
                           <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-brand-500 bg-brand-500/10 px-2 py-1 rounded-sm">
                             {tag}
                           </span>
                        ))}
                      </div>
                      <h4 className="text-slate-900 dark:text-white text-lg font-bold mb-1 leading-snug">{project.title}</h4>
                      <p className="text-slate-500 dark:text-neutral-400 text-sm">{project.standard}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCategoryView;
