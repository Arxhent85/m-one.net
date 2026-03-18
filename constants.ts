
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

/**
 * Standardizes product scaling in grid views to match "Premium Silicon" visual size.
 * Categorizes products by their type (Silicon, Acryl, Kleber, Sprays) and returns a scale factor.
 */
export const getProductScale = (imagePath: string = '', isMobile: boolean = false) => {
  const path = imagePath.toLowerCase();
  
  // Non-Bau products (Sprays, Colors) usually need higher scaling for impact
  if (path.includes('/service/') || path.includes('/colors/') || path.includes('spray')) {
    return isMobile ? 'scale-[1.45]' : 'scale-100';
  }

  // Bau products (Cartridges) - Normalizing to a safe uniform standard
  // Silicon was too small (1.05), Acryl was too large/clipped (1.18)
  // 1.10 is the universal sweet spot for 100% visibility and maximum size.
  return isMobile ? 'scale-[1.10]' : 'scale-100';
};

/**
 * Standardizes padding for product containers to maintain visual balance.
 */
export const getProductPadding = (imagePath: string = '', isMobile: boolean = false) => {
  const path = imagePath.toLowerCase();
  
  // Bau products (Cartridges) need uniform padding
  if (path.includes('/bau/') || path.includes('silikon') || path.includes('acryl') || path.includes('kleber')) {
    return isMobile ? 'p-4' : 'p-12';
  }

  // Sprays can fill the box more aggressively
  return isMobile ? 'p-0' : 'p-12';
};

