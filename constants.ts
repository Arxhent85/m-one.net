
import { BrickWall, SprayCan, Sparkles, Wrench } from 'lucide-react';

export const NAV_LINKS = [
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

  // 500ml products (UBS and Bremsenreiniger) — slightly larger than standard 400ml sprays
  if (path.includes('ubs') || path.includes('bremsen')) {
    return isMobile ? 'scale-[1.55]' : 'scale-[1.50]';
  }

  // Colors products specifically — adjusted to visually match Service 400ml sizes
  if (path.includes('/colors/')) {
    return isMobile ? 'scale-[1.30]' : 'scale-[1.25]';
  }

  // Cleaning products
  if (path.includes('/cleaning/')) {
    // 4 Liter canisters
    if (path.includes('-4l')) {
      return isMobile ? 'scale-[1.15]' : 'scale-[1.10]';
    }
    // Granular adjustments for 750ml bottles to match the "smaller" visual size of the first one
    if (path.includes('universal-750ml')) return isMobile ? 'scale-[1.35]' : 'scale-[1.30]';
    if (path.includes('antikalk-750ml')) return isMobile ? 'scale-[1.05]' : 'scale-[1.00]';
    if (path.includes('auto-innen-750ml')) return isMobile ? 'scale-[1.05]' : 'scale-[1.00]';
    if (path.includes('kamin-750ml')) return isMobile ? 'scale-[0.85]' : 'scale-[0.80]';

    return isMobile ? 'scale-[1.10]' : 'scale-[1.05]';
  }

  // Non-Bau products (Sprays, Service) — all standardized to the same size
  if (path.includes('/service/') || path.includes('spray') || path.includes('starter') || path.includes('zink')) {
    // All standard 400ml service sprays get the same scale
    return isMobile ? 'scale-[1.40]' : 'scale-[1.35]';
  }

  // Bau products (Cartridges)
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
 * Standardizes category slug generation across the application.
 * Maps internal category keys (e.g., 'service') to the desired URL slugs.
 */
export const getCategoryHref = (categoryId: string) => {
  const slug = categoryId === 'service' ? 'service--kfz' : categoryId;
  return `/produkte/${slug}`;
};

/**
 * Maps URL category slugs to internal translation keys.
 */
export const CATEGORY_SLUG_MAP: Record<string, string> = {
  'service--kfz': 'service',
  'service': 'service',
  'shërbim': 'service',
  'bau': 'bau',
  'construction': 'bau',
  'ndërtim': 'bau',
  'colors': 'colors',
  'ngjyrat': 'colors',
  'cleaning': 'cleaning'
};

/**
 * Standardizes slug generation across the application.
 */
export const slugify = (text: string) => 
  text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]/g, '');
