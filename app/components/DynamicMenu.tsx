'use client';

import Link from 'next/link';
import { useMenu } from '../hooks/useMenu';
import { MenuItem } from '../lib/api';

interface DynamicMenuProps {
  className?: string;
  itemClassName?: string;
  onItemClick?: () => void;
}

const iconMap: Record<string, string> = {
  home: '🏠',
  cake: '🍰', 
  book: '📖',
  info: 'ℹ️',
  phone: '📞',
  'shopping-cart': '🛒',
  users: '👥',
  'chart-bar': '📊',
  settings: '⚙️',
};

export default function DynamicMenu({ 
  className = "hidden md:flex space-x-8", 
  itemClassName = "text-gray-700 hover:text-pink-500 transition-colors font-medium",
  onItemClick 
}: DynamicMenuProps) {
  const { menuItems, isLoading, error } = useMenu();

  // Loading state
  if (isLoading) {
    return (
      <nav className={className}>
        <div className="flex space-x-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="h-6 w-16 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>
      </nav>
    );
  }

  // Error state - fallback to static menu
  if (error) {
    console.warn('Menu API error, using fallback:', error);
    return (
      <nav className={className}>
        <Link href="/" className={itemClassName} onClick={onItemClick}>
          Trang chủ
        </Link>
        <Link href="/products" className={itemClassName} onClick={onItemClick}>
          Sản phẩm
        </Link>
        <Link href="/blog" className={itemClassName} onClick={onItemClick}>
          Góc Đình Đình
        </Link>
        <Link href="/#about" className={itemClassName} onClick={onItemClick}>
          Về chúng tôi
        </Link>
        <Link href="/#contact" className={itemClassName} onClick={onItemClick}>
          Liên hệ
        </Link>
      </nav>
    );
  }

  // Render dynamic menu from API
  return (
    <nav className={className}>
      {menuItems.map((item: MenuItem, index: number) => {
        const icon = iconMap[item.icon] || '';
        const isAnchor = item.url.startsWith('#') || item.url.includes('/#');
        
        if (isAnchor) {
          return (
            <a 
              key={index}
              href={item.url} 
              className={itemClassName}
              onClick={onItemClick}
            >
              <span className="flex items-center gap-1">
                {icon && <span className="text-sm">{icon}</span>}
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <Link 
            key={index}
            href={item.url} 
            className={itemClassName}
            onClick={onItemClick}
          >
            <span className="flex items-center gap-1">
              {icon && <span className="text-sm">{icon}</span>}
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
} 