
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
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  return <PremiumCategoryView category={category} />;
};

export default CategoryPage;
