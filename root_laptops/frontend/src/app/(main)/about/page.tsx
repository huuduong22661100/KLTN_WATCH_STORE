import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Giới thiệu - Watch Store",
  description: "Về cửa hàng đồng hồ Watch Store - Chuyên cung cấp đồng hồ Casio chính hãng, uy tín và chất lượng.",
};

export default function AboutPage() {
  return (
    <div className="py-8">
      {}
      <section className="relative h-[400px] mb-16">
        <Image
          src="/assets/image/banner-Casio Trẻ Trung.jpg"
          alt="About Banner"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Về Watch Store</h1>
            <p className="text-lg md:text-xl">
              Đồng hành cùng phong cách của bạn từ năm 2020
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-6xl">
        {}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong>Watch Store</strong> được thành lập vào năm 2020 với sứ mệnh mang đến cho khách hàng 
                  Việt Nam những sản phẩm đồng hồ Casio chính hãng với chất lượng tốt nhất và giá cả hợp lý nhất.
                </p>
                <p>
                  Với hơn 5 năm kinh nghiệm trong lĩnh vực phân phối đồng hồ, chúng tôi tự hào là một trong 
                  những đại lý uy tín của Casio tại Việt Nam, được hàng nghìn khách hàng tin tưởng và lựa chọn.
                </p>
                <p>
                  Chúng tôi không chỉ bán đồng hồ, mà còn mang đến những giá trị về phong cách sống, 
                  sự tự tin và đẳng cấp cho mỗi khách hàng thông qua từng sản phẩm.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/assets/image/Casio_gaming.jpg"
                alt="Watch Store"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Sứ mệnh</h3>
              <p className="text-gray-700 leading-relaxed">
                Cung cấp những sản phẩm đồng hồ chính hãng, chất lượng cao với dịch vụ khách hàng xuất sắc. 
                Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất và xây dựng mối quan hệ tin cậy 
                lâu dài với mỗi khách hàng.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Tầm nhìn</h3>
              <p className="text-gray-700 leading-relaxed">
                Trở thành cửa hàng đồng hồ Casio hàng đầu tại Việt Nam, được biết đến với uy tín, 
                chất lượng và dịch vụ chuyên nghiệp. Mở rộng mạng lưới cửa hàng và phát triển 
                nền tảng trực tuyến để phục vụ khách hàng trên toàn quốc.
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Giá trị cốt lõi</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Uy tín</h3>
              <p className="text-gray-600">
                100% sản phẩm chính hãng, có nguồn gốc rõ ràng
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Chất lượng</h3>
              <p className="text-gray-600">
                Cam kết chất lượng sản phẩm và dịch vụ tốt nhất
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Tận tâm</h3>
              <p className="text-gray-600">
                Đặt khách hàng làm trung tâm trong mọi hoạt động
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Chuyên nghiệp</h3>
              <p className="text-gray-600">
                Đội ngũ nhân viên được đào tạo bài bản, chuyên nghiệp
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="mb-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm của chúng tôi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image
                  src="/assets/image/Casio_gaming.jpg"
                  alt="G-SHOCK"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">G-SHOCK</h3>
              <p className="text-gray-600 text-sm">
                Dòng đồng hồ thể thao với độ bền vượt trội, phù hợp cho mọi hoạt động ngoài trời
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image
                  src="/assets/image/banner-Casio Trẻ Trung.jpg"
                  alt="BABY-G"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">BABY-G</h3>
              <p className="text-gray-600 text-sm">
                Thiết kế năng động, trẻ trung dành riêng cho phái đẹp
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image
                  src="/assets/image/Sinh-vien.jpg"
                  alt="EDIFICE"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">EDIFICE</h3>
              <p className="text-gray-600 text-sm">
                Sang trọng, lịch lãm phù hợp cho môi trường công sở
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-40 mb-4">
                <Image
                  src="/assets/image/đồ hạo.jpg"
                  alt="SHEEN"
                  fill
                  className="object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">SHEEN</h3>
              <p className="text-gray-600 text-sm">
                Tinh tế, thanh lịch dành cho nữ giới hiện đại
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="mb-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">5+</div>
              <p className="text-blue-100">Năm kinh nghiệm</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-green-100">Khách hàng tin tưởng</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-purple-100">Sản phẩm đa dạng</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-8">
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-orange-100">Khách hàng hài lòng</p>
            </div>
          </div>
        </section>

        {}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Đội ngũ của chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Nguyễn Văn A</h3>
              <p className="text-gray-600 mb-2">Giám đốc điều hành</p>
              <p className="text-sm text-gray-500">
                15 năm kinh nghiệm trong ngành đồng hồ
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Trần Thị B</h3>
              <p className="text-gray-600 mb-2">Trưởng phòng Kinh doanh</p>
              <p className="text-sm text-gray-500">
                10 năm kinh nghiệm quản lý bán hàng
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Lê Văn C</h3>
              <p className="text-gray-600 mb-2">Trưởng phòng CSKH</p>
              <p className="text-sm text-gray-500">
                8 năm kinh nghiệm chăm sóc khách hàng
              </p>
            </div>
          </div>
        </section>

        {}
        <section className="text-center bg-black text-white rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Sẵn sàng tìm kiếm chiếc đồng hồ hoàn hảo?</h2>
          <p className="text-lg mb-8 text-gray-300">
            Ghé thăm cửa hàng của chúng tôi hoặc mua sắm trực tuyến ngay hôm nay!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/products"
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Xem sản phẩm
            </a>
            <a
              href="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Liên hệ ngay
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
