'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Order, PaymentStatus, OrderStatus, ShippingStatus } from '@/shared/types';
import { Input } from '@/shared/components/ui/input';
import styles from './page.module.css';

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
  cod: 'COD',
  bank_transfer: 'Chuyển khoản',
  credit_card: 'Thẻ tín dụng',
};

type PaymentMethodKey = keyof typeof paymentMethodLabels;

export default function OrdersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<PaymentStatus | 'all'>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [shippingStatusFilter, setShippingStatusFilter] = useState<ShippingStatus | 'all'>('all');
  const [customerNameFilter, setCustomerNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [orderCodeFilter, setOrderCodeFilter] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string | 'all'>('all');
  
  const { data, isLoading, isError } = useOrders({
    page,
    limit: 10,
    ...(paymentStatusFilter !== 'all' && { paymentStatus: paymentStatusFilter }),
    ...(orderStatusFilter !== 'all' && { orderStatus: orderStatusFilter }),
    ...(shippingStatusFilter !== 'all' && { shippingStatus: shippingStatusFilter }),
    ...(customerNameFilter && { customerName: customerNameFilter }),
    ...(dateFilter && { date: dateFilter }),
    ...(orderCodeFilter && { orderCode: orderCodeFilter }),
    ...(paymentMethodFilter !== 'all' && { paymentMethod: paymentMethodFilter }),
  });

  const updateStatus = useUpdateOrderStatus();

  const handleViewDetail = (order: Order) => {
    router.push(`/dashboard/orders/${order._id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Quản lý đơn hàng</h1>
          <p className={styles.description}>
            Quản lý và theo dõi trạng thái đơn hàng
          </p>
        </div>
      </div>

      <div className={styles.filtersContainer}>
        <Input
          placeholder="Tìm kiếm theo tên khách hàng..."
          value={customerNameFilter}
          onChange={(e) => setCustomerNameFilter(e.target.value)}
          className={styles.filterInput}
        />
        <Input
          placeholder="Tìm kiếm theo mã đơn hàng..."
          value={orderCodeFilter}
          onChange={(e) => setOrderCodeFilter(e.target.value)}
          className={styles.filterInput}
        />
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className={styles.dateInput}
        />
        <Select 
          value={paymentStatusFilter} 
          onValueChange={(value) => setPaymentStatusFilter(value as PaymentStatus | 'all')}
        >
          <SelectTrigger className={styles.filterSelect}>
            <SelectValue placeholder="TT Thanh toán" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả TT thanh toán</SelectItem>
            {Object.entries(paymentStatusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select 
          value={orderStatusFilter} 
          onValueChange={(value) => setOrderStatusFilter(value as OrderStatus | 'all')}
        >
          <SelectTrigger className={styles.filterSelect}>
            <SelectValue placeholder="TT Đơn hàng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả TT đơn hàng</SelectItem>
            {Object.entries(orderStatusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select 
          value={shippingStatusFilter} 
          onValueChange={(value) => setShippingStatusFilter(value as ShippingStatus | 'all')}
        >
          <SelectTrigger className={styles.filterSelect}>
            <SelectValue placeholder="TT Vận chuyển" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả TT vận chuyển</SelectItem>
            {Object.entries(shippingStatusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
          <SelectTrigger className={styles.paymentMethodSelect}>
            <SelectValue placeholder="Phương thức TT" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả phương thức TT</SelectItem>
            {Object.entries(paymentMethodLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingText}>Đang tải...</div>
        </div>
      )}

      {isError && (
        <div className={styles.errorContainer}>
          <div className={styles.errorText}>Lỗi khi tải dữ liệu đơn hàng</div>
        </div>
      )}

      {data && (
        <>
          <div className={styles.tableContainer}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn hàng</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Phương thức TT</TableHead>
                  <TableHead>TT Thanh toán</TableHead>
                  <TableHead>TT Đơn hàng</TableHead>
                  <TableHead>TT Vận chuyển</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead className={styles.alignRight}>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className={styles.emptyCell}>
                      Không có đơn hàng nào
                    </TableCell>
                  </TableRow>
                ) : (
                  data.data.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className={styles.fontMedium}>{order.order_number}</TableCell>
                      <TableCell>
                        <div className={styles.customerInfo}>
                          <p className={styles.customerName}>{typeof order.user_id === 'object' ? order.user_id.name : 'N/A'}</p>
                          <p className={styles.customerEmail}>{typeof order.user_id === 'object' ? order.user_id.email : ''}</p>
                        </div>
                      </TableCell>
                      <TableCell>{order.total.toLocaleString('vi-VN')}đ</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {paymentMethodLabels[order.payment_method as PaymentMethodKey] || order.payment_method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={paymentStatusColors[order.payment_status]}>
                          {paymentStatusLabels[order.payment_status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={orderStatusColors[order.order_status]}>
                          {orderStatusLabels[order.order_status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={shippingStatusColors[order.shipping_status]}>
                          {shippingStatusLabels[order.shipping_status]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </TableCell>
                      <TableCell className={styles.alignRight}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetail(order)}
                        >
                          <Eye className={styles.actionIcon} />
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
