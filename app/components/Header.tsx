import Link from 'next/link';
import CartButton from './CartButton';
import Cart from './Cart';
import DynamicMenu from './DynamicMenu';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🍰</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  DinhDinh Cake
                </h1>
              </Link>
            </div>
            <DynamicMenu />
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-pink-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <CartButton />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
      
      {/* Cart Modal */}
      <Cart />
    </>
  );
} 