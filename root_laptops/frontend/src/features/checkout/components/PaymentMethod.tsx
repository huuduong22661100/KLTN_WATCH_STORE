import { PAYMENT_METHODS } from '../types';

interface PaymentMethodProps {
  selected: string;
  onChange: (method: string) => void;
}

export function PaymentMethod({ selected, onChange }: PaymentMethodProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Phương thức thanh toán</h3>

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => (
          <label
            key={method.value}
            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition ${
              selected === method.value
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <input
              type="radio"
              name="payment_method"
              value={method.value}
              checked={selected === method.value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{method.icon}</span>
                <span className="font-semibold">{method.label}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Bank Transfer Info */}
      {selected === 'bank_transfer' && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-semibold mb-2">Thông tin chuyển khoản:</p>
          <div className="text-sm space-y-1">
            <p>Ngân hàng: <strong>Vietcombank</strong></p>
            <p>Số tài khoản: <strong>1234567890</strong></p>
            <p>Chủ tài khoản: <strong>CÔNG TY Watch Store</strong></p>
            <p className="text-gray-600 mt-2">
              Nội dung: <strong>[Mã đơn hàng] [Số điện thoại]</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}