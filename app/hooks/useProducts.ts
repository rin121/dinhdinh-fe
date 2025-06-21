import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api';
import { Product, ProductsApiResponse } from '../data/types';

interface UseProductsOptions {
  category_id?: number;
  category_type?: string;
  badge?: string;
  search?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  per_page?: number;
  active_only?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    has_more: boolean;
  } | null;
  refetch: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<UseProductsReturn['pagination']>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      
      if (options.category_id) params.append('category_id', options.category_id.toString());
      if (options.category_type) params.append('category_type', options.category_type);
      if (options.badge) params.append('badge', options.badge);
      if (options.search) params.append('search', options.search);
      if (options.sort_by) params.append('sort_by', options.sort_by);
      if (options.sort_order) params.append('sort_order', options.sort_order);
      if (options.per_page) params.append('per_page', options.per_page.toString());
      if (options.active_only !== undefined) params.append('active_only', options.active_only.toString());

      const response = await apiClient.get<ProductsApiResponse>(`/products?${params.toString()}`);
      
      if (response.success) {
        // Process products to add computed properties for backward compatibility
        const processedProducts = response.data.map((product: Product) => ({
          ...product,
          // Add computed price from details
          price: product.details.length > 0 ? product.details[0].price_display : 'Liên hệ',
          // Add alias for long_description
          longDescription: product.long_description,
          // Add sizes array for backward compatibility
          sizes: product.details.map((detail: any) => ({
            size: detail.size,
            price: detail.price_display,
            servings: detail.servings
          }))
        }));

        setProducts(processedProducts);
        setPagination(response.pagination);
      } else {
        setError('Không thể tải danh sách sản phẩm');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Có lỗi xảy ra khi tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    options.category_id,
    options.category_type,
    options.badge,
    options.search,
    options.sort_by,
    options.sort_order,
    options.per_page,
    options.active_only
  ]);

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchProducts
  };
}

// Hook for featured products
export function useFeaturedProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<{ success: boolean; data: Product[] }>('/products/featured');
      
      if (response.success) {
        const processedProducts = response.data.map((product: Product) => ({
          ...product,
          price: product.details.length > 0 ? product.details[0].price_display : 'Liên hệ',
          longDescription: product.long_description,
          sizes: product.details.map((detail: any) => ({
            size: detail.size,
            price: detail.price_display,
            servings: detail.servings
          }))
        }));

        setProducts(processedProducts);
      } else {
        setError('Không thể tải sản phẩm nổi bật');
      }
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setError('Có lỗi xảy ra khi tải sản phẩm nổi bật');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return {
    products,
    loading,
    error,
    pagination: null,
    refetch: fetchFeaturedProducts
  };
}

// Hook for products by category
export function useProductsByCategory(categoryType: string): UseProductsReturn {
  return useProducts({ category_type: categoryType, active_only: true });
}

// Hook for product search
export function useProductSearch(query: string): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = async () => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get<{ success: boolean; data: Product[]; query: string; count: number }>(`/products/search?q=${encodeURIComponent(query)}`);
      
      if (response.success) {
        const processedProducts = response.data.map((product: Product) => ({
          ...product,
          price: product.details.length > 0 ? product.details[0].price_display : 'Liên hệ',
          longDescription: product.long_description,
          sizes: product.details.map((detail: any) => ({
            size: detail.size,
            price: detail.price_display,
            servings: detail.servings
          }))
        }));

        setProducts(processedProducts);
      } else {
        setError('Không thể tìm kiếm sản phẩm');
      }
    } catch (err) {
      console.error('Error searching products:', err);
      setError('Có lỗi xảy ra khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchProducts();
    }, 300); // Debounce search

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return {
    products,
    loading,
    error,
    pagination: null,
    refetch: searchProducts
  };
} 