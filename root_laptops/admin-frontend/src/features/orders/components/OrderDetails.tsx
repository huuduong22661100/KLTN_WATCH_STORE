'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Order, OrderStatus, UpdateOrderStatusPayload } from '../types';
import { updateOrderStatus } from '../api';

interface OrderDetailsProps {
  order: Order;
  onStatusUpdate: (updatedOrder: Order) => void;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onStatusUpdate }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setLoading(true);
    setError(null);
    try {
      const payload: UpdateOrderStatusPayload = { status: newStatus };
      const response = await updateOrderStatus(order._id, payload);
      if (response.success && response.data) {
        setCurrentStatus(response.data.status);
        onStatusUpdate(response.data); // Notify parent component of update
        alert('Order status updated successfully!');
      } else {
        setError(response.message || 'Failed to update order status');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while updating status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order #{order._id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Customer:</strong> {order.user_id.name} ({order.user_id.email})</p>
            <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>
            <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
          </div>
          <div>
            <p><strong>Current Status:</strong> {currentStatus}</p>
            <div className="flex items-center gap-2 mt-2">
              <Select value={currentStatus} onValueChange={handleStatusChange} disabled={loading}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipping">Shipping</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {loading && <p className="text-sm text-gray-500">Updating...</p>}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Order Items</h3>
        {order.items && order.items.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.laptop_id.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No items found for this order.</p>
        )}
      </CardContent>
    </Card>
  );
};
