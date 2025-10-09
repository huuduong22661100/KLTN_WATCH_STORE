// src/app/(main)/page.tsx
import HomeBanner from "@/features/products/components/HomeBanner";
import ProductList from "@/features/products/components/ProductList";

export default function HomePage() {
  return (
    <main>
      {/* 1. Banner quảng cáo */}
      <HomeBanner name="Home" />

      {/* 2. Phần danh mục nổi bật */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Khám phá danh mục</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder Category Card 1 */}
          <div className="bg-muted p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <img src="/assets/image/category-gaming.png" alt="Laptop Gaming" className="mx-auto mb-4 h-32 object-contain" />
            <h3 className="text-xl font-semibold mb-2">Laptop Gaming</h3>
            <a href="/products?category=Gaming" className="text-primary hover:underline">Xem ngay</a>
          </div>
          {/* Placeholder Category Card 2 */}
          <div className="bg-muted p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <img src="/assets/image/category-office.png" alt="Laptop Văn phòng" className="mx-auto mb-4 h-32 object-contain" />
            <h3 className="text-xl font-semibold mb-2">Laptop Văn phòng</h3>
            <a href="/products?category=Office" className="text-primary hover:underline">Xem ngay</a>
          </div>
          {/* Placeholder Category Card 3 */}
          <div className="bg-muted p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <img src="/assets/image/category-student.png" alt="Laptop cho Sinh viên" className="mx-auto mb-4 h-32 object-contain" />
            <h3 className="text-xl font-semibold mb-2">Laptop cho Sinh viên</h3>
            <a href="/products?category=Student" className="text-primary hover:underline">Xem ngay</a>
          </div>
          {/* Placeholder Category Card 4 */}
          <div className="bg-muted p-6 rounded-lg text-center hover:shadow-md transition-shadow">
            <img src="/assets/image/category-graphic.png" alt="Laptop Đồ họa" className="mx-auto mb-4 h-32 object-contain" />
            <h3 className="text-xl font-semibold mb-2">Laptop Đồ họa</h3>
            <a href="/products?category=Graphic-Design" className="text-primary hover:underline">Xem ngay</a>
          </div>
        </div>
      </section>

      {/* 3. Phần sản phẩm mới */}
      <section className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Sản phẩm mới</h2>
          <a href="/products" className="text-primary hover:underline text-lg">
            Xem tất cả
          </a>
        </div>
        <ProductList />
      </section>

      {/* 4. Phần thương hiệu nổi bật */}
      <section className="container py-12 bg-muted">
        <h2 className="text-3xl font-bold text-center mb-8">Thương hiệu nổi bật</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
          {/* Placeholder Brand Logos */}
          <img src="/assets/image/brand-dell.png" alt="Dell" className="h-16 w-auto mx-auto opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/assets/image/brand-hp.png" alt="HP" className="h-16 w-auto mx-auto opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/assets/image/brand-lenovo.png" alt="Lenovo" className="h-16 w-auto mx-auto opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/assets/image/brand-asus.png" alt="Asus" className="h-16 w-auto mx-auto opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/assets/image/brand-apple.png" alt="Apple" className="h-16 w-auto mx-auto opacity-75 hover:opacity-100 transition-opacity" />
          <img src="/assets/image/brand-acer.png" alt="Acer" className="h-16 w-auto mx-auto opacity-75 hover:opacity-100 transition-opacity" />
        </div>
      </section>

      {/* 5. Banner khuyến mãi */}
      <section className="container py-12">
        <div className="relative bg-primary text-primary-foreground p-12 rounded-lg text-center">
          <h2 className="text-4xl font-bold mb-4">Ưu đãi đặc biệt!</h2>
          <p className="text-xl mb-6">Giảm giá lên đến 20% cho tất cả laptop gaming.</p>
          <a href="/products?category=Gaming" className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-full hover:bg-muted transition-colors">
            Mua ngay
          </a>
        </div>
      </section>
    </main>
  );
}