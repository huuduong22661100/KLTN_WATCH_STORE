import React from 'react';
import { OrderStatus as OrderStatusType } from '../types';

interface OrderStatusProps {
  status: OrderStatusType;
}

export function OrderStatusComponent({ status }: OrderStatusProps) {
  const steps = [
    { key: 'pending', label: 'Chờ xác nhận' },
    { key: 'confirmed', label: 'Đã xác nhận' },
    { key: 'processing', label: 'Đang xử lý' },
    { key: 'shipping', label: 'Đang giao hàng' },
    { key: 'delivered', label: 'Đã giao hàng' },
  ];

  const statusOrder = ['pending', 'confirmed', 'processing', 'shipping', 'delivered'];
  const currentIndex = statusOrder.indexOf(status);
  const isCancelled = status === 'cancelled';

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="font-semibold">Đơn hàng đã bị hủy</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1">
              {}
              {index > 0 && (
                <div className={`absolute h-0.5 ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`} 
                     style={{
                       left: `${((index - 1) / (steps.length - 1)) * 100}%`,
                       width: `${100 / (steps.length - 1)}%`,
                       top: '12px',
                       zIndex: 0,
                     }}
                />
              )}

              {}
              <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                isActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                {isCompleted ? (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>

              {}
              <p className={`text-xs mt-2 text-center ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}