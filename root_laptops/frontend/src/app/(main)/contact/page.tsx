import type { Metadata } from "next";
import Image from "next/image";
import styles from './page.module.css';

export const metadata: Metadata = {
  title: "Liên hệ - Watch Store",
  description: "Thông tin liên hệ cửa hàng đồng hồ Casio chính hãng. Địa chỉ, số điện thoại, email và giờ làm việc.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <section className={styles.banner}>
        <Image
          src="/assets/image/banner-Casio Trẻ Trung.jpg"
          alt="Contact Banner"
          fill
          className={styles.bannerImage}
          priority
        />
        <div className={styles.bannerContent}>
          <div className={styles.bannerText}>
            <h1 className={styles.bannerTitle}>Liên hệ với chúng tôi</h1>
            <p className={styles.bannerSubtitle}>Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <section className={styles.section}>
          <div>
            <h2 className={styles.sectionTitle}>Cửa Hàng Đồng Hồ Watch Store</h2>
            <p className={styles.sectionSubtitle}>
              Chuyên cung cấp các sản phẩm đồng hồ Casio chính hãng với đa dạng mẫu mã: 
              G-SHOCK, BABY-G, EDIFICE, SHEEN. Cam kết chất lượng, giá tốt và dịch vụ tận tâm.
            </p>
          </div>

          <div className={`${styles.grid} ${styles.gridThree}`}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <div className={`${styles.icon} ${styles.iconBlue}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={styles.cardTitle}>Địa chỉ</h3>
              <p className={styles.cardText}>
                123 Đường Nguyễn Văn Linh
                <br />
                Quận 7, TP. Hồ Chí Minh
                <br />
                Việt Nam
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <div className={`${styles.icon} ${styles.iconGreen}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={styles.cardTitle}>Điện thoại</h3>
              <p className={styles.cardText}>
                Hotline: <a href="tel:1800 6785" className={`${styles.cardLink} ${styles.cardLinkBold}`}>1800 6785</a>
                <br />
                Mobile: <a href="tel:0901234567" className={styles.cardLink}>0901 234 567</a>
                <br />
                <span className={styles.cardSubtext}>(Miễn phí cuộc gọi)</span>
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <div className={`${styles.icon} ${styles.iconPurple}`}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={styles.cardTitle}>Email</h3>
              <p className={styles.cardText}>
                <a href="mailto:contact@watchstore.vn" className={styles.cardLink}>
                  contact@watchstore.vn
                </a>
                <br />
                <a href="mailto:support@watchstore.vn" className={styles.cardLink}>
                  support@watchstore.vn
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.workingHoursSection}>
          <h2 className={styles.sectionTitleSpaced}>Giờ làm việc</h2>
          <div className={styles.workingHoursWrapper}>
            <div className={styles.workingHoursGrid}>
              <div className={styles.workingHoursCard}>
                <h3 className={styles.workingHoursCardTitle}>
                  <svg className={styles.workingHoursIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thứ 2 - Thứ 6
                </h3>
                <p className={styles.workingHoursTime}>8:00 - 20:00</p>
              </div>
              <div className={styles.workingHoursCard}>
                <h3 className={styles.workingHoursCardTitle}>
                  <svg className={styles.workingHoursIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Thứ 7 - Chủ nhật
                </h3>
                <p className={styles.workingHoursTime}>9:00 - 21:00</p>
              </div>
            </div>
            <div className={styles.workingHoursNote}>
              <p>
                <span className={styles.noteHighlight}>Lưu ý:</span> Các ngày lễ, Tết có thể điều chỉnh giờ làm việc
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitleSpaced}>Về Chúng Tôi</h2>
          <div className={styles.whyUsGrid}>
            <div>
              <h3 className={styles.whyUsTitle}>Tại sao chọn Watch Store?</h3>
              <ul className={styles.whyUsList}>
                <li className={styles.whyUsListItem}>
                  <svg className={styles.whyUsListItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong>100% chính hãng:</strong> Tất cả sản phẩm đều được nhập khẩu chính hãng, có tem bảo hành quốc tế
                  </div>
                </li>
                <li className={styles.whyUsListItem}>
                  <svg className={styles.whyUsListItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong>Bảo hành toàn diện:</strong> Bảo hành chính hãng 1-5 năm, hỗ trợ sửa chữa trọn đời
                  </div>
                </li>
                <li className={styles.whyUsListItem}>
                  <svg className={styles.whyUsListItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong>Giá cả cạnh tranh:</strong> Cam kết giá tốt nhất thị trường, hỗ trợ trả góp 0%
                  </div>
                </li>
                <li className={styles.whyUsListItem}>
                  <svg className={styles.whyUsListItemIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <strong>Giao hàng nhanh:</strong> Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.whyUsImageWrapper}>
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
          <h2 className={styles.sectionTitleSpaced}>Vị trí cửa hàng</h2>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapPlaceholderContent}>
              <svg className={styles.mapPlaceholderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className={styles.mapTextLg}>Bản đồ Google Maps sẽ được tích hợp ở đây</p>
              <p className={styles.mapTextSm}>123 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitleSpaced}>Gửi tin nhắn cho chúng tôi</h2>
          <div className={styles.messageFormWrapper}>
            <form className={styles.messageForm}>
              <div className={styles.formGrid}>
                <div>
                  <label htmlFor="name" className={styles.formLabel}>
                    Họ và tên <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className={styles.formInput}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={styles.formLabel}>
                    Số điện thoại <span className={styles.requiredStar}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className={styles.formInput}
                    placeholder="0901 234 567"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className={styles.formLabel}>
                  Email <span className={styles.requiredStar}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={styles.formInput}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className={styles.formLabel}>
                  Tiêu đề
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={styles.formInput}
                  placeholder="Tôi muốn hỏi về..."
                />
              </div>
              <div>
                <label htmlFor="message" className={styles.formLabel}>
                  Nội dung <span className={styles.requiredStar}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className={styles.formTextarea}
                  placeholder="Nhập nội dung tin nhắn..."
                ></textarea>
              </div>
              <div className={styles.submitButtonWrapper}>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className={styles.connectSection}>
          <h2 className={styles.sectionTitleSpaced}>Kết nối với chúng tôi</h2>
          <div className={styles.socialLinkList}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} ${styles.facebook}`}
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} ${styles.instagram}`}
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialLink} ${styles.youtube}`}
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
