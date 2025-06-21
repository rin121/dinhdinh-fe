export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-xl text-gray-600">
            Đặt bánh ngay hôm nay và tận hưởng hương vị tuyệt vời
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-xl">📞</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Điện thoại</h4>
                  <p className="text-gray-600">0928462386</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 text-xl">📧</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Email</h4>
                  <p className="text-gray-600">info@dinhdinhcake.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-xl">📍</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Địa chỉ</h4>
                  <p className="text-gray-600">123 Đường ABC, Quận 1, TP.HCM</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Theo dõi chúng tôi</h4>
              <div className="flex space-x-4">
                <a href="https://zalo.me/0928462386" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                    <path fill="currentColor" fill-rule="evenodd" d="M34.62 34.45c-.24-.1-.56-.22-.95-.37c-.38-.15-.85-.35-1.4-.59c-.56-.25-1.12-.5-1.68-.74c-.56-.25-1.04-.46-1.44-.64l-.22-.1c-.2-.1-.42-.2-.67-.34c-.25-.13-.5-.28-.76-.45c-.26-.17-.5-.33-.7-.5c-.2-.17-.37-.32-.5-.45c-.14-.14-.28-.28-.4-.44a5.2 5.2 0 0 1-1.3-2.13c-.2-.58-.3-1.18-.3-1.78s.1-1.2.3-1.78c.04-.1.08-.2.12-.3c.18-.45.45-.87.8-1.23c.36-.36.78-.65 1.25-.85c.47-.2 1-.3 1.5-.3c.56 0 1.12.13 1.68.4c.56.26 1.05.63 1.48 1.1c.44.47.73.93.88 1.4c.04.12.07.25.1.4c.08.3.14.6.17.92c.04.3.05.6.05.9c0 .34-.02.68-.06 1.02c-.04.34-.1.67-.18.98c-.08.32-.18.62-.28.9c-.1.28-.23.55-.37.8c-.14.26-.3.5-.47.73c-.18.23-.37.45-.57.65c-.2.2-.4.38-.63.54c-.22.16-.47.3-.73.44c-.26.13-.53.25-.8.34c-.14.05-.28.1-.42.14l-1.08.3zm-14.4-12.27a.8.8 0 0 0-.58.22a.8.8 0 0 0-.22.58v1.35c0 .13.02.26.08.38c.05.12.13.23.23.32l.2.18c.9.82 1.83 1.63 2.8 2.45c.98.8 1.95 1.6 2.9 2.38c.05.04.1.08.16.1c.12.06.25.1.38.08c.13-.02.25-.07.35-.15l.13-.1c.4-.33.8-.66 1.2-1c.4-.32.8-.64 1.2-.95c.08-.06.15-.13.2-.22c.05-.08.08-.18.08-.28v-1.35c0-.23-.09-.45-.25-.6l-.16-.16q-1.3-1.3-2.6-2.6q-1.3-1.3-2.6-2.6a.84.84 0 0 0-.6-.25c-.23 0-.45.09-.6.25q-1.3 1.3-2.6 2.6zM24 0C10.75 0 0 10.75 0 24s10.75 24 24 24s24-10.75 24-24S37.25 0 24 0" clip-rule="evenodd"/>
                  </svg>
                </a>
                <a href="https://fb.com/kduy121" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Đặt bánh ngay</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <textarea
                placeholder="Ghi chú đặt bánh"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300"
              >
                Gửi yêu cầu đặt bánh 🎂
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 