import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Product } from '../data/types';
import ImageDisplay from './ImageDisplay';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
  slug: string;
  product?: Product; // Optional full product data for add to cart
}

export default function ProductCard({ name, price, image, description, badge, slug, product }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();

    if (!product || !product.details || product.details.length === 0) {
      // If no product data, redirect to product page
      window.location.href = `/products/${slug}`;
      return;
    }

    setIsAdding(true);
    
    try {
      // Add the first size option by default
      addItem(product, product.details[0], 1);
      
      // Brief delay then open cart
      setTimeout(() => {
        setIsAdding(false);
        openCart();
      }, 500);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
        <div className="relative flex-grow">
          <div className="rounded-t-2xl overflow-hidden">
            <ImageDisplay
              images={product?.images}
              primaryImage={product?.primary_image}
              fallbackImage={image}
              size="md"
              showGallery={false}
              alt={name}
            />
          </div>
          {badge && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
              {badge}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-1 flex-grow">{name}</h3>
          <p className="text-sm text-gray-500 mb-4 h-10">{description}</p>
          
          {/* Price and Add to Cart Button */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-extrabold text-pink-500">{price}</span>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              title="Thêm vào giỏ hàng"
            >
              {isAdding ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
} 