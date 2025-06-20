import ProductCard from './ProductCard';

const products = [
  {
    name: "Bánh Kem Vanilla",
    price: "250.000đ",
    image: "🍰",
    description: "Hương vị vanilla thơm ngọt, mềm mịn",
    badge: "Bán chạy"
  },
  {
    name: "Bánh Kem Chocolate",
    price: "299.000đ",
    image: "🍫",
    description: "Chocolate đậm đà, ngọt ngào",
    badge: "Mới"
  },
  {
    name: "Bánh Kem Trái Cây",
    price: "350.000đ",
    image: "🍓",
    description: "Trái cây tươi, nhiều vitamin",
    badge: "Hot"
  },
  {
    name: "Bánh Kem Matcha",
    price: "280.000đ",
    image: "🍵",
    description: "Matcha Nhật Bản, thanh mát",
    badge: "Trending"
  },
  {
    name: "Bánh Kem Tiramisu",
    price: "320.000đ",
    image: "☕",
    description: "Hương vị cà phê Ý đặc biệt",
    badge: "Premium"
  },
  {
    name: "Bánh Kem Red Velvet",
    price: "380.000đ",
    image: "❤️",
    description: "Màu đỏ quyến rũ, hương vị độc đáo",
    badge: "Limited"
  }
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Sản Phẩm Nổi Bật</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá bộ sưu tập bánh kem độc đáo với hương vị và thiết kế đặc biệt
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
} 