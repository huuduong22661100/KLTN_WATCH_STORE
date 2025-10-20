'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Order, PaymentStatus, OrderStatus, ShippingStatus } from '@/shared/types';
import { getOrderById, updatePaymentStatus, updateOrderStatus, updateShippingStatus } from '@/features/orders/api';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { 
  ArrowLeft, Package, User, MapPin, CreditCard, Clock, 
  CheckCircle, XCircle, Truck, DollarSign 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const paymentStatusColors = {
  unpaid: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-green-100 text-green-800',
  refunded: 'bg-gray-100 text-gray-800',
};

const paymentStatusLabels = {
  unpaid: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  refunded: 'Đã hoàn tiền',
};

const orderStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  ready_to_ship: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const orderStatusLabels = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  ready_to_ship: 'Sẵn sàng giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

const shippingStatusColors = {
  not_shipped: 'bg-gray-100 text-gray-800',
  picking: 'bg-yellow-100 text-yellow-800',
  in_transit: 'bg-blue-100 text-blue-800',
  out_for_delivery: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  failed_delivery: 'bg-red-100 text-red-800',
  returning: 'bg-orange-100 text-orange-800',
  returned: 'bg-gray-100 text-gray-800',
};

const shippingStatusLabels = {
  not_shipped: 'Chưa giao',
  picking: 'Đang lấy hàng',
  in_transit: 'Đang vận chuyển',
  out_for_delivery: 'Đang giao',
  delivered: 'Đã giao',
  failed_delivery: 'Giao thất bại',
  returning: 'Đang hoàn',
  returned: 'Đã hoàn',
};

const paymentMethodLabels = {
  credit_card: 'Thẻ tín dụng',
  paypal: 'PayPal',
  bank_transfer: 'Chuyển khoản',
  cash_on_delivery: 'COD',
};

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: order, isLoading, isError } = useQuery<Order>({
    queryKey: ['order', id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
  });

  
  const updatePaymentMutation = useMutation({
    mutationFn: ({ status }: { status: PaymentStatus }) => updatePaymentStatus(id, status),
    onSuccess: () => {
      toast.success('Cập nhật trạng thái thanh toán thành công');
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      toast.error('Lỗi cập nhật trạng thái thanh toán', {
        description: error.message,
      });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ status }: { status: OrderStatus }) => updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success('Cập nhật trạng thái đơn hàng thành công');
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      toast.error('Lỗi cập nhật trạng thái đơn hàng', {
        description: error.message,
      });
    },
  });

  const updateShippingMutation = useMutation({
    mutationFn: ({ status }: { status: ShippingStatus }) => updateShippingStatus(id, status),
    onSuccess: () => {
      toast.success('Cập nhật trạng thái vận chuyển thành công');
      queryClient.invalidateQueries({ queryKey: ['order', id] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      toast.error('Lỗi cập nhật trạng thái vận chuyển', {
        description: error.message,
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Không tìm thấy đơn hàng</h2>
              <p className="text-muted-foreground mb-4">
                Đơn hàng không tồn tại hoặc đã bị xóa.
              </p>
              <Button onClick={() => router.push('/dashboard/orders')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại danh sách
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/dashboard/orders')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Đơn hàng #{order.order_number}
            </h1>
            <p className="text-muted-foreground mt-1">
              Đặt ngày {new Date(order.createdAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {}
        <div className="md:col-span-2 space-y-6">
          {}
          <Card>
            <CardHeader>
              <CardTitle>Quản lý trạng thái</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Trạng thái thanh toán:</span>
                </div>
                <Select
                  value={order.payment_status}
                  onValueChange={(value) => updatePaymentMutation.mutate({ status: value as PaymentStatus })}
                  disabled={updatePaymentMutation.isPending}
                >
                  <SelectTrigger className="w-[200px]">
                    <Badge className={paymentStatusColors[order.payment_status]}>
                      {paymentStatusLabels[order.payment_status]}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(paymentStatusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Trạng thái đơn hàng:</span>
                </div>
                <Select
                  value={order.order_status}
                  onValueChange={(value) => updateOrderMutation.mutate({ status: value as OrderStatus })}
                  disabled={updateOrderMutation.isPending}
                >
                  <SelectTrigger className="w-[200px]">
                    <Badge className={orderStatusColors[order.order_status]}>
                      {orderStatusLabels[order.order_status]}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(orderStatusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Trạng thái vận chuyển:</span>
                </div>
                <Select
                  value={order.shipping_status}
                  onValueChange={(value) => updateShippingMutation.mutate({ status: value as ShippingStatus })}
                  disabled={updateShippingMutation.isPending}
                >
                  <SelectTrigger className="w-[200px]">
                    <Badge className={shippingStatusColors[order.shipping_status]}>
                      {shippingStatusLabels[order.shipping_status]}
                    </Badge>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(shippingStatusLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle>Sản phẩm đã đặt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items && order.items.map((item) => {
                  const product = typeof item.product_id === 'object' ? item.product_id : null;
                  return (
                    <div key={item._id} className="flex gap-4 pb-4 border-b last:border-0">
                      {product?.images?.mainImg?.url && (
                        <img
                          src={product.images.mainImg.url}
                          alt={product.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{product?.title || item.product_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          SKU: {product?.sku || 'N/A'}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm">Số lượng: {item.quantity}</span>
                          <span className="text-sm font-medium">
                            {item.price.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {}
          {order.status_history && order.status_history.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.status_history.map((history, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">
                          {history.status_type === 'payment_status' && 'Thanh toán: '}
                          {history.status_type === 'order_status' && 'Đơn hàng: '}
                          {history.status_type === 'shipping_status' && 'Vận chuyển: '}
                          <span className="text-primary">{history.new_value}</span>
                        </p>
                        {history.note && (
                          <p className="text-sm text-muted-foreground mt-1">{history.note}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(history.changed_at).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {}
        <div className="space-y-6">
          {}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Họ tên</p>
                <p className="font-medium">
                  {typeof order.user_id === 'object' ? order.user_id.name : order.shipping_name}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">
                  {typeof order.user_id === 'object' ? order.user_id.email : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">
                  {typeof order.user_id === 'object' ? order.user_id.phone || order.shipping_phone : order.shipping_phone}
                </p>
              </div>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Địa chỉ giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Người nhận</p>
                <p className="font-medium">{order.shipping_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Số điện thoại</p>
                <p className="font-medium">{order.shipping_phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Địa chỉ</p>
                <p className="font-medium">
                  {order.shipping_address}, {order.shipping_district}, {order.shipping_city}
                </p>
              </div>
              {order.note && (
                <div>
                  <p className="text-sm text-muted-foreground">Ghi chú</p>
                  <p className="font-medium">{order.note}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Thông tin thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phương thức:</span>
                <span className="font-medium">
                  {paymentMethodLabels[order.payment_method as keyof typeof paymentMethodLabels]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính:</span>
                <span>{order.subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí vận chuyển:</span>
                <span>{order.shipping_fee.toLocaleString('vi-VN')}đ</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá:</span>
                  <span>-{order.discount.toLocaleString('vi-VN')}đ</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold pt-3 border-t">
                <span>Tổng cộng:</span>
                <span className="text-primary">{order.total.toLocaleString('vi-VN')}đ</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
