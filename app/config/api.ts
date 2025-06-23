// API Configuration
export const API_CONFIG = {
  // BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  // BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000',
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://banhkemlagi.com/api',
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'https://banhkemlagi.com',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

export const ENDPOINTS = {
  SETTINGS: '/settings',
  SETTINGS_MENU: '/settings/menu',
  SETTINGS_BULK: '/settings/bulk',
  CATEGORIES: '/categories',
  CATEGORIES_ACTIVE: '/categories/active',
  CATEGORIES_BY_TYPE: '/categories/type',
  CATEGORIES_TYPES: '/categories/types',
} as const;

export const DEFAULT_MENU = [
  { url: '/', label: 'Trang chủ', icon: 'home' },
  { url: '/products', label: 'Sản phẩm', icon: 'cake' },
  { url: '/blog', label: 'Góc Đình Đình', icon: 'book' },
  { url: '/#about', label: 'Về chúng tôi', icon: 'info' },
  { url: '/#contact', label: 'Liên hệ', icon: 'phone' },
]; 