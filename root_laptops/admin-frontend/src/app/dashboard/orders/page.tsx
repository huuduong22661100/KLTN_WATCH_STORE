'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { Button } from '@/shared/components/ui/button';
import { fetchAllOrders } from '@/features/orders/api';
import { Order } from '@/features/orders/types';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchAllOrders();
      if (response.success && response.data) {
        setOrders(response.data);
      } else {
        setError(response.message || 'Failed to fetch orders');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching orders.');
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleViewOrder = (id: string) => {
    router.push(`/dashboard/orders/${id}`);
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Order Management</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No orders found.</TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell className="font-medium">{order._id}</TableCell>
                <TableCell>{order.user_id.email}</TableCell>
                <TableCell>${order.total_amount.toFixed(2)}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleViewOrder(order._id)}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}