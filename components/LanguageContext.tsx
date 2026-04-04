
import * as React from 'react';
import { translations } from '../translations';
import { CATEGORY_CONFIG, slugify } from '../constants';

type Language = 'de' | 'en' | 'sq';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['de'];
  getCategoryData: (id: string) => any;
  getAllProducts: () => any[];
  getProductByImage: (imageUrl: string) => any | null;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>('de');

  const t = translations[language];

  // Helper to merge static config (Images/Icons) with dynamic translations (Text/Products)
  const getCategoryData = (id: string) => {
    const config = CATEGORY_CONFIG[id as keyof typeof CATEGORY_CONFIG];
    const textData = t.categories[id as keyof typeof t.categories];

    return {
      ...config,
      ...textData,
    };
  };

  const getAllProducts = () => {
    const allProducts: any[] = [];
    Object.keys(CATEGORY_CONFIG).forEach(key => {
      const catData = t.categories[key as keyof typeof t.categories];
      if (catData && catData.products) {
        // Generate category slug from title (e.g., "SERVICE & KFZ" -> "service--kfz")
        const categorySlug = slugify(catData.title);
        
        catData.products.forEach(p => {
          allProducts.push({
            ...p,
            categoryId: key,
            categorySlug: categorySlug,
            categoryName: catData.title,
            slug: slugify(p.name)
          });
        });
      }
    });
    return allProducts;
  };

  const getProductByImage = (imageUrl: string) => {
    return getAllProducts().find(p => p.image === imageUrl) || null;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getCategoryData, getAllProducts, getProductByImage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
