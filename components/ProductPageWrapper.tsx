
"use client";

import React from "react";
import ProductPage from "./ProductPage";
import { useLanguage } from "./LanguageContext";
import { useNavigation } from "./NavigationContext";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductPageWrapperProps {
  productIndex: number;
  categoryId: string;
}

export default function ProductPageWrapper({ productIndex, categoryId }: ProductPageWrapperProps) {
  const { getCategoryData, t } = useLanguage();
  
  // Find the product in the category
  const category = getCategoryData(categoryId);
  const product = category.products?.[productIndex];

  if (!product) {
    return (
      <div className="pt-24 min-h-screen container mx-auto px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Produkt nicht gefunden</h1>
        <Link href={`/produkte/${categoryId}`} className="text-brand-500 underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Zurück zur Kategorie
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="container mx-auto px-6 mb-8">
        <Link 
          href={`/produkte/${categoryId}`} 
          className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold"
        >
          <ArrowLeft size={14} /> {t.products.backToCategory}
        </Link>
      </div>
      <ProductPage product={product} />
    </div>
  );
}
