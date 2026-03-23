import * as React from 'react';
import { ArrowLeft, ArrowRight, Download, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useNavigation } from './NavigationContext';
import { useTheme } from './ThemeContext';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'motion/react';
import { PREMIUM_SILIKON_COLORS, NEUTRAL_SILIKON_COLORS, LACK_SPRAY_COLORS } from '../constants';
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
  const isColorProduct = product.image.toLowerCase().includes('/products/colors/');

  const isPremiumSilikon = product.name.toLowerCase().includes('premium') && product.name.toLowerCase().includes('sili');
  const isNeutralSilikon = product.name.toLowerCase().includes('neutral') && product.name.toLowerCase().includes('sili');
  const isLackSpray = product.name.toLowerCase().includes('lack spray') || product.name.toLowerCase().includes('paint spray') || product.name.toLowerCase().includes('llak sprej');
  const isFelgensilber = product.image.includes('felgensilber');
  const isHaftgrund = product.image.includes('haftgrund');
  const isStrukturAcryl = product.image.includes('/struktur-acryl/');
  const isUniversalAcryl = product.image.includes('/universal-acryl/');
  const isExtremKleber = product.image.includes('/extrem-kleber/');
  const isAcrylProduct = isStrukturAcryl || isUniversalAcryl;

  const [selectedColorIndex, setSelectedColorIndex] = React.useState(() => {
    if (isLackSpray && product.image.includes('rot')) {
      return 7; // Rot is index 7 in LACK_SPRAY_COLORS
    }
    return 0;
  });

  const activeColor = isPremiumSilikon 
    ? PREMIUM_SILIKON_COLORS[Math.min(selectedColorIndex, PREMIUM_SILIKON_COLORS.length - 1)] 
    : isNeutralSilikon
      ? NEUTRAL_SILIKON_COLORS[Math.min(selectedColorIndex, NEUTRAL_SILIKON_COLORS.length - 1)]
      : isLackSpray
        ? LACK_SPRAY_COLORS[Math.min(selectedColorIndex, LACK_SPRAY_COLORS.length - 1)]
        : undefined;

  const isBauProduct = product.categoryName?.toLowerCase() === 'bau';

  const imageSrc = isPremiumSilikon
    ? `/products/premium-silikon/PREMIUM SILIKON ${activeColor!.fileSuffix}.webp`
    : isNeutralSilikon
      ? `/products/neutral-silikon/M-ONE BAU SILIKON ${activeColor!.fileSuffix}.webp`
      : isLackSpray
        ? `/products/colors/lack-spray/LACK SPRAY M ONE ${activeColor!.fileSuffix}.webp`
        : isColorProduct && product.image.includes('-hell.webp')
          ? product.image.replace('-hell.webp', `-${theme === 'light' ? 'hell' : 'dunkel'}.webp`)
          : product.image;

  const modelSrc = isPremiumSilikon
    ? `/products/premium-silikon/PREMIUM SILIKON ${activeColor!.fileSuffix} 3D.glb`
    : isNeutralSilikon
      ? `/products/neutral-silikon/M-ONE BAU SILIKON ${activeColor!.fileSuffix}.glb`
      : isLackSpray
        ? `/products/colors/lack-spray/LACK SPRAY M ONE ${activeColor!.fileSuffix} 3D.glb`
        : isFelgensilber
          ? '/products/colors/felgensilber-3D.glb'
          : isHaftgrund
            ? '/products/colors/haftgrund-3D.glb'
            : isStrukturAcryl
              ? '/products/struktur-acryl/M-ONE ACRYL STRUKTUR 3D.glb'
              : isUniversalAcryl
                ? '/products/universal-acryl/M-ONE UNIVERSAL ACRYL.glb'
                : isExtremKleber
                  ? '/products/extrem-kleber/profi mont extrem 3D.glb'
                  : product.image.replace('-3D-4K-Transparent.webp', '-3D.glb');

  const has3D = isPremiumSilikon || isNeutralSilikon || isLackSpray || isFelgensilber || isHaftgrund || isAcrylProduct || isExtremKleber || product.image.includes('3D-4K');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Preload assets for lightning-fast switching
  React.useEffect(() => {
    if (isPremiumSilikon) {
      PREMIUM_SILIKON_COLORS.forEach((color) => {
        const img = new Image();
        img.src = `/products/premium-silikon/PREMIUM SILIKON ${color.fileSuffix}.webp`;
        fetch(`/products/premium-silikon/PREMIUM SILIKON ${color.fileSuffix} 3D.glb`, { priority: 'low' as RequestPriority }).catch(() => {});
      });
    } else if (isNeutralSilikon) {
      NEUTRAL_SILIKON_COLORS.forEach((color) => {
        const img = new Image();
        img.src = `/products/neutral-silikon/M-ONE BAU SILIKON ${color.fileSuffix}.webp`;
        fetch(`/products/neutral-silikon/M-ONE BAU SILIKON ${color.fileSuffix}.glb`, { priority: 'low' as RequestPriority }).catch(() => {});
      });
    } else if (isLackSpray) {
      LACK_SPRAY_COLORS.forEach((color) => {
        const img = new Image();
        img.src = `/products/colors/lack-spray/LACK SPRAY M ONE ${color.fileSuffix}.webp`;
        fetch(`/products/colors/lack-spray/LACK SPRAY M ONE ${color.fileSuffix} 3D.glb`, { priority: 'low' as RequestPriority }).catch(() => {});
      });
    } else if (isFelgensilber) {
      const img = new Image();
      img.src = '/products/colors/felgensilber-transparent.webp';
      fetch('/products/colors/felgensilber-3D.glb', { priority: 'low' as RequestPriority }).catch(() => {});
    } else if (isHaftgrund) {
      const img = new Image();
      img.src = '/products/colors/haftgrund-transparent.webp';
      fetch('/products/colors/haftgrund-3D.glb', { priority: 'low' as RequestPriority }).catch(() => {});
    }
  }, [isPremiumSilikon, isNeutralSilikon, isLackSpray, isFelgensilber, isHaftgrund]);

  const handleDownload = (type: string) => {
    alert(`${type} ${t.products.downloadStarted}`);
  };

  const getVariantFolder = () => {
    if (isPremiumSilikon) return 'premium-silikon';
    if (isNeutralSilikon) return 'neutral-silikon';
    if (isLackSpray) return 'colors/lack-spray';
    return '';
  };

  const getVariantList = () => {
    if (isPremiumSilikon) return PREMIUM_SILIKON_COLORS;
    if (isNeutralSilikon) return NEUTRAL_SILIKON_COLORS;
    if (isLackSpray) return LACK_SPRAY_COLORS;
    return [];
  };

  const hasVariants = isPremiumSilikon || isNeutralSilikon || isLackSpray;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      className="min-h-screen bg-white dark:bg-neutral-950 pt-8 lg:pt-32 pb-32"
    >
      <div className="container mx-auto px-6">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          onClick={() => window.history.back()}
          className="text-neutral-400 hover:text-brand-500 mb-2 lg:mb-12 flex items-center gap-2 transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <ArrowLeft size={16} />
          {t.products.backToCategory}
        </motion.button>

        {/* Header Section: Title & Category (Moved to top for mobile flow) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-4 lg:mb-20"
        >
          {product.categoryName && (
            <span className="text-brand-500 font-black tracking-[0.4em] uppercase text-[10px] mb-1 lg:mb-8 block">
              {product.categoryName}
            </span>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-neutral-950 dark:text-white leading-[0.9] tracking-tighter">
            {product.name}
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Left Column: Visual Excellence (65%) + Mobile Color Selection (35%) */}
          <div className="w-full lg:w-3/5 flex flex-row lg:flex-col gap-3 sm:gap-6 lg:gap-0 lg:sticky lg:top-32 h-auto lg:h-min">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              className="w-[65%] lg:w-full relative aspect-[2/3] lg:aspect-square rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-900 flex items-center justify-center overflow-hidden group/visual shadow-[0_40px_100px_-30px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.4)]"
            >
              {/* 2D Image View */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${activeMediaIndex === 0 ? 'opacity-100 z-50' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                {hasVariants ? (
                  <img
                    src={imageSrc}
                    alt={`${product.name} ${activeColor!.name}`}
                    className={`w-full h-full ${isBauProduct || isLackSpray ? 'p-4' : 'p-1'} lg:p-20 object-contain ${isBauProduct || isLackSpray ? 'scale-[1.10]' : 'scale-[1.28]'} lg:scale-100 origin-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/visual:scale-110`}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                  />
                ) : (
                  <ImageWithFallback
                    src={imageSrc}
                    alt={product.name}
                    className={`w-full h-full ${isBauProduct ? 'p-4' : 'p-1'} lg:p-20`}
                    imgClassName={`object-contain ${isBauProduct ? 'scale-[1.10]' : 'scale-[1.28]'} lg:scale-100 origin-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/visual:scale-110`}
                    fallbackStrategy="picsum"
                  />
                )}
              </div>

              {/* 3D Model View */}
              {has3D && (
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${activeMediaIndex === 1 ? 'opacity-100 z-50' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                >
                  {/* @ts-ignore */}
                  <model-viewer
                    key={modelSrc}
                    src={modelSrc}
                    alt={`${product.name} ${hasVariants ? activeColor!.name : ''} 3D`}
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                    loading="eager"
                    style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
                  ></model-viewer>
                </div>
              )}

              {/* Gallery Toggle */}
              {has3D && (
                <div className="absolute bottom-2 left-2 flex gap-1 p-0.5 glass-panel rounded-full border border-white/10 shadow-lg z-[60]">
                  {[0, 1].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveMediaIndex(idx)}
                      className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase tracking-[0.1em] transition-all duration-500 ${activeMediaIndex === idx
                        ? 'bg-brand-500 text-white shadow-lg'
                        : 'text-neutral-500 hover:text-neutral-950 dark:hover:text-white'
                        }`}
                    >
                      {idx === 0 ? 'IMG' : '3D'}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Mobile Color Selection (35% width, 2 columns) */}
            {hasVariants && (
              <div className="w-[35%] lg:hidden block">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-600 mb-2">
                  Farbe
                </h3>
                <div className="grid grid-cols-2 gap-2 pb-2">
                  {getVariantList().map((color, idx) => (
                    <div key={color.id} className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`relative w-10 h-10 rounded-full overflow-hidden transition-all duration-300 ${
                          selectedColorIndex === idx 
                            ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-neutral-950 shadow-lg shadow-brand-500/30 scale-105' 
                            : 'border border-neutral-200 dark:border-neutral-800 opacity-60'
                        }`}
                        title={color.name}
                      >
                        <img 
                          src={`/products/${getVariantFolder()}/punkt ${color.fileSuffix}.webp`} 
                          alt={color.name}
                          className="w-full h-full object-cover scale-110"
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                  <p className="text-[9px] font-black text-brand-500 uppercase tracking-widest leading-none">
                    {activeColor!.name}
                  </p>
                </div>
              </div>
            )}
          </div>



          {/* Right Column: Premium Engineering Details */}
          <div className="lg:w-2/5 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            >
              {/* Desktop Color Selection */}
              {hasVariants && (
                <div className="mb-12 hidden lg:block">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-600 mb-6 flex items-center gap-4">
                    Farbe Auswählen
                    <div className="h-[1px] flex-grow bg-neutral-100 dark:bg-neutral-900"></div>
                  </h3>
                  <div className="grid grid-cols-4 lg:grid-cols-6 gap-6">
                    {getVariantList().map((color, idx) => (
                      <div key={color.id} className="flex flex-col items-center gap-3">
                        <motion.button
                          whileHover={{ rotate: [0, -5, 5, -5, 5, 0], scale: 1.1 }}
                          transition={{ rotate: { duration: 0.5, ease: "easeInOut" }, scale: { duration: 0.2 } }}
                          onClick={() => setSelectedColorIndex(idx)}
                          className={`relative w-[56px] h-[56px] rounded-full overflow-hidden transition-all duration-300 ${
                            selectedColorIndex === idx 
                              ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-neutral-950 shadow-lg shadow-brand-500/30' 
                              : 'border border-neutral-200 dark:border-neutral-800'
                          }`}
                          title={color.name}
                        >
                          <img 
                            src={`/products/${getVariantFolder()}/punkt ${color.fileSuffix}.webp`} 
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
                    key={activeColor!.name}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 text-sm font-bold text-neutral-800 dark:text-neutral-200"
                  >
                    Ausgewählte Variante: <span className="text-brand-500 tracking-wide uppercase font-black">{activeColor!.name}</span>
                  </motion.p>
                </div>
              )}

              <p className="text-lg text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed mb-12 whitespace-pre-line">
                {product.description}
              </p>

              {/* Technical Features */}
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

              {/* Downloads */}
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
