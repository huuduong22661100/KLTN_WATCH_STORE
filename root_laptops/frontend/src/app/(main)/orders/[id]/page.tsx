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
        {}
        <div className="lg:col-span-2 space-y-6">
          {}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Trạng thái đơn hàng</h3>
            
            {}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">💰 Thanh toán:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                  order.payment_status === 'refunded' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.payment_status === 'paid' ? 'Đã thanh toán' :
                   order.payment_status === 'refunded' ? 'Đã hoàn tiền' :
                   'Chưa thanh toán'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">📋 Đơn hàng:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.order_status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.order_status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  order.order_status === 'processing' ? 'bg-purple-100 text-purple-800' :
                  order.order_status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.order_status === 'pending' ? 'Chờ xác nhận' :
                   order.order_status === 'confirmed' ? 'Đã xác nhận' :
                   order.order_status === 'processing' ? 'Đang chuẩn bị' :
                   order.order_status === 'ready_to_ship' ? 'Sẵn sàng giao' :
                   order.order_status === 'completed' ? 'Hoàn thành' :
                   order.order_status === 'cancelled' ? 'Đã hủy' : order.order_status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">🚚 Giao hàng:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  order.shipping_status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.shipping_status === 'out_for_delivery' ? 'bg-indigo-100 text-indigo-800' :
                  order.shipping_status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                  order.shipping_status === 'failed_delivery' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.shipping_status === 'not_shipped' ? 'Chưa giao' :
                   order.shipping_status === 'picking' ? 'Đang lấy hàng' :
                   order.shipping_status === 'in_transit' ? 'Đang vận chuyển' :
                   order.shipping_status === 'out_for_delivery' ? 'Đang giao' :
                   order.shipping_status === 'delivered' ? 'Đã giao hàng' :
                   order.shipping_status === 'failed_delivery' ? 'Giao thất bại' : order.shipping_status}
                </span>
              </div>
            </div>
          </div>

          {}
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

          {}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <div className="space-y-4">
              {order.items?.map((item: OrderItem, index: number) => (
                <div key={item._id || item.id || index} className="flex items-center gap-4 pb-4 border-b last:border-0">
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

        {}
        <div className="lg:col-span-1">
          <OrderSummary order={order} />

          {}
          {(order.order_status === 'pending' || order.order_status === 'confirmed') && (
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