import { PAYMENT_METHODS } from '../types';
import styles from './PaymentMethod.module.css';

interface PaymentMethodProps {
  selected: string;
  onChange: (method: string) => void;
}

export function PaymentMethod({ selected, onChange }: PaymentMethodProps) {
  return (
    <div className={styles.paymentSection}>
      <h3 className={styles.title}>Phương thức thanh toán</h3>

      <div className={styles.methodList}>
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.value}
            className={`${styles.methodLabel} ${
              selected === method.value
                ? styles.selected
                : styles.notSelected
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              value={method.value}
              checked={selected === method.value}
              onChange={(e) => onChange(e.target.value)}
              className={styles.radioInput}
            />
            <div className={styles.methodInfo}>
              <div className={styles.methodHeader}>
                <span className={styles.methodIcon}>{method.icon}</span>
                <span className={styles.methodLabelText}>{method.label}</span>
              </div>
              <p className={styles.methodDescription}>{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {selected === 'bank_transfer' && (
        <div className={styles.bankInfo}>
          <p className={styles.bankInfoTitle}>Thông tin chuyển khoản:</p>
          <div className={styles.bankInfoDetails}>
            <p>Ngân hàng: <strong>Vietcombank</strong></p>
            <p>Số tài khoản: <strong>1234567890</strong></p>
            <p>Chủ tài khoản: <strong>CÔNG TY Watch Store</strong></p>
            <p className={styles.bankInfoNote}>
              Nội dung: <strong>[Mã đơn hàng] [Số điện thoại]</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}