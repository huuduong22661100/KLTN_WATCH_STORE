export function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🛒</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Giỏ hàng trống
      </h2>
      <p className="text-gray-500 mb-6">
        Bạn chưa có sản phẩm nào trong giỏ hàng
      </p>
      <a
        href="/products"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Khám phá sản phẩm
      </a>
    </div>
  );
}