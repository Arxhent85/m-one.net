
"use client";

import React from "react";
import ProductPage from "./ProductPage";
import { useLanguage } from "./LanguageContext";
import { useNavigation } from "./NavigationContext";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoryHref } from "../constants";


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
        <Link href={getCategoryHref(categoryId)} className="text-brand-500 underline flex items-center justify-center gap-2">
          <ArrowLeft size={16} /> Zurück zur Kategorie
        </Link>
      </div>
    );
  }

  return (
    <>
      <ProductPage product={product} categoryId={categoryId} />
    </>
  );
}
