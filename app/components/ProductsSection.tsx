'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from './LoadingSpinner';
import { Product } from '../data/types';
import { useProducts } from '../hooks/useProducts';

interface ProductCardData {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
  slug: string;
}

export default function ProductsSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Use API to fetch products
  const { 
    products, 
    loading, 
    error 
  } = useProducts({
    category_type: selectedCategory === 'all' ? undefined : selectedCategory,
    active_only: true,
    per_page: 8 // Show only 8 products on homepage
  });

  // Convert API products to ProductCard format
  const productCards: ProductCardData[] = products.map((product: Product) => ({
    id: product.id,
    name: product.name,
    price: product.details.length > 0 ? product.details[0].price_display : 'Liên hệ',
    image: product.image,
    description: product.description,
    badge: product.badge,
    slug: product.slug
  }));

  if (loading) {
    return (
      <section id="products" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá những chiếc bánh kem tuyệt vời được làm thủ công với tình yêu
            </p>
          </div>
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Sản Phẩm Nổi Bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá những chiếc bánh kem tuyệt vời được làm thủ công với tình yêu
            </p>
          </div>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">Sản Phẩm Nổi Bật</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những chiếc bánh kem tuyệt vời được làm thủ công với tình yêu
          </p>
        </div>

        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {productCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-slide-in-up">
            {products.map((product: Product) => (
              <ProductCard 
                key={product.id}
                name={product.name}
                price={product.details.length > 0 ? product.details[0].price_display : 'Liên hệ'}
                image={product.image}
                description={product.description}
                badge={product.badge}
                slug={product.slug}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Chưa có sản phẩm</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all' 
                ? 'Hiện tại chưa có sản phẩm nào'
                : 'Danh mục này chưa có sản phẩm nào'
              }
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Xem Tất Cả Sản Phẩm
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 