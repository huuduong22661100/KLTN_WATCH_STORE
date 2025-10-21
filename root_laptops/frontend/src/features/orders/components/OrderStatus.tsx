import React from 'react';
import { OrderStatus as OrderStatusType } from '../types';
import styles from './OrderStatus.module.css';

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
      <div className={styles.cancelledWrapper}>
        <div className={styles.cancelledContent}>
          <svg className={styles.cancelledIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className={styles.cancelledText}>Đơn hàng đã bị hủy</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.statusTracker}>
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div key={step.key} className={styles.step}>
              {index > 0 && (
                <div className={`${styles.line} ${isCompleted ? styles.lineCompleted : styles.lineDefault}`} 
                     style={{
                       left: `${((index - 1) / (steps.length - 1)) * 100}%`,
                       width: `${100 / (steps.length - 1)}%`,
                     }}
                />
              )}

              <div className={`${styles.dot} ${isActive ? styles.dotActive : styles.dotDefault}`}>
                {isCompleted ? (
                  <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <div className={styles.innerDot} />
                )}
              </div>

              <p className={`${styles.stepLabel} ${isActive ? styles.stepLabelActive : styles.stepLabelDefault}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}