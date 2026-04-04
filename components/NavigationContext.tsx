
import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export type PageType = 'home' | 'category' | 'product';

interface NavigationContextType {
  currentPage: PageType;
  selectedCategoryId: string | null;
  selectedProduct: any | null;
  goHome: () => void;
  navigateToCategory: (categoryId: string) => void;
  navigateToProduct: (product: any) => void;
}

const NavigationContext = React.createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentPage, setCurrentPage] = React.useState<PageType>('home');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(null);

  // Sync state with pathname
  React.useEffect(() => {
    if (pathname === '/') {
      setCurrentPage('home');
      setSelectedCategoryId(null);
      setSelectedProduct(null);
    } else if (pathname.startsWith('/produkte/')) {
      const parts = pathname.split('/');
      // /produkte/[catId]
      const catId = parts[2];
      setCurrentPage('category');
      setSelectedCategoryId(catId || null);
    }
  }, [pathname]);

  const goHome = () => {
    router.push('/');
  };

  const navigateToCategory = (categoryId: string) => {
    router.push(`/produkte/${categoryId}`);
  };

  const navigateToProduct = (product: any) => {
    // Keep internal state for product modal/view within category for now 
    // unless we want separate URLs for each product too.
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{
      currentPage,
      selectedCategoryId,
      selectedProduct,
      goHome,
      navigateToCategory,
      navigateToProduct
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
