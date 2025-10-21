import React from 'react';
import { CheckoutFormData } from '../types';
import styles from './CheckoutForm.module.css';

interface CheckoutFormProps {
  formData: CheckoutFormData;
  onFieldChange: (field: keyof CheckoutFormData, value: string) => void;
}

export function CheckoutForm({ formData, onFieldChange }: CheckoutFormProps) {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Thông tin người nhận</h3>
        
        <div className={styles.grid}>
          <div>
            <label className={styles.label}>
              Họ và tên <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              value={formData.shipping_name}
              onChange={(e) => onFieldChange('shipping_name', e.target.value)}
              className={styles.input}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div>
            <label className={styles.label}>
              Số điện thoại <span className={styles.required}>*</span>
            </label>
            <input
              type="tel"
              value={formData.shipping_phone}
              onChange={(e) => onFieldChange('shipping_phone', e.target.value)}
              className={styles.input}
              placeholder="0987654321"
              required
            />
          </div>

          <div className={styles.colSpan2}>
            <label className={styles.label}>
              Email
            </label>
            <input
              type="email"
              value={formData.shipping_email}
              onChange={(e) => onFieldChange('shipping_email', e.target.value)}
              className={styles.input}
              placeholder="your@email.com"
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Địa chỉ giao hàng</h3>
        
        <div className={styles.addressFields}>
          <div className={styles.grid}>
            <div>
              <label className={styles.label}>
                Tỉnh/Thành phố <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={formData.shipping_city}
                onChange={(e) => onFieldChange('shipping_city', e.target.value)}
                className={styles.input}
                placeholder="Ví dụ: Hồ Chí Minh"
                required
              />
            </div>

            <div>
              <label className={styles.label}>
                Quận/Huyện <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                value={formData.shipping_district}
                onChange={(e) => onFieldChange('shipping_district', e.target.value)}
                className={styles.input}
                placeholder="Ví dụ: Quận 1"
                required
              />
            </div>
          </div>

          <div>
            <label className={styles.label}>
              Số nhà, tên đường <span className={styles.required}>*</span>
            </label>
            <textarea
              value={formData.shipping_address}
              onChange={(e) => onFieldChange('shipping_address', e.target.value)}
              className={styles.textarea}
              rows={2}
              placeholder="Ví dụ: 123 Nguyễn Huệ, Phường Bến Nghé"
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Ghi chú đơn hàng</h3>
        <textarea
          value={formData.note}
          onChange={(e) => onFieldChange('note', e.target.value)}
          className={styles.textarea}
          rows={3}
          placeholder="Ghi chú thêm về đơn hàng (tùy chọn)"
        />
      </div>
    </div>
  );
}