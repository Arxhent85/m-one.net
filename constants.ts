
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
