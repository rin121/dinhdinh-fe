interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
}

export default function ProductCard({ name, price, image, description, badge }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="relative">
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-t-2xl p-8 flex items-center justify-center">
          <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
            {image}
          </span>
        </div>
        {badge && (
          <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {badge}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600">{price}</span>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
} 