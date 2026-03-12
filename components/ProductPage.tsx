import * as React from 'react';
import { ArrowLeft, ArrowRight, Download, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import { useTheme } from './ThemeContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';
import { PREMIUM_SILIKON_COLORS } from '../constants';
import '@google/model-viewer';

// Add type declaration for the custom web component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

interface ProductPageProps {
  product: {
    name: string;
    image: string;
    description?: string;
    categoryName?: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ product: initialProduct }) => {
  const { t, getProductByImage } = useLanguage();
  const { theme } = useTheme();

  const product = getProductByImage(initialProduct.image) || initialProduct;
  const [activeMediaIndex, setActiveMediaIndex] = React.useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);

  const isPremiumSilikon = product.name.toLowerCase().includes('premium') && product.name.toLowerCase().includes('sili');
  const activeColor = PREMIUM_SILIKON_COLORS[selectedColorIndex];

  const imageSrc = isPremiumSilikon
    ? `/products/premium-silikon/PREMIUM SILIKON ${activeColor.fileSuffix}.png`
    : product.image;

  const modelSrc = isPremiumSilikon
    ? `/products/premium-silikon/PREMIUM SILIKON ${activeColor.fileSuffix} 3D.glb`
    : product.image.replace('-3D-4K-Transparent.webp', '-3D.glb');

  const has3D = isPremiumSilikon || product.image.includes('3D-4K');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Preload Premium Silikon images for lightning-fast color switching
  React.useEffect(() => {
    if (isPremiumSilikon) {
      PREMIUM_SILIKON_COLORS.forEach((color) => {
        // Preload high-res 2D image
        const img = new Image();
        img.src = `/products/premium-silikon/PREMIUM SILIKON ${color.fileSuffix}.png`;
        
        // Background fetch 3D model for instant switching
        fetch(`/products/premium-silikon/PREMIUM SILIKON ${color.fileSuffix} 3D.glb`, { priority: 'low' as RequestPriority }).catch(() => {});
      });
    }
  }, [isPremiumSilikon]);

  const handleDownload = (type: string) => {
    alert(`${type} ${t.products.downloadStarted}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="min-h-screen bg-white dark:bg-neutral-950 pt-32 pb-32"
    >
      <div className="container mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          onClick={() => window.history.back()}
          className="text-neutral-400 hover:text-brand-500 mb-20 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} />
          {t.products.backToCategory}
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-24 items-start">
          {/* Left Column: Visual Excellence (3D/Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="w-full lg:w-3/5 lg:sticky lg:top-32 flex-col will-change-transform"
          >
            <div className="relative aspect-square rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-900 flex items-center justify-center overflow-hidden group/visual shadow-[0_40px_100px_-30px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.4)]">
              {/* 2D Image View */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${activeMediaIndex === 0 ? 'opacity-100 z-50' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                {isPremiumSilikon ? (
                  <img
                    src={imageSrc}
                    alt={`${product.name} ${activeColor.name}`}
                    className="w-full h-full p-8 lg:p-20 object-contain transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/visual:scale-110"
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                  />
                ) : (
                  <ImageWithFallback
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-full p-8 lg:p-20"
                    imgClassName="object-contain transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/visual:scale-110"
                    fallbackStrategy="picsum"
                  />
                )}
              </div>

              {/* 3D Model View (Preloaded in background) */}
              {has3D && (
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${activeMediaIndex === 1 ? 'opacity-100 z-50' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  {/* @ts-ignore */}
                  <model-viewer
                    src={modelSrc}
                    alt={`${product.name} ${isPremiumSilikon ? activeColor.name : ''} 3D`}
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                    loading="eager"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                  ></model-viewer>
                </div>
              )}

              {/* Gallery Toggle (Simplified for Premium Feel) */}
              {has3D && (
                <div className="absolute bottom-3 left-3 flex gap-1.5 p-1 glass-panel rounded-full border border-white/10 shadow-lg z-[60]">
                  {[0, 1].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.15em] transition-all duration-500 ${activeMediaIndex === idx
                        ? 'bg-brand-500 text-white shadow-lg'
                        : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-white'
                        }`}
                    >
                      {idx === 0 ? 'Image' : '3D View'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Premium Engineering Details */}
          <div className="lg:w-2/5 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              {product.categoryName && (
                <span className="text-brand-500 font-black tracking-[0.4em] uppercase text-[10px] mb-8 block">
                  {product.categoryName}
                </span>
              )}
              <h1 className="text-5xl md:text-6xl font-black text-neutral-950 dark:text-white mb-10 leading-[0.9] tracking-tighter">
                {product.name}
              </h1>

              {/* Premium Silikon Color Selection */}
              {isPremiumSilikon && (
                <div className="mb-12">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-600 mb-6 flex items-center gap-4">
                    Farbe Auswählen
                    <div className="h-[1px] flex-grow bg-neutral-100 dark:bg-neutral-900"></div>
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                    {PREMIUM_SILIKON_COLORS.map((color, idx) => (
                      <div key={color.id} className="flex flex-col items-center gap-3">
                        <motion.button
                          whileHover={{ 
                            rotate: [0, -5, 5, -5, 5, 0],
                            scale: 1.1 
                          }}
                          transition={{ 
                            rotate: { duration: 0.5, ease: "easeInOut" },
                            scale: { duration: 0.2 }
                          }}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`relative w-[56px] h-[56px] rounded-full overflow-hidden transition-all duration-300 ${
                            selectedColorIndex === idx 
                              ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-neutral-950 shadow-lg shadow-brand-500/30' 
                              : 'border border-neutral-200 dark:border-neutral-800'
                          }`}
                          title={color.name}
                        >
                          <img 
                            src={`/products/premium-silikon/punkt ${color.fileSuffix}.png`} 
                            alt={color.name}
                            className="w-full h-full object-cover scale-110"
                          />
                        </motion.button>
                        <span className={`text-[10px] font-black uppercase tracking-widest text-center transition-colors ${
                          selectedColorIndex === idx ? 'text-brand-500' : 'text-neutral-400 dark:text-neutral-600'
                        }`}>
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <motion.p 
                    key={activeColor.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-sm font-bold text-neutral-800 dark:text-neutral-200"
                  >
                    Ausgewählte Variante: <span className="text-brand-500 tracking-wide uppercase font-black">{activeColor.name}</span>
                  </motion.p>
                </div>
              )}

              <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-12 whitespace-pre-line">
                {product.description}
              </p>

              {/* Technical Features - Archival List Style */}
              <div className="mb-16">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-600 mb-8 flex items-center gap-4">
                  {t.products.featuresTitle}
                  <div className="h-[1px] flex-grow bg-neutral-100 dark:bg-neutral-900"></div>
                </h3>
                <div className="space-y-4">
                  {['Profi-Qualität', 'Nach DIN Norm', 'Lange Haltbarkeit', 'Sofort verfügbar'].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (idx * 0.1) }}
                      className="flex items-center gap-4 text-sm font-bold text-neutral-700 dark:text-neutral-300 group/feat cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 transition-transform duration-300 group-hover/feat:scale-150"></div>
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Downloads - High End Taktile Tiefe */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-600 mb-8 flex items-center gap-4">
                  {t.products.downloads}
                  <div className="h-[1px] flex-grow bg-neutral-100 dark:bg-neutral-900"></div>
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: t.products.technicalSheet, icon: FileText, type: 'TDB' },
                    { label: t.products.safetySheet, icon: ShieldCheck, type: 'SDB' }
                  ].map((doc, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 10 }}
                      onClick={() => handleDownload(doc.type)}
                      className="group flex items-center justify-between py-6 border-b border-neutral-100 dark:border-neutral-900 hover:border-brand-500/30 transition-all duration-500 text-left"
                    >
                      <div className="flex items-center gap-6">
                        <doc.icon className="text-neutral-300 dark:text-neutral-700 group-hover:text-brand-500 transition-colors" size={24} />
                        <div>
                          <p className="font-bold text-neutral-950 dark:text-white uppercase tracking-wider text-xs">{doc.label}</p>
                          <p className="text-[10px] text-neutral-400 font-black tracking-widest mt-1">PDF • 1.2 MB</p>
                        </div>
                      </div>
                      <Download size={20} className="text-neutral-200 dark:text-neutral-800 group-hover:text-brand-500 group-hover:-translate-y-1 transition-all" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
