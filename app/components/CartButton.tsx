'use client';

import { useCart } from '../contexts/CartContext';

export default function CartButton() {
  const { summary, toggleCart } = useCart();

  return (
    <button 
      onClick={toggleCart}
      className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors group"
      title="Giỏ hàng"
    >
      {/* Cart Icon */}
      <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      
      {/* Badge */}
      {summary.totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-semibold animate-pulse">
          {summary.totalQuantity > 99 ? '99+' : summary.totalQuantity}
        </span>
      )}
      
      {/* Tooltip */}
      <div className="absolute right-0 top-full mt-2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        {summary.totalQuantity > 0 ? `${summary.totalQuantity} sản phẩm` : 'Giỏ hàng trống'}
      </div>
    </button>
  );
} 