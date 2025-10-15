'use client';

import React, { useState } from 'react';
import { useOrders, useUpdateOrderStatus } from '@/features/orders/hooks/useOrders';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Pagination } from '@/shared/components/ui/pagination';
import { Eye } from 'lucide-react';
import { Order } from '@/shared/types';
import { Input } from '@/shared/components/ui/input';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipping: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};
const payment_methodLabels = {
  credit_card: 'Thẻ tín dụng',
  paypal: 'PayPal',
  bank_transfer: 'Chuyển khoản ngân hàng',
  cash_on_delivery: 'Thanh toán khi nhận hàng',
};

type PaymentMethodKey = keyof typeof payment_methodLabels;



export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [customerNameFilter, setCustomerNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [orderCodeFilter, setOrderCodeFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string | 'all'>('all');
  
  const { data, isLoading, isError } = useOrders({
    page,
    limit: 10,
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(customerNameFilter && { customerName: customerNameFilter }),
    ...(dateFilter && { date: dateFilter }),
    ...(orderCodeFilter && { orderCode: orderCodeFilter }),
    ...(paymentMethodFilter !== 'all' && { paymentMethod: paymentMethodFilter }),
  });

  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateStatus.mutate({ id: orderId, status: newStatus });
  };

  const handleViewDetail = (order: Order) => {
    // TODO: Navigate to order detail
    console.log('View order:', order);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý đơn hàng</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi trạng thái đơn hàng
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Input
          placeholder="Tìm kiếm theo tên khách hàng..."
          value={customerNameFilter}
          onChange={(e) => setCustomerNameFilter(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="Tìm kiếm theo mã đơn hàng..."
          value={orderCodeFilter}
          onChange={(e) => setOrderCodeFilter(e.target.value)}
          className="max-w-xs"
        />
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-[180px]"
        />
        <Select 
          value={statusFilter} 
          onValueChange={(value) => setStatusFilter(value as Order['status'] | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            {Object.entries(statusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Lọc theo phương thức TT" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả phương thức TT</SelectItem>
            {Object.entries(payment_methodLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="text-muted-foreground">Đang tải...</div>
        </div>
      )}

      {isError && (
        <div className="flex justify-center py-8">
          <div className="text-red-500">Lỗi khi tải dữ liệu đơn hàng</div>
        </div>
      )}

      {data && (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Phương thức thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Không có đơn hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order.order_number}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{typeof order.user_id === 'object' ? order.user_id.name : 'N/A'}</p>
                          <p className="text-sm text-muted-foreground">{typeof order.user_id === 'object' ? order.user_id.email : ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.total.toLocaleString('vi-VN')}đ</TableCell>
                      <TableCell>{payment_methodLabels[order.payment_method as PaymentMethodKey]}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value: string) => handleStatusChange(order._id, value as Order['status'])}
                        >
                          <SelectTrigger className="w-[140px]">
                            <Badge className={statusColors[order.status]}>
                              {statusLabels[order.status]}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
