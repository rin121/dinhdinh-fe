export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  long_description?: string;
  image: string;
  badge?: string;
  category_id: number;
  gallery: string[];
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category: Category;
  details: ProductDetail[];
  ingredients: Ingredient[];
  allergens: Allergen[];
  // Computed properties for backward compatibility
  price?: string; // Will be computed from details
  longDescription?: string; // Alias for long_description
  sizes?: Array<{ size: string; price: string; servings: string }>;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  type: string;
  description?: string;
  is_active?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductDetail {
  id: number;
  product_id: number;
  size: string;
  price: string;
  price_display: string;
  servings: string;
  description?: string;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: number;
  product_id: number;
  name: string;
  description?: string;
  type: string;
  is_main: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Allergen {
  id: number;
  product_id: number;
  name: string;
  description?: string;
  severity: string;
  icon?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Cart Types
export interface CartItem {
  id: string; // unique identifier for cart item
  productId: number;
  productSlug: string;
  productName: string;
  productImage: string;
  selectedSize: string;
  selectedSizeId: number;
  price: number; // price in VND (numeric)
  priceDisplay: string; // formatted price like "250.000đ"
  quantity: number;
  servings: string;
  addedAt: Date;
}

export interface CartSummary {
  totalItems: number;
  totalQuantity: number;
  subtotal: number;
  subtotalDisplay: string;
  shipping: number;
  shippingDisplay: string;
  total: number;
  totalDisplay: string;
}

export interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  isOpen: boolean;
  addItem: (product: Product, sizeDetail: ProductDetail, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  forceClearCart: () => void; // Debug function
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  };
}

export interface ProductsApiResponse extends PaginatedResponse<Product> {} 