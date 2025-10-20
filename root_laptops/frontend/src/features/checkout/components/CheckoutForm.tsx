import React from 'react';
import { CheckoutFormData } from '../types';

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void;
}

export function CheckoutForm({ formData, onFieldChange }: CheckoutFormProps) {
  return (
    <div className="space-y-6">
      {}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Thông tin người nhận</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.shipping_name}
              onChange={(e) => onFieldChange('shipping_name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.shipping_phone}
              onChange={(e) => onFieldChange('shipping_phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0987654321"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.shipping_email}
              onChange={(e) => onFieldChange('shipping_email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>
        </div>
      </div>

      {}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h3>
        
        <div className="space-y-4">
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.shipping_city}
                onChange={(e) => onFieldChange('shipping_city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: Hồ Chí Minh"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quận/Huyện <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.shipping_district}
                onChange={(e) => onFieldChange('shipping_district', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ví dụ: Quận 1"
                required
              />
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số nhà, tên đường <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.shipping_address}
              onChange={(e) => onFieldChange('shipping_address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Ví dụ: 123 Nguyễn Huệ, Phường Bến Nghé"
              required
            />
          </div>
        </div>
      </div>

      {}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Ghi chú đơn hàng</h3>
        <textarea
          value={formData.note}
          onChange={(e) => onFieldChange('note', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
        />
      </div>
    </div>
  );
}