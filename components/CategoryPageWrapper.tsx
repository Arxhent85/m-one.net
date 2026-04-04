
"use client";

import React from "react";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import { useLanguage } from "./LanguageContext";
import { useNavigation } from "./NavigationContext";
import { motion, AnimatePresence } from "motion/react";

interface CategoryPageWrapperProps {
  categoryId: string;
}

export default function CategoryPageWrapper({ categoryId }: CategoryPageWrapperProps) {
  const { getCategoryData } = useLanguage();
  const { currentPage, selectedProduct } = useNavigation();

  return (
    <div className="pt-24 min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === 'product' && selectedProduct ? (
          <motion.div
            key="product"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductPage product={selectedProduct} />
          </motion.div>
        ) : (
          <motion.div
            key="category"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryPage category={getCategoryData(categoryId)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
