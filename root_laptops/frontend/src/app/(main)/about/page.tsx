import type { Metadata } from "next";
import Image from "next/image";
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Giới thiệu - Watch Store",
  description: "Về cửa hàng đồng hồ Watch Store - Chuyên cung cấp đồng hồ Casio chính hãng, uy tín và chất lượng.",
};

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <section className={styles.banner}>
        <Image
          src="/assets/image/banner-Casio Trẻ Trung.jpg"
          alt="About Banner"
          fill
          className={styles.bannerImage}
          priority
        />
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerContent}>
            <h1 className={styles.bannerTitle}>Về Watch Store</h1>
            <p className={styles.bannerSubtitle}>
              Đồng hành cùng phong cách của bạn từ năm 2020
            </p>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.section}>
          <div className={`${styles.grid} ${styles.gridTwo}`} style={{ alignItems: 'center', gap: '3rem' }}>
            <div>
              <h2 className={styles.sectionTitle}>Câu chuyện của chúng tôi</h2>
              <div className={styles.textContent}>
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
            <div className={styles.imageWrapper}>
              <Image
                src="/assets/image/Casio_gaming.jpg"
                alt="Watch Store"
                fill
                className={styles.image}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.missionVisionGrid}>
            <div className={styles.missionCard}>
              <div className={`${styles.cardIconWrapper} ${styles.missionIconWrapper}`}>
                <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={styles.missionVisionTitle}>Sứ mệnh</h3>
              <p className={styles.cardParagraph}>
                Cung cấp những sản phẩm đồng hồ chính hãng, chất lượng cao với dịch vụ khách hàng xuất sắc. 
                Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất và xây dựng mối quan hệ tin cậy 
                lâu dài với mỗi khách hàng.
              </p>
            </div>
            <div className={styles.visionCard}>
              <div className={`${styles.cardIconWrapper} ${styles.visionIconWrapper}`}>
                <svg className={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className={styles.missionVisionTitle}>Tầm nhìn</h3>
              <p className={styles.cardParagraph}>
                Trở thành cửa hàng đồng hồ Casio hàng đầu tại Việt Nam, được biết đến với uy tín, 
                chất lượng và dịch vụ chuyên nghiệp. Mở rộng mạng lưới cửa hàng và phát triển 
                nền tảng trực tuyến để phục vụ khách hàng trên toàn quốc.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitleCentered}>Giá trị cốt lõi</h2>
          <div className={styles.coreValuesGrid}>
            <div className={styles.valueItem}>
              <div className={`${styles.valueIconWrapper} ${styles.valueIconGreen}`}>
                <svg className={styles.valueIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Uy tín</h3>
              <p className={styles.valueText}>
                100% sản phẩm chính hãng, có nguồn gốc rõ ràng
              </p>
            </div>
            <div className={styles.valueItem}>
              <div className={`${styles.valueIconWrapper} ${styles.valueIconBlue}`}>
                <svg className={styles.valueIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Chất lượng</h3>
              <p className={styles.valueText}>
                Cam kết chất lượng sản phẩm và dịch vụ tốt nhất
              </p>
            </div>
            <div className={styles.valueItem}>
              <div className={`${styles.valueIconWrapper} ${styles.valueIconYellow}`}>
                <svg className={styles.valueIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Tận tâm</h3>
              <p className={styles.valueText}>
                Đặt khách hàng làm trung tâm trong mọi hoạt động
              </p>
            </div>
            <div className={styles.valueItem}>
              <div className={`${styles.valueIconWrapper} ${styles.valueIconRed}`}>
                <svg className={styles.valueIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Chuyên nghiệp</h3>
              <p className={styles.valueText}>
                Đội ngũ nhân viên được đào tạo bài bản, chuyên nghiệp
              </p>
            </div>
          </div>
        </section>

        <section className={styles.productsSection}>
          <h2 className={styles.sectionTitleCentered}>Sản phẩm của chúng tôi</h2>
          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <Image
                  src="/assets/image/Casio_gaming.jpg"
                  alt="G-SHOCK"
                  fill
                  className={styles.productImage}
                />
              </div>
              <h3 className={styles.productTitle}>G-SHOCK</h3>
              <p className={styles.productText}>
                Dòng đồng hồ thể thao với độ bền vượt trội, phù hợp cho mọi hoạt động ngoài trời
              </p>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <Image
                  src="/assets/image/banner-Casio Trẻ Trung.jpg"
                  alt="BABY-G"
                  fill
                  className={styles.productImage}
                />
              </div>
              <h3 className={styles.productTitle}>BABY-G</h3>
              <p className={styles.productText}>
                Thiết kế năng động, trẻ trung dành riêng cho phái đẹp
              </p>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <Image
                  src="/assets/image/Sinh-vien.jpg"
                  alt="EDIFICE"
                  fill
                  className={styles.productImage}
                />
              </div>
              <h3 className={styles.productTitle}>EDIFICE</h3>
              <p className={styles.productText}>
                Sang trọng, lịch lãm phù hợp cho môi trường công sở
              </p>
            </div>
            <div className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <Image
                  src="/assets/image/đồ hạo.jpg"
                  alt="SHEEN"
                  fill
                  className={styles.productImage}
                />
              </div>
              <h3 className={styles.productTitle}>SHEEN</h3>
              <p className={styles.productText}>
                Tinh tế, thanh lịch dành cho nữ giới hiện đại
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.statCardBlue}`}>
              <div className={styles.statNumber}>5+</div>
              <p className={styles.statLabelBlue}>Năm kinh nghiệm</p>
            </div>
            <div className={`${styles.statCard} ${styles.statCardGreen}`}>
              <div className={styles.statNumber}>10K+</div>
              <p className={styles.statLabelGreen}>Khách hàng tin tưởng</p>
            </div>
            <div className={`${styles.statCard} ${styles.statCardPurple}`}>
              <div className={styles.statNumber}>500+</div>
              <p className={styles.statLabelPurple}>Sản phẩm đa dạng</p>
            </div>
            <div className={`${styles.statCard} ${styles.statCardOrange}`}>
              <div className={styles.statNumber}>99%</div>
              <p className={styles.statLabelOrange}>Khách hàng hài lòng</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitleCentered}>Đội ngũ của chúng tôi</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <div className={styles.teamAvatar}>
                <div className={styles.teamAvatarPlaceholder}>
                  <svg className={styles.teamAvatarIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3 className={styles.teamName}>Nguyễn Văn A</h3>
              <p className={styles.teamRole}>Giám đốc điều hành</p>
              <p className={styles.teamBio}>
                15 năm kinh nghiệm trong ngành đồng hồ
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamAvatar}>
                <div className={styles.teamAvatarPlaceholder}>
                  <svg className={styles.teamAvatarIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3 className={styles.teamName}>Trần Thị B</h3>
              <p className={styles.teamRole}>Trưởng phòng Kinh doanh</p>
              <p className={styles.teamBio}>
                10 năm kinh nghiệm quản lý bán hàng
              </p>
            </div>
            <div className={styles.teamMember}>
              <div className={styles.teamAvatar}>
                <div className={styles.teamAvatarPlaceholder}>
                  <svg className={styles.teamAvatarIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              </div>
              <h3 className={styles.teamName}>Lê Văn C</h3>
              <p className={styles.teamRole}>Trưởng phòng CSKH</p>
              <p className={styles.teamBio}>
                8 năm kinh nghiệm chăm sóc khách hàng
              </p>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Sẵn sàng tìm kiếm chiếc đồng hồ hoàn hảo?</h2>
          <p className={styles.ctaText}>
            Ghé thăm cửa hàng của chúng tôi hoặc mua sắm trực tuyến ngay hôm nay!
          </p>
          <div className={styles.ctaButtons}>
            <a href="/products" className={styles.ctaButtonPrimary}>
              Xem sản phẩm
            </a>
            <a href="/contact" className={styles.ctaButtonSecondary}>
              Liên hệ ngay
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
