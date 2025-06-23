export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">🍰</span>
              </div>
              <h3 className="text-xl font-bold">Đình Đình House</h3>
            </div>
            <p className="text-gray-400">
              Nghệ thuật bánh kem cho mọi dịp đặc biệt trong cuộc sống của bạn.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Bánh kem sinh nhật</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bánh kem cưới</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bánh kem tiệc</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bánh kem theo yêu cầu</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Đặt bánh online</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Giao hàng tận nơi</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tư vấn thiết kế</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dịch vụ khách hàng</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-gray-400">
              <li>0911576548</li>
              <li>kduy121@gmail.com</li>
              <li>805 Tân Xuân - Hàm Tân - Bình Thuận</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Đình Đình House . Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
} 