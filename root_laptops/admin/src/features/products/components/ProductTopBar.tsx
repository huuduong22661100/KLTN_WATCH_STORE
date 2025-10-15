import React from 'react';
import { Product } from '@/shared/types';

interface ProductTopBarProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalPrice: number;
  quantity: number;
  setQuantity: (quantity: number) => void;
  product: Product;
}

const ProductTopBar: React.FC<ProductTopBarProps> = ({
  product,
  totalPrice,
  quantity,
  setQuantity,
}) => {
  return (
    <div className="product-top-bar bg-gray-100 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <div className="flex items-center space-x-4">
        <span className="text-lg font-semibold">Giá: {totalPrice.toLocaleString('vi-VN')}đ</span>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 border rounded-l"
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 border rounded-r"
          >
            +
          </button>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Cập nhật</button>
      </div>
    </div>
  );
};

export { ProductTopBar };