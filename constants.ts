
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
    // 1.25 on mobile and 1.10 on desktop ensures impact without clipping
    return isMobile ? 'scale-[1.25]' : 'scale-[1.10]';
  }

  // Bau products (Cartridges)
  // 1.15 is the universal sweet spot for 100% visibility and maximum size.
  return isMobile ? 'scale-[1.15]' : 'scale-[1.05]';
};

/**
 * Standardizes padding for product containers to maintain visual balance.
 */
export const getProductPadding = (imagePath: string = '', isMobile: boolean = false) => {
  const path = imagePath.toLowerCase();
  
  // Normalizing padding for all products
  // Service/Colors (Sprays) need a bit more edge room than cartridges
  if (path.includes('/service/') || path.includes('/colors/') || path.includes('spray')) {
    return isMobile ? 'p-4' : 'p-8';
  }

  // Bau products (Cartridges)
  return isMobile ? 'p-4' : 'p-10';
};

