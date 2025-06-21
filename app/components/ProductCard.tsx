import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  description: string;
  badge?: string;
  slug: string;
}

export default function ProductCard({ name, price, image, description, badge, slug }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
        <div className="relative flex-grow">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-t-2xl p-6 flex items-center justify-center h-48">
            <span className="text-6xl group-hover:scale-110 transition-transform duration-300 ease-in-out">
              {image}
            </span>
          </div>
          {badge && (
            <div className="absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {badge}
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-800 mb-1 flex-grow">{name}</h3>
          <p className="text-sm text-gray-500 mb-4 h-10">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-extrabold text-pink-500">{price}</span>
            <button className="text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
} 