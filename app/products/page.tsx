'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchAndSort from '../components/SearchAndSort';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { allProducts } from '../data/products';
import { Product, Category } from '../data/types';
import { useCategories } from '../hooks/useCategories';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(true);
  const { categories } = useCategories({ activeOnly: true });

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = selectedCategory === 'all' 
      ? allProducts 
      : allProducts.filter((product: Product) => product.category === selectedCategory);

    // Tìm kiếm
    if (searchTerm) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp
    filtered.sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'price-desc':
          return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortBy]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <main className="pt-20">
          <LoadingSpinner />
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
            {/* <SearchAndSort
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalProducts={filteredAndSortedProducts.length}
            /> */}

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedCategory === 'all' ? 'Tất Cả Sản Phẩm' : 
                 categories.find((c) => c.id.toString() === selectedCategory)?.name}
              </h2>
              {searchTerm && (
                <p className="text-gray-600 mb-4">
                  Kết quả tìm kiếm cho: "<span className="font-semibold">{searchTerm}</span>"
                </p>
              )}
            </div>
            
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAndSortedProducts.map((product: Product, index: number) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
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