
import React from "react";
import ProductPageWrapper from "../../../../components/ProductPageWrapper";
import { Metadata } from "next";
import { translations } from "../../../../translations";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Function to slugify names for comparison
const slugify = (text: string) => text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as keyof typeof translations.de.categories;
  const categoryData = (translations.de.categories as any)[categoryId];
  
  if (!categoryData) return { title: "Projekt M ONE" };
  
  const product = categoryData.products?.find((p: any) => slugify(p.name) === resolvedParams.slug);
  
  if (!product) return { title: `M ONE | ${categoryData.title}` };
  
  return {
    title: `M ONE | ${product.name} - ${categoryData.title}`,
    description: product.description?.substring(0, 160) || `Entdecken Sie ${product.name} von M ONE.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.category as keyof typeof translations.de.categories;
  const categoryData = (translations.de.categories as any)[categoryId];
  
  if (!categoryData) return <div>Kategorie nicht gefunden</div>;
  
  const product = categoryData.products?.find((p: any) => slugify(p.name) === resolvedParams.slug);

  if (!product) return <div>Produkt nicht gefunden</div>;

  return <ProductPageWrapper productName={product.name} categoryId={resolvedParams.category} />;
}
