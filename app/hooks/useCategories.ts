'use client';

import { useState, useEffect } from 'react';
import { categoriesApi, Category } from '../lib/api';

interface UseCategoriesReturn {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface UseCategoriesOptions {
  type?: string;
  activeOnly?: boolean;
  search?: string;
  status?: string;
}

export function useCategories(options: UseCategoriesOptions = {}): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let response;
      
      if (options.activeOnly) {
        response = await categoriesApi.getActive();
      } else if (options.type) {
        response = await categoriesApi.getByType(options.type);
      } else {
        response = await categoriesApi.getAll({
          type: options.type,
          search: options.search,
          status: options.status,
        });
      }
      
      if (response.success && response.data) {
        setCategories(response.data);
      } else {
        throw new Error(response.message || 'Không thể lấy dữ liệu danh mục');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải danh mục');
      
      // Fallback to default categories
      setCategories([
        { id: 1, name: 'Bánh sinh nhật', icon: '🎂', type: 'birthday', is_active: true, sort_order: 1, created_at: '', updated_at: '' },
        { id: 2, name: 'Bánh cưới', icon: '💒', type: 'wedding', is_active: true, sort_order: 2, created_at: '', updated_at: '' },
        { id: 3, name: 'Bánh chocolate', icon: '🍫', type: 'chocolate', is_active: true, sort_order: 3, created_at: '', updated_at: '' },
        { id: 4, name: 'Bánh trái cây', icon: '🍓', type: 'fruit', is_active: true, sort_order: 4, created_at: '', updated_at: '' },
        { id: 5, name: 'Bánh đặc biệt', icon: '⭐', type: 'special', is_active: true, sort_order: 5, created_at: '', updated_at: '' },
        { id: 6, name: 'Bánh cupcake', icon: '🧁', type: 'cupcake', is_active: true, sort_order: 6, created_at: '', updated_at: '' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [options.type, options.activeOnly, options.search, options.status]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}

// Hook để lấy category types
export function useCategoryTypes() {
  const [types, setTypes] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        setIsLoading(true);
        const response = await categoriesApi.getTypes();
        
        if (response.success && response.data) {
          setTypes(response.data);
        } else {
          throw new Error(response.message || 'Không thể lấy loại danh mục');
        }
      } catch (err) {
        console.error('Error fetching category types:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        
        // Fallback types
        setTypes({
          birthday: 'Bánh sinh nhật',
          wedding: 'Bánh cưới',
          chocolate: 'Bánh chocolate',
          fruit: 'Bánh trái cây',
          special: 'Bánh đặc biệt',
          cupcake: 'Bánh cupcake',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTypes();
  }, []);

  return { types, isLoading, error };
} 