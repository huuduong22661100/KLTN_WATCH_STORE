'use client';

import { use } from 'react';
import { useOrderDetail, useCancelOrder, OrderStatusComponent, OrderSummary } from '@/features/orders';
import type { OrderItem } from '@/features/orders';
import { toast } from 'sonner';

export default function OrderDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const { data: order, isLoading } = useOrderDetail(id);
  const { mutate: cancelOrder, isPending } = useCancelOrder();

  const handleCancel = () => {
    if (!confirm('Bạn có chắc muốn hủy đơn hàng này?')) return;

    cancelOrder(id, {
      onSuccess: () => {
        toast.success('Hủy đơn hàng thành công');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Đang tải...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center text-red-600">
          Không tìm thấy đơn hàng
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <a href="/orders" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Quay lại danh sách đơn hàng
        </a>
        <h1 className="text-3xl font-bold">Chi tiết đơn hàng</h1>
        <p className="text-gray-600 mt-2">Mã đơn hàng: {order.order_number}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Trạng thái đơn hàng</h3>
            <OrderStatusComponent status={order.status} />
          </div>

          {/* Shipping Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Thông tin giao hàng</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Người nhận:</strong> {order.shipping_name}</p>
              <p><strong>Số điện thoại:</strong> {order.shipping_phone}</p>
              <p><strong>Địa chỉ:</strong> {order.shipping_address}</p>
              <p><strong>Quận/Huyện:</strong> {order.shipping_district}</p>
              <p><strong>Tỉnh/Thành phố:</strong> {order.shipping_city}</p>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <div className="space-y-4">
              {order.items?.map((item: OrderItem) => (
                <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {item.subtotal.toLocaleString('vi-VN')} đ
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <OrderSummary order={order} />

          {/* Actions */}
          {order.status === 'pending' && (
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="w-full mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
            >
              {isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}