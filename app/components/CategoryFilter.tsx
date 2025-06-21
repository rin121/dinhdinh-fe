interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Danh Mục Sản Phẩm</h2>
          <p className="text-gray-600">Chọn danh mục bạn quan tâm</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-lg'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
} 