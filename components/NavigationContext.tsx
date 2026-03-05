
import * as React from 'react';

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
  const [currentPage, setCurrentPage] = React.useState<PageType>('home');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = React.useState<any | null>(null);

  React.useEffect(() => {
    // Initialize current state on mount so it's not null when we pop back to it
    if (!window.history.state) {
      window.history.replaceState({ page: 'home', categoryId: null, product: null }, '');
    }

    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.page) {
        setCurrentPage(state.page);
        setSelectedCategoryId(state.categoryId || null);
        setSelectedProduct(state.product || null);
      } else {
        // Fallback
        setCurrentPage('home');
        setSelectedCategoryId(null);
        setSelectedProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const goHome = () => {
    if (currentPage !== 'home') {
      window.history.pushState({ page: 'home', categoryId: null, product: null }, '');
    }
    setCurrentPage('home');
    setSelectedCategoryId(null);
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const navigateToCategory = (categoryId: string) => {
    window.history.pushState({ page: 'category', categoryId, product: null }, '');
    setSelectedCategoryId(categoryId);
    setCurrentPage('category');
    window.scrollTo(0, 0);
  };

  const navigateToProduct = (product: any) => {
    window.history.pushState({ page: 'product', categoryId: selectedCategoryId, product }, '');
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
