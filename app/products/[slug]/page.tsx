'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AddToCartButton from '../../components/AddToCartButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import ImageDisplay from '../../components/ImageDisplay';
import { Product, ProductDetail } from '../../data/types';
import { apiClient } from '../../lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.get<{ success: boolean; data: Product }>(`/products/${slug}`);
        
        if (response.success) {
          setProduct(response.data);
          // Set default selected size to the first one
          if (response.data.details && response.data.details.length > 0) {
            setSelectedSize(response.data.details[0]);
          }
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Có lỗi xảy ra khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <main className="pt-20">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="text-6xl mb-4">😔</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Không tìm thấy sản phẩm</h1>
              <p className="text-gray-600 mb-8">{error}</p>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                ← Quay lại danh sách sản phẩm
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-pink-600">Trang chủ</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-pink-600">Sản phẩm</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-800 font-medium">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <ImageDisplay
                images={product.images}
                primaryImage={product.primary_image}
                fallbackImage={product.image}
                size="xl"
                showGallery={true}
                alt={product.name}
                className="w-full"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Badge */}
              <div>
                {product.badge && (
                  <span className="inline-block px-3 py-1 bg-pink-500 text-white text-sm font-semibold rounded-full mb-3">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-xl text-gray-600">{product.description}</p>
              </div>

              {/* Category */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{product.category.icon}</span>
                <span className="text-lg text-gray-700">{product.category.name}</span>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">Chọn kích thước:</h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.details.map((detail) => (
                    <button
                      key={detail.id}
                      onClick={() => setSelectedSize(detail)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSize?.id === detail.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800">{detail.size}</p>
                          <p className="text-sm text-gray-600">{detail.servings}</p>
                        </div>
                        <p className="text-xl font-bold text-pink-600">{detail.price_display}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <AddToCartButton
                  product={product}
                  selectedSize={selectedSize || undefined}
                  showQuantitySelector={true}
                  size="lg"
                  className="w-full"
                />
              </div>

              {/* Product Description */}
              {product.long_description && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">Mô tả chi tiết:</h3>
                  <p className="text-gray-700 leading-relaxed">{product.long_description}</p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">Nguyên liệu:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient) => (
                      <span
                        key={ingredient.id}
                        className={`px-3 py-1 rounded-full text-sm ${
                          ingredient.is_main
                            ? 'bg-pink-100 text-pink-700 font-medium'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {ingredient.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && product.allergens.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800">Cảnh báo dị ứng:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen) => (
                      <span
                        key={allergen.id}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          allergen.severity === 'severe'
                            ? 'bg-red-100 text-red-700'
                            : allergen.severity === 'moderate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        ⚠️ {allergen.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 