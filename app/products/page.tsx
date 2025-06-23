'use client';

import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Product } from '../data/types';
import { useCategories } from '../hooks/useCategories';
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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const { categories } = useCategories({ activeOnly: true });
  
  // Use API to fetch products with filters
  const { 
    products, 
    loading, 
    filtering,
    error, 
    pagination 
  } = useProducts({
    category_id: selectedCategory === 'all' ? undefined : 
                 !isNaN(parseInt(selectedCategory)) ? parseInt(selectedCategory) : undefined,
    search: searchTerm || undefined,
    sort_by: sortBy.includes('-') ? sortBy.split('-')[0] : sortBy,
    sort_order: sortBy.includes('-desc') ? 'desc' : 'asc',
    active_only: true,
    per_page: 12
  });

  // Convert API products to ProductCard format
  const productCards: ProductCardData[] = useMemo(() => {
    return products.map((product: Product) => ({
      id: product.id,
      name: product.name,
      price: product.details.length > 0 ? product.details[0].price_display : 'Liên hệ',
      image: product.image,
      description: product.description,
      badge: product.badge,
      slug: product.slug
    }));
  }, [products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <main className="pt-20">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-pink-400 to-purple-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Sản Phẩm Của Chúng Tôi</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Khám phá bộ sưu tập bánh kem đa dạng với nhiều hương vị và thiết kế độc đáo
            </p>
          </div>
        </section>

        {/* Categories */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Products Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Sort */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm bánh kem..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 placeholder-gray-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 text-sm border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-gray-700"
                >
                  <option value="name">Tên A-Z</option>
                  <option value="name-desc">Tên Z-A</option>
                  <option value="created_at-desc">Mới nhất</option>
                  <option value="created_at">Cũ nhất</option>
                </select>
                {pagination && (
                  <span className="text-gray-600 font-medium whitespace-nowrap">
                    {pagination.total} sản phẩm
                  </span>
                )}
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedCategory === 'all' ? 'Tất Cả Sản Phẩm' : 
                 categories.find((c) => c.id.toString() === selectedCategory)?.name || 'Danh mục'}
              </h2>
              {searchTerm && (
                <p className="text-gray-600 mb-4">
                  Kết quả tìm kiếm cho: &quot;<span className="font-semibold">{searchTerm}</span>&quot;
                </p>
              )}
            </div>
            
            {productCards.length > 0 || filtering ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filtering ? (
                    // Show skeleton loading during filtering
                    Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-100 animate-pulse">
                        <div className="bg-gray-200 rounded-t-2xl h-48"></div>
                        <div className="p-5">
                          <div className="h-6 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="flex items-center justify-between">
                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                            <div className="h-10 bg-gray-200 rounded-full w-10"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    products.map((product: Product) => (
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
                    ))
                  )}
                </div>
                
                {/* Pagination info */}
                {pagination && pagination.total > pagination.per_page && (
                  <div className="mt-12 text-center">
                    <p className="text-gray-600">
                      Hiển thị {productCards.length} trong tổng số {pagination.total} sản phẩm
                    </p>
                    {pagination.has_more && (
                      <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                        Xem thêm
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? `Không có sản phẩm nào phù hợp với "${searchTerm}"`
                    : 'Hãy thử chọn danh mục khác hoặc quay lại sau'
                  }
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 