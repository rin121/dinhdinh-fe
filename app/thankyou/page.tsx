'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ThankYouPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Hearts */}
        <div className="absolute top-20 left-10 text-pink-300 text-4xl animate-float">💖</div>
        <div className="absolute top-32 right-20 text-purple-300 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💕</div>
        <div className="absolute top-60 left-1/4 text-blue-300 text-2xl animate-float" style={{ animationDelay: '1s' }}>💝</div>
        <div className="absolute bottom-40 right-10 text-pink-400 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>🎁</div>
        <div className="absolute bottom-20 left-20 text-purple-400 text-4xl animate-float" style={{ animationDelay: '2s' }}>🧁</div>
        
        {/* Sparkles */}
        <div className="absolute top-40 left-1/3 text-yellow-300 text-2xl animate-pulse">✨</div>
        <div className="absolute top-80 right-1/3 text-yellow-400 text-xl animate-pulse" style={{ animationDelay: '0.8s' }}>⭐</div>
        <div className="absolute bottom-60 left-1/2 text-yellow-300 text-3xl animate-pulse" style={{ animationDelay: '1.2s' }}>🌟</div>
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Main Content Card */}
          <div className="glass rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 animate-scale-in card-hover">
            {/* Success Icon */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full shadow-lg animate-pulse-glow">
                <span className="text-5xl">🎉</span>
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 animate-slide-in-up">
              Cảm ơn bạn! 💕
            </h1>

            <div className="space-y-4 mb-8 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-gray-700 font-bold">
                Đơn hàng của bạn đã được đặt thành công! 🎂
              </p>
              <p className="text-lg text-gray-600 font-medium">
                Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng và thời gian giao hàng.
              </p>
            </div>

            {/* Order Info */}
            <div className="glass rounded-2xl p-6 mb-8 animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl mr-3">📧</span>
                <h3 className="text-xl font-bold text-gray-800">Thông tin đơn hàng</h3>
              </div>
              <p className="text-gray-700 mb-3 text-lg">
                📞 Chúng tôi sẽ gọi điện xác nhận trong vòng <span className="font-bold text-pink-600">30 phút</span>
              </p>
              <p className="text-gray-700 text-lg">
                🚚 Thời gian giao hàng: <span className="font-bold text-purple-600">2-4 giờ</span> (trong nội thành)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/products"
                className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover-lift"
              >
                <span className="mr-2 text-xl">🛍️</span>
                Tiếp tục mua sắm
              </Link>
              
              <Link
                href="/"
                className="btn-primary inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover-lift"
              >
                <span className="mr-2 text-xl">🏠</span>
                Về trang chủ
              </Link>
            </div>

            {/* Social Sharing */}
            <div className="mt-8 pt-6 border-t border-gray-200 animate-slide-in-up" style={{ animationDelay: '0.8s' }}>
              <p className="text-gray-600 mb-4 text-lg font-medium">Chia sẻ niềm vui với bạn bè! 🎊</p>
              <div className="flex justify-center space-x-4">
                <button className="w-14 h-14 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:scale-110 transform shadow-lg">
                  <span className="text-2xl">📘</span>
                </button>
                <button className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 transform shadow-lg">
                  <span className="text-2xl">💬</span>
                </button>
                <button className="w-14 h-14 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-all duration-300 hover:scale-110 transform shadow-lg">
                  <span className="text-2xl">📷</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="mt-8 animate-slide-in-up" style={{ animationDelay: '1s' }}>
            <p className="text-gray-600 text-lg font-medium">
              💌 Cảm ơn bạn đã tin tưởng và lựa chọn Đình Đình House!
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>🎂</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🧁</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🍰</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.6s' }}>🎂</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.8s' }}>🧁</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 