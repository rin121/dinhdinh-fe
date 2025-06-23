'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';
import { apiClient } from '../lib/api';
import { API_CONFIG } from '../config/api';

interface CheckoutForm {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_address: string;
  customer_notes: string;
  delivery_date: string;
  delivery_time: string;
  payment_method: 'cash' | 'transfer' | 'card';
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, summary, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<CheckoutForm>({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    customer_address: '',
    customer_notes: '',
    delivery_date: '',
    delivery_time: '09:00 - 12:00',
    payment_method: 'cash',
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/products');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.customer_name.trim()) {
      newErrors.customer_name = 'Vui lòng nhập họ tên';
    }

    if (!form.customer_phone.trim()) {
      newErrors.customer_phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(form.customer_phone.replace(/\s/g, ''))) {
      newErrors.customer_phone = 'Số điện thoại không hợp lệ';
    }

    if (form.customer_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer_email)) {
      newErrors.customer_email = 'Email không hợp lệ';
    }

    if (!form.customer_address.trim()) {
      newErrors.customer_address = 'Vui lòng nhập địa chỉ giao hàng';
    }

    if (!form.delivery_date) {
      newErrors.delivery_date = 'Vui lòng chọn ngày giao hàng';
    } else {
      const selectedDate = new Date(form.delivery_date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      if (selectedDate < tomorrow) {
        newErrors.delivery_date = 'Ngày giao hàng phải từ ngày mai trở đi';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('apiClient:', apiClient); // Debug log

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Prepare order data
      const orderData = {
        customer_name: form.customer_name.trim(),
        customer_phone: form.customer_phone.trim(),
        customer_email: form.customer_email.trim() || null,
        customer_address: form.customer_address.trim(),
        customer_notes: form.customer_notes.trim() || null,
        order_items: items.map(item => ({
          product_id: item.productId,
          product_name: item.productName,
          product_slug: item.productSlug,
          selected_size: item.selectedSize,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: summary.subtotal,
        shipping_fee: summary.shipping,
        total_amount: summary.total,
        delivery_date: form.delivery_date ? `${form.delivery_date} ${form.delivery_time.split(' - ')[0]}:00` : null,
        delivery_time: form.delivery_time,
        payment_method: form.payment_method,
      };

      console.log('Sending order data:', orderData);

      // Call API to create order - Using fetch directly for testing
      const response = await fetch(`${API_CONFIG.BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      
      console.log('API Response:', result);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      // Check if request was successful (status 200-299)
      if (response.ok) {
        console.log('API call successful, clearing cart...');
        
        // Clear cart
        clearCart();

        console.log('Cart cleared, about to redirect...');
        console.log('Redirecting to /thankyou');
        
        // Use window.location.replace for immediate redirect
        window.location.replace('/thankyou');
        
        return;
        
      } else {
        throw new Error(result.message || result.error || 'Có lỗi xảy ra khi đặt hàng');
      }

    } catch (error: unknown) {
      console.error('Order creation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.';
      alert(errorMessage);
      setIsLoading(false); // Only set loading false on error
    }
  };

  if (items.length === 0) {
    return null; // Will redirect
  }

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thanh toán đơn hàng</h1>
          <p className="text-gray-600">Vui lòng điền thông tin để hoàn tất đặt hàng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng của bạn</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{item.productImage}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{item.productName}</h3>
                    <p className="text-base text-gray-600 mt-1">Kích thước: {item.selectedSize}</p>
                    <p className="text-base text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-pink-600">{item.priceDisplay}</p>
                    <p className="text-base text-gray-600">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0
                      }).format(item.price * item.quantity).replace('₫', 'đ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-lg text-gray-700">
                <span className="font-semibold">Tạm tính ({summary.totalQuantity} sản phẩm):</span>
                <span className="font-semibold">{summary.subtotalDisplay}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-700">
                <span className="font-semibold">Phí vận chuyển:</span>
                <span className="font-semibold">{summary.shippingDisplay}</span>
              </div>
              <div className="flex justify-between font-bold text-2xl text-gray-800 pt-3 border-t">
                <span>Tổng cộng:</span>
                <span className="text-pink-600">{summary.totalDisplay}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thông tin giao hàng</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                              {/* Customer Name */}
                <div>
                  <label htmlFor="customer_name" className="block text-base font-semibold text-gray-800 mb-2">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={form.customer_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 text-base font-medium border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-600 ${
                      errors.customer_name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập họ và tên"
                  />
                  {errors.customer_name && (
                    <p className="text-red-500 text-base mt-1">{errors.customer_name}</p>
                  )}
                </div>

                              {/* Customer Phone */}
                <div>
                  <label htmlFor="customer_phone" className="block text-base font-semibold text-gray-800 mb-2">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    value={form.customer_phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                      errors.customer_phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập số điện thoại"
                  />
                  {errors.customer_phone && (
                    <p className="text-red-500 text-base mt-1">{errors.customer_phone}</p>
                  )}
                </div>

              {/* Customer Email */}
              <div>
                <label htmlFor="customer_email" className="block text-base font-semibold text-gray-800 mb-2">
                  Email (tùy chọn)
                </label>
                <input
                  type="email"
                  id="customer_email"
                  name="customer_email"
                  value={form.customer_email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.customer_email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập email"
                />
                {errors.customer_email && (
                  <p className="text-red-500 text-base mt-1">{errors.customer_email}</p>
                )}
              </div>

              {/* Customer Address */}
              <div>
                <label htmlFor="customer_address" className="block text-base font-semibold text-gray-800 mb-2">
                  Địa chỉ giao hàng <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="customer_address"
                  name="customer_address"
                  value={form.customer_address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.customer_address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập địa chỉ chi tiết"
                />
                {errors.customer_address && (
                  <p className="text-red-500 text-base mt-1">{errors.customer_address}</p>
                )}
              </div>

              {/* Delivery Date */}
              <div>
                <label htmlFor="delivery_date" className="block text-base font-semibold text-gray-800 mb-2">
                  Ngày giao hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="delivery_date"
                  name="delivery_date"
                  value={form.delivery_date}
                  onChange={handleInputChange}
                  min={minDate}
                  className={`w-full px-4 py-3 text-base border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                    errors.delivery_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.delivery_date && (
                  <p className="text-red-500 text-base mt-1">{errors.delivery_date}</p>
                )}
              </div>

              {/* Delivery Time */}
              <div>
                <label htmlFor="delivery_time" className="block text-base font-semibold text-gray-800 mb-2">
                  Khung giờ giao hàng
                </label>
                <select
                  id="delivery_time"
                  name="delivery_time"
                  value={form.delivery_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value="09:00 - 12:00">09:00 - 12:00</option>
                  <option value="14:00 - 18:00">14:00 - 18:00</option>
                  <option value="19:00 - 21:00">19:00 - 21:00</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-base font-semibold text-gray-800 mb-3">
                  Phương thức thanh toán
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment_method"
                      value="cash"
                      checked={form.payment_method === 'cash'}
                      onChange={handleInputChange}
                      className="text-pink-600 focus:ring-pink-500 w-4 h-4"
                    />
                    <span className="ml-3 text-base text-gray-800">Thanh toán khi nhận hàng (COD)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="payment_method"
                      value="transfer"
                      checked={form.payment_method === 'transfer'}
                      onChange={handleInputChange}
                      className="text-pink-600 focus:ring-pink-500 w-4 h-4"
                    />
                    <span className="ml-3 text-base text-gray-800">Chuyển khoản ngân hàng</span>
                  </label>
                </div>
              </div>

              {/* Customer Notes */}
              <div>
                <label htmlFor="customer_notes" className="block text-base font-semibold text-gray-800 mb-2">
                  Ghi chú đơn hàng (tùy chọn)
                </label>
                <textarea
                  id="customer_notes"
                  name="customer_notes"
                  value={form.customer_notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 text-base font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-600"
                  placeholder="Yêu cầu đặc biệt, ghi chú về sản phẩm..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                    isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {isLoading ? 'Đang xử lý...' : `Đặt hàng - ${summary.totalDisplay}`}
                </button>
              </div>

              {/* Back to Cart */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="text-pink-600 hover:text-pink-700 font-medium"
                >
                  ← Quay lại giỏ hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 