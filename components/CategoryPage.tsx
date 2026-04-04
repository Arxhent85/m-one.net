
import * as React from 'react';
import PremiumCategoryView from './PremiumCategoryView';

interface Product {
  name: string;
  image: string;
  description?: string;
  categoryName?: string;
}

interface Category {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  applications?: string;
  projects?: string;
  madeInGermany?: string;
  learnMore?: string;
  products?: Product[];
}

interface CategoryPageProps {
  category: Category;
  categoryId: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, categoryId }) => {
  return <PremiumCategoryView category={category} categoryId={categoryId} />;
};

export default CategoryPage;
