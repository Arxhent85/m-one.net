"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SketchGrid from "../components/SketchGrid";
import About from "../components/About";
import Footer from "../components/Footer";
import CategoryPage from "../components/CategoryPage";
import ProductPage from "../components/ProductPage";
import { useLanguage } from "../components/LanguageContext";
import { useNavigation } from "../components/NavigationContext";
import { AnimatePresence, motion } from "motion/react";

export default function HomePage() {
  const { currentPage, selectedCategoryId, selectedProduct } = useNavigation();
  const { getCategoryData } = useLanguage();
  
  // To avoid hydration mismatch if accessing localstorage during initial render (e.g., Theme/Language),
  // we ensure the app only renders purely after mounting in client, though navigation defaults usually match.
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
          <Footer variant="compact" />
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
}
