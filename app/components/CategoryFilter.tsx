'use client';

import { useCategories } from '../hooks/useCategories';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const { categories, isLoading, error } = useCategories({ activeOnly: true });
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-gray-600">Chọn danh mục bạn quan tâm</p>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-4 rounded-lg border-2 border-gray-200 bg-white animate-pulse">
                <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">Có lỗi xảy ra khi tải danh mục: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {!isLoading && !error && categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Add "All" category */}
            <button
              onClick={() => onCategoryChange('all')}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                selectedCategory === 'all'
                  ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-2">🍰</div>
              <div className="text-sm font-medium">Tất cả</div>
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id.toString())}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id.toString()
                    ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-lg'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && categories.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🍰</div>
            <p className="text-gray-600">Chưa có danh mục nào</p>
          </div>
        )}
      </div>
    </section>
  );
} 