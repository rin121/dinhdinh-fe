'use client';

import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Product, ProductDetail } from '../data/types';

interface AddToCartButtonProps {
  product: Product;
  selectedSize?: ProductDetail;
  quantity?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showQuantitySelector?: boolean;
}

export default function AddToCartButton({ 
  product, 
  selectedSize, 
  quantity = 1, 
  className = '',
  size = 'md',
  showQuantitySelector = false
}: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [currentQuantity, setCurrentQuantity] = useState(quantity);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sizeDetail = selectedSize || (product.details && product.details[0]);

  const handleAddToCart = async () => {
    if (!sizeDetail) {
      alert('Vui lòng chọn kích thước bánh');
      return;
    }

    setIsAdding(true);
    
    try {
      addItem(product, sizeDetail, currentQuantity);
      
      // Show success animation
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        openCart(); // Open cart after adding
      }, 1000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    } finally {
      setIsAdding(false);
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const baseClasses = `
    ${sizeClasses[size]}
    bg-gradient-to-r from-pink-500 to-purple-600 
    text-white font-semibold rounded-full 
    hover:from-pink-600 hover:to-purple-700 
    transition-all duration-300 transform hover:scale-105 
    shadow-lg hover:shadow-xl
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    flex items-center justify-center space-x-2
    ${className}
  `;

  if (showSuccess) {
    return (
      <button className={`${baseClasses} bg-green-500 hover:bg-green-500`} disabled>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>Đã thêm!</span>
      </button>
    );
  }

  return (
    <div className="space-y-3">
      {/* Quantity Selector */}
      {showQuantitySelector && (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Số lượng:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentQuantity(Math.max(1, currentQuantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              disabled={currentQuantity <= 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="w-12 text-center font-semibold text-lg">{currentQuantity}</span>
            
            <button
              onClick={() => setCurrentQuantity(currentQuantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || !sizeDetail}
        className={baseClasses}
      >
        {isAdding ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Đang thêm...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>Thêm vào giỏ hàng</span>
          </>
        )}
      </button>

      {/* Size Info */}
      {sizeDetail && (
        <div className="text-sm text-gray-600 text-center">
          <p>{sizeDetail.size} - {sizeDetail.price_display}</p>
          <p>{sizeDetail.servings}</p>
        </div>
      )}
    </div>
  );
} 