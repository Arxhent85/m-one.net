
import * as React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SketchGrid from './components/SketchGrid';
import About from './components/About';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import ProductPage from './components/ProductPage';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';
import { NavigationProvider, useNavigation } from './components/NavigationContext';
import { AnimatePresence, motion } from 'motion/react';

const MainContent: React.FC = () => {
  const { currentPage, selectedCategoryId, selectedProduct } = useNavigation();
  const { getCategoryData } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'product' && selectedProduct && (
        <motion.div
          key="product"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col min-h-screen w-full"
        >
          <Navbar />
          <main className="flex-grow pt-24">
            <ProductPage product={selectedProduct} />
          </main>
          <Footer />
        </motion.div>
      )}

      {currentPage === 'category' && selectedCategoryId && (
        <motion.div
          key="category"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col min-h-screen w-full"
        >
          <Navbar />
          <main className="flex-grow pt-24">
            <CategoryPage category={getCategoryData(selectedCategoryId)} />
          </main>
          <Footer />
        </motion.div>
      )}

      {currentPage === 'home' && (
        <motion.div
          key="home"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col min-h-screen w-full"
        >
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <SketchGrid />
            <About />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <NavigationProvider>
          <div className="font-sans text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 min-h-screen flex flex-col transition-colors duration-300">
            <MainContent />
          </div>
        </NavigationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
