import React from "react";
import ProductPageWrapper from "../../../../components/ProductPageWrapper";
import { Metadata } from "next";
import { translations } from "../../../../translations";
import { CATEGORY_SLUG_MAP, slugify } from "../../../../constants";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

/**
 * Finds a product index and categoryId by searching across all languages if necessary.
 */
async function findProduct(categorySlug: string, productSlug: string) {
  const categoryId = (CATEGORY_SLUG_MAP[categorySlug] || categorySlug) as keyof typeof translations.de.categories;
  const deCategoryData = (translations.de.categories as any)[categoryId];
  
  if (!deCategoryData || !deCategoryData.products) return null;

  // 1. Try canonical German match (fastest)
  let productIndex = deCategoryData.products.findIndex((p: any) => slugify(p.name) === productSlug);

  // 2. Fallback: Search in other languages (EN, SQ) for legacy/translated slugs
  if (productIndex === -1) {
    const languages: (keyof typeof translations)[] = ['en', 'sq'];
    for (const lang of languages) {
      const langCatData = (translations[lang].categories as any)[categoryId];
      if (langCatData && langCatData.products) {
        const foundIdx = langCatData.products.findIndex((p: any) => slugify(p.name) === productSlug);
        if (foundIdx !== -1) {
          productIndex = foundIdx;
          break;
        }
      }
    }
  }

  if (productIndex === -1) return null;

  return {
    categoryId,
    productIndex,
    canonicalSlug: slugify(deCategoryData.products[productIndex].name),
    canonicalCategorySlug: categoryId === 'service' ? 'service--kfz' : categoryId
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const result = await findProduct(category, slug);
  
  if (!result) return { title: "M ONE | Produkt nicht gefunden" };
  
  const categoryData = (translations.de.categories as any)[result.categoryId];
  const product = categoryData.products[result.productIndex];
  
  return {
    title: `M ONE | ${product.name} - ${categoryData.title}`,
    description: product.description?.substring(0, 160) || `Entdecken Sie ${product.name} von M ONE.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category, slug } = await params;
  const result = await findProduct(category, slug);
  
  if (!result) return <div className="pt-32 text-center">Produkt nicht gefunden</div>;

  // Enforce canonical URL: Redirect if the current URL doesn't match the canonical German slug
  // or if the category slug is an old translated one.
  if (slug !== result.canonicalSlug || category !== result.canonicalCategorySlug) {
    redirect(`/produkte/${result.canonicalCategorySlug}/${result.canonicalSlug}`);
  }

  return <ProductPageWrapper productIndex={result.productIndex} categoryId={result.categoryId} />;
}
