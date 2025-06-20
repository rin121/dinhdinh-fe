export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-800">Về DinhDinh Cake</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Chúng tôi là những nghệ nhân bánh kem với hơn 5 năm kinh nghiệm trong việc tạo ra những chiếc bánh kem nghệ thuật độc đáo. 
              Mỗi sản phẩm đều được làm thủ công với tình yêu và sự tận tâm.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">500+</div>
                <div className="text-gray-600">Khách hàng hài lòng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
                <div className="text-gray-600">Chiếc bánh đã bán</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">50+</div>
                <div className="text-gray-600">Loại bánh khác nhau</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-gray-600">Năm kinh nghiệm</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 text-xl">🌟</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Chất lượng cao</h4>
                      <p className="text-sm text-gray-600">Nguyên liệu tươi ngon</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-xl">🎨</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Thiết kế độc đáo</h4>
                      <p className="text-sm text-gray-600">Theo yêu cầu khách hàng</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xl">🚚</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Giao hàng nhanh</h4>
                      <p className="text-sm text-gray-600">Trong vòng 2 giờ</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl">💝</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Dịch vụ tận tâm</h4>
                      <p className="text-sm text-gray-600">Hỗ trợ 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 