export interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  image: string;
  description: string;
  longDescription: string;
  badge: string;
  category: string;
  gallery: string[];
  sizes: Array<{ size: string; price: string; servings: string }>;
  ingredients: string[];
  allergens: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
} 