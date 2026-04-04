
import { BrickWall, SprayCan, Sparkles, Wrench } from 'lucide-react';

export const NAV_LINKS = [
  { id: 'home', href: '#hero' },
  { id: 'services', href: '#categories' },
  { id: 'about', href: '#about' },
  { id: 'contact', href: '#contact' },
];

// Stores only the static assets (Images & Icons) and IDs.
// Text content is now handled by translations.ts
export const CATEGORY_CONFIG = {
  bau: {
    id: 'bau',
    image: '/categories/Dichtstoffe M ONE.webp',
    icon: BrickWall,
  },
  service: {
    id: 'service',
    image: '/categories/Service Picture M ONE.webp',
    icon: Wrench,
  },
  colors: {
    id: 'colors',
    image: '/categories/Colors M ONE.webp',
    icon: SprayCan,
  },
  cleaning: {
    id: 'cleaning',
    image: '/categories/Reinigusmittel M ONE.webp',
    icon: Sparkles,
  }
};

export const PREMIUM_SILIKON_COLORS = [
  { id: 'transparent', name: 'Transparent', fileSuffix: 'Transparent' },
  { id: 'anthrazit', name: 'Anthrazit', fileSuffix: 'anthrazit' },
  { id: 'bahama', name: 'Bahama', fileSuffix: 'bahama' },
  { id: 'braun', name: 'Braun', fileSuffix: 'braun' },
  { id: 'caramel', name: 'Caramel', fileSuffix: 'caramel' },
  { id: 'grau', name: 'Grau', fileSuffix: 'grau' },
  { id: 'hellgrau', name: 'Hellgrau', fileSuffix: 'hellgrau' },
  { id: 'jasmin', name: 'Jasmin', fileSuffix: 'jasmin' },
  { id: 'manhatten', name: 'Manhatten', fileSuffix: 'manhatten' },
  { id: 'schwarz', name: 'Schwarz', fileSuffix: 'schwarz' },
  { id: 'silber', name: 'Silber', fileSuffix: 'silber' },
  { id: 'weiss', name: 'Weiss', fileSuffix: 'weiss' },
];

export const NEUTRAL_SILIKON_COLORS = [
  { id: 'transparent', name: 'Transparent', fileSuffix: 'transparent' },
  { id: 'grau', name: 'Grau', fileSuffix: 'grau' },
  { id: 'schwarz', name: 'Schwarz', fileSuffix: 'schwarz' },
  { id: 'weiss', name: 'Weiss', fileSuffix: 'weiss' },
];

export const LACK_SPRAY_COLORS = [
  { id: 'schwarz-matt', name: 'Schwarz Matt', fileSuffix: 'Schwarz Matt' },
  { id: 'schwarz', name: 'Schwarz', fileSuffix: 'Schwarz' },
  { id: 'weiss', name: 'Weiss', fileSuffix: 'Weiss' },
  { id: 'grau', name: 'Grau', fileSuffix: 'Grau' },
  { id: 'chrom', name: 'Chrom', fileSuffix: 'Chrom' },
  { id: 'gold', name: 'Gold', fileSuffix: 'Gold' },
  { id: 'gelb', name: 'Gelb', fileSuffix: 'Gelb' },
  { id: 'rot', name: 'Rot', fileSuffix: 'Rot' },
  { id: 'grun', name: 'Grün', fileSuffix: 'Grün' },
  { id: 'braun', name: 'Braun', fileSuffix: 'Braun' },
];

/**
 * Standardizes product scaling in grid views to match "Premium Silicon" visual size.
 * Categorizes products by their type (Silicon, Acryl, Kleber, Sprays) and returns a scale factor.
 */
export const getProductScale = (imagePath: string = '', isMobile: boolean = false) => {
  const path = imagePath.toLowerCase();
  
  // Non-Bau products (Sprays, Colors)
  if (path.includes('/service/') || path.includes('/colors/') || path.includes('spray')) {
    const isServiceProduct = path.includes('/service/') || (!path.includes('/colors/') && (path.includes('spray') || path.includes('reiniger') || path.includes('fett') || path.includes('starter') || path.includes('rost') || path.includes('ubs') || path.includes('zink')));
    
    if (isServiceProduct) {
      return isMobile ? 'scale-[1.45]' : 'scale-[1.40]';
    }
    // Colors and other sprays
    return isMobile ? 'scale-[1.35]' : 'scale-[1.30]';
  }

  // Bau products (Cartridges)
  // Standardizing cartridges to fill the 3:4 container properly
  return isMobile ? 'scale-[1.20]' : 'scale-[1.10]';
};

/**
 * Standardizes padding for product containers to maintain visual balance.
 */
export const getProductPadding = (imagePath: string = '', isMobile: boolean = false) => {
  const path = imagePath.toLowerCase();
  
  // Standardized padding for almost all products to ensure consistent card fill
  if (path.includes('/products/') || path.includes('spray') || path.includes('silikon') || path.includes('kleber')) {
    return isMobile ? 'p-4' : 'p-6';
  }

  // Fallback
  return isMobile ? 'p-4' : 'p-8';
};

/**
 * Standardizes slug generation across the application.
 */
export const slugify = (text: string) => 
  text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]/g, '');

/**
 * Maps URL category slugs to internal translation keys.
 */
export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'service--kfz': 'service',
  'bau': 'bau',
  'colors': 'colors',
  'cleaning': 'cleaning'
};


