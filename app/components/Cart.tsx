'use client';

import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Cart() {
  const { items, summary, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle cart opening/closing
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimating(false);
    } else if (shouldRender) {
      // Cart is being closed, start animation
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    closeCart();
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
      clearCart();
    }
  };

  if (!shouldRender) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-500 ease-out ${
          isAnimating ? 'opacity-0 backdrop-blur-none' : 'opacity-100 backdrop-blur-sm'
        }`}
        onClick={handleClose}
      />
      
      {/* Cart Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-all duration-500 ease-out ${
          isAnimating ? 'translate-x-full opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2">🛒</span>
            Giỏ hàng ({summary.totalQuantity})
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Giỏ hàng trống</h3>
              <p className="text-gray-600 mb-6">Hãy thêm một số sản phẩm tuyệt vời vào giỏ hàng!</p>
              <Link
                href="/products"
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{item.productImage}</span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/products/${item.productSlug}`}
                          onClick={handleClose}
                          className="font-semibold text-gray-800 hover:text-pink-600 transition-colors line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          Kích thước: {item.selectedSize}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.servings}
                        </p>
                        <p className="text-lg font-bold text-pink-600 mt-2">
                          {item.priceDisplay}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Tổng cộng</p>
                        <p className="font-bold text-pink-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            minimumFractionDigits: 0
                          }).format(item.price * item.quantity).replace('₫', 'đ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary & Actions */}
              <div className="border-t border-gray-200 p-4 pb-8 bg-gray-50">
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className="w-full mb-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Xóa tất cả sản phẩm
                  </button>
                )}

                {/* Summary */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-base text-gray-700">
                    <span className="font-medium">Tạm tính ({summary.totalQuantity} sản phẩm):</span>
                    <span className="font-semibold">{summary.subtotalDisplay}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-xl">
                      <span className="text-gray-800">Tổng cộng:</span>
                      <span className="text-pink-600">{summary.totalDisplay}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Thanh toán ngay
                  </button>
                  <Link
                    href="/products"
                    onClick={handleClose}
                    className="block w-full py-3 text-center border-2 border-pink-500 text-pink-600 font-semibold rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    Tiếp tục mua sắm
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
} 