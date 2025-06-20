export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Bánh Kem
                </span>
                <br />
                <span className="text-gray-800">Cho Mọi Dịp</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Khám phá thế giới bánh kem nghệ thuật với hương vị độc đáo và thiết kế sáng tạo. 
                Mỗi chiếc bánh là một tác phẩm nghệ thuật đặc biệt dành riêng cho bạn.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                Đặt bánh ngay 🎂
              </button>
              <button className="border-2 border-pink-500 text-pink-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-50 transition-colors">
                Xem menu 📋
              </button>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Giao hàng miễn phí</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Đặt hàng online 24/7</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="w-full h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-6xl">🎂</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold text-lg">Bánh Kem Chocolate</h3>
                    <p className="text-gray-600">Hương vị đậm đà, ngọt ngào</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-pink-600">299.000đ</span>
                      <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition-colors">
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 