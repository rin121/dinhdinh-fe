'use client';

import { useState, useEffect } from 'react';
import { settingsApi, MenuItem } from '../lib/api';
import { DEFAULT_MENU } from '../config/api';

interface UseMenuReturn {
  menuItems: MenuItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMenu(): UseMenuReturn {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await settingsApi.getMenu();
      
      if (response.success && response.data?.value) {
        setMenuItems(response.data.value as MenuItem[]);
      } else {
        throw new Error(response.message || 'Không thể lấy dữ liệu menu');
      }
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tải menu');
      
      // Fallback to default menu
      setMenuItems(DEFAULT_MENU);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return {
    menuItems,
    isLoading,
    error,
    refetch: fetchMenu,
  };
} 