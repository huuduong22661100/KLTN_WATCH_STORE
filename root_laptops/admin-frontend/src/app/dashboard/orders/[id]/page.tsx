'use client';

import React, { useEffect, useState } from 'react';
import { OrderDetails } from '@/features/orders/components/OrderDetails';
import { fetchOrderById } from '@/features/orders/api';
import { Order } from '@/features/orders/types';
import { useParams } from 'next/navigation';

export default function SingleOrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const orderId = params.id as string;

  const loadOrder = async () => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetchOrderById(orderId);
      if (response.success && response.data) {
        setOrder(response.data);
      } else {
        setError(response.message || 'Failed to fetch order details.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred while fetching order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const handleStatusUpdate = (updatedOrder: Order) => {
    setOrder(updatedOrder); // Update the local state with the new order data
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <OrderDetails order={order} onStatusUpdate={handleStatusUpdate} />
    </div>
  );
}
