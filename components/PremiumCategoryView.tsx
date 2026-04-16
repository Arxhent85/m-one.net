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
      className="relative min-h-screen bg-white dark:bg-neutral-950 text-slate-900 dark:text-white overflow-hidden pt-12 lg:pt-32 transition-colors duration-500"
    >
      {/* BACKGROUND DYNAMICS: Technical grid pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: theme === 'dark'
              ? 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)'
              : 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}
        ></div>
        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.8)_100%)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 mb-24 lg:mb-40">
        <Link
          href="/"
          className="text-slate-500 dark:text-neutral-300 hover:text-brand-500 dark:hover:text-white mb-12 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} />
          {t.modal.back}
        </Link>

        <div className="flex flex-col lg:flex-row gap-12 justify-between items-start">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <h4 className="text-slate-600 dark:text-white/80 font-bold tracking-[0.3em] uppercase text-xs">
                {category.subtitle}
              </h4>
              <div className="h-[1px] w-12 bg-slate-200 dark:bg-white/20"></div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="text-7xl md:text-[8rem] lg:text-[11rem] font-black text-slate-900 dark:text-white leading-[0.8] tracking-tighter mb-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:[text-shadow:_0_4px_24px_rgb(0_0_0_/_40%)]"
            >
              {category.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-slate-600 dark:text-neutral-300 font-light leading-relaxed max-w-3xl mb-10"
            >
              {category.description}
            </motion.p>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1, delay: 0.6 }}
               className="inline-flex items-center gap-2 bg-slate-100 dark:bg-neutral-900/50 border border-slate-200 dark:border-white/5 px-3 py-1.5 rounded-md backdrop-blur-md"
            >
              <Award size={14} className="text-slate-400 dark:text-neutral-400" />
              <span className="text-xs font-semibold tracking-wide text-slate-500 dark:text-neutral-400 uppercase">
                {category.madeInGermany || 'Qualität Made in Germany'}
              </span>
            </motion.div>
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
                    className="relative aspect-[3/4] overflow-hidden bg-slate-50/80 dark:bg-neutral-900/60 backdrop-blur-2xl rounded-xl border border-slate-200 dark:border-white/10 transition-all duration-700 group-hover:bg-white dark:group-hover:bg-neutral-800/80 group-hover:border-brand-500/30 dark:group-hover:border-white/20 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_20px_50px_-10px_rgba(255,107,0,0.1)]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

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

                    <div className="absolute top-6 left-6 right-6 flex flex-col items-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 delay-100">
                      <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 p-2 text-slate-700 dark:text-white/70 rounded-md">
                        <ShieldCheck size={16} />
                      </div>
                      <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 p-2 text-slate-700 dark:text-white/70 rounded-md">
                        <Zap size={16} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Product label — rendered BELOW the card, never over the image */}
                  <div className="w-full flex justify-between items-end pt-4">
                    <div className="flex flex-col">
                      <span className="text-slate-400 dark:text-white/50 uppercase tracking-widest text-[10px] font-bold mb-1">M ONE Premium</span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-brand-500 transition-colors duration-500">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 dark:text-white/70 group-hover:text-brand-500 font-bold text-xs uppercase tracking-widest transition-colors duration-500 shrink-0 ml-4">
                      <span>Details</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
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
