'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { allProducts } from '../../data/products';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../data/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { slug } = await params;
        const foundProduct = allProducts.find(p => p.slug === slug);
        
        if (!foundProduct) {
          notFound();
        }

        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0]);
        setSelectedImage(foundProduct.gallery[0]);
        
        const related = allProducts.filter(p => p.category === foundProduct.category && p.slug !== foundProduct.slug).slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Error loading product:', error);
        notFound();
      }
    };

    loadProduct();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải thông tin sản phẩm...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex items-center justify-center">
              <span className="text-8xl transition-all duration-300 transform scale-100 hover:scale-110">
                {selectedImage}
              </span>
            </div>
            <div className="flex space-x-4 justify-center">
              {product.gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-lg flex items-center justify-center text-3xl transition-all duration-200
                    ${selectedImage === img ? 'bg-pink-100 border-2 border-pink-500 scale-110' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <span className="text-sm font-semibold text-white bg-pink-500 px-3 py-1 rounded-full self-start mb-4">
              {product.badge}
            </span>
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Chọn kích cỡ:</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200
                      ${selectedSize?.size === size.size ? 'bg-pink-500 text-white border-pink-500 shadow-lg' : 'bg-white hover:border-pink-400'}`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Servings */}
            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg mb-6">
              <div className="text-3xl font-bold text-pink-600 mb-1">{selectedSize?.price}</div>
              <p className="text-pink-800">{selectedSize?.servings}</p>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded-l-lg">-</button>
                <span className="px-5 py-2 text-lg font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded-r-lg">+</button>
              </div>
              <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300">
                Thêm vào giỏ
              </button>
            </div>
            
            {/* Details Tabs */}
            <div className="mt-10">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button onClick={() => setActiveTab('description')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Mô tả chi tiết
                  </button>
                  <button onClick={() => setActiveTab('ingredients')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ingredients' ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Thành phần
                  </button>
                </nav>
              </div>
              <div className="py-6">
                {activeTab === 'description' && (
                  <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
                )}
                {activeTab === 'ingredients' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Thành phần chính:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {product.ingredients.map(ing => <li key={ing}>{ing}</li>)}
                    </ul>
                    <h4 className="font-semibold text-gray-800 mt-4 mb-2">Thông tin dị ứng:</h4>
                    <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      Sản phẩm có chứa: <strong>{product.allergens.join(', ')}</strong>. Vui lòng cân nhắc trước khi sử dụng.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 