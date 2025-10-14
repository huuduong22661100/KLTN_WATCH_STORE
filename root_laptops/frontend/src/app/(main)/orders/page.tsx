'use client';

import { useState } from 'react';
import { useOrders, OrderItemCard } from '@/features/orders';
import type { Order } from '@/features/orders';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useOrders(page, 10);

  const handleViewDetail = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!data || data.data.orders.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-xl mb-4">Chưa có đơn hàng nào</p>
          <a href="/products" className="text-blue-600 hover:underline">
            Bắt đầu mua sắm
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Đơn hàng của bạn</h1>

      <div className="space-y-4">
        {data.data.orders.map((order: Order) => (
          <OrderItemCard 
            key={order.id} 
            order={order}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>

      {/* Pagination */}
      {data.data.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          
          <span className="px-4 py-2">
            Trang {page} / {data.data.totalPages}
          </span>
          
          <button
            onClick={() => setPage(p => Math.min(data.data.totalPages, p + 1))}
            disabled={page === data.data.totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}