'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CheckCircle, Package, Home, FileText } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { useCartStore } from '@/store/cartStore';

export default function OrderSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã đặt hàng. Chúng tôi đã nhận được đơn hàng của bạn.
          </p>
        </div>

        {}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Mã đơn hàng</p>
              <p className="text-lg font-semibold text-gray-900">{orderId}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Thông tin đơn hàng:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Đơn hàng của bạn đang được xử lý</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Chúng tôi sẽ gửi email xác nhận đến bạn trong giây lát</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Thời gian giao hàng dự kiến: 2-3 ngày làm việc</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Bạn có thể theo dõi đơn hàng trong mục "Đơn hàng của tôi"</span>
              </li>
            </ul>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={() => router.push('/orders')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            <FileText className="w-5 h-5 mr-2" />
            Xem đơn hàng
          </Button>
          
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Về trang chủ
          </Button>
        </div>

        {}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Cần hỗ trợ?{' '}
            <a href="/contact" className="text-blue-600 hover:underline">
              Liên hệ với chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
