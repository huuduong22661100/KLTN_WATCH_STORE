import React from "react";
import {
  Facebook,
  Instagram,
  Phone,
  ShoppingCart,
  User,
  Info,
  Wrench,
  Newspaper,
  Users,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import styles from './Footer.module.css';

const footerData = {
  info: [
    "CÔNG TY TNHH BÁN LẺ Watch",
    "Trụ sở chính: 123 Đường ABC, Q. 1, TP. HCM",
    "Chi nhánh Hà Nội: 456 Đường XYZ, Q. Ba Đình, Hà Nội",
    "Hotline: 1800 6785",
    "Email: info@lpd.com.vn",
    "MST: 0102001789",
  ],
  columns: [
    {
      title: "DỊCH VỤ",
      icon: <Wrench className={styles.columnIcon} />,
      items: [
        "Cài đặt phần mềm",
        "Vệ sinh & Bảo dưỡng",
        "Nâng cấp & Sửa chữa",
      ],
    },
    {
      title: "VỀ CHÚNG TÔI",
      icon: <Users className={styles.columnIcon} />,
      items: [
        "Giới thiệu về Watch Store",
        "Triết lí kinh doanh",
        "Cam kết chính hãng",
        "Khách hàng nói gì về chúng tôi",
        "Hệ thống cửa hàng",
        "Hoạt động xã hội",
      ],
    },
    {
      title: "TIN TỨC",
      icon: <Newspaper className={styles.columnIcon} />,
      items: [
        "Kiến thức về Watch",
        "Bản tin công nghệ",
        "Tin khuyến mại",
        "Tuyển dụng",
        "Blog",
      ],
    },
    {
      title: "CHĂM SÓC KHÁCH HÀNG",
      icon: <HelpCircle className={styles.columnIcon} />,
      items: [
        "Ưu đãi hội viên",
        "Chính sách đổi sản phẩm",
        "Chính sách bảo hành",
        "Câu hỏi thường gặp",
        "Góp ý - Khiếu nại",
        "Chính sách bảo mật thông tin",
      ],
    },
    {
      title: "HƯỚNG DẪN MUA HÀNG",
      icon: <CreditCard className={styles.columnIcon} />,
      items: [
        "Đăng nhập tài khoản",
        "Hướng dẫn mua hàng",
        "Chính sách đổi hàng",
        "Thanh toán",
        "Trả góp",
      ],
    },
  ],
  payments: [
    "/assets/icon/payment01.svg",
    "/assets/icon/payment02.svg",
    "/assets/icon/payment03.svg",
    "/assets/icon/payment04.svg",
    "/assets/icon/payment05.svg",
  ],
  logos: [
    "/assets/image/brand-dell.png",
    "/assets/image/brand-hp.png",
    "/assets/image/brand-lenovo.png",
    "/assets/image/brand-asus.png",
  ],
  socials: [
    { icon: <Facebook />, url: "#" },
    { icon: <Instagram />, url: "#" },
  ],
};

const hotlineIcons = [
  {
    icon: <ShoppingCart className={styles.topBarIcon} />,
    label: "MUA HÀNG ONLINE 24/7",
    desc: "Tất cả các ngày trong tuần",
  },
  {
    icon: <Phone className={styles.topBarIcon} />,
    label: "HOTLINE BÁN HÀNG",
    desc: "1800 6785",
  },
  {
    icon: <Info className={styles.topBarIcon} />,
    label: "HỖ TRỢ KĨ THUẬT",
    desc: "HN: 1800.6785 Nhánh 2 ",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}>
        <div className={styles.container}>
          <ul className={styles.topBarList}>
            {hotlineIcons.map((item, idx) => (
              <li key={idx} className={styles.topBarItem}>
                {item.icon}
                <div>
                  <div className={styles.topBarLabel}>{item.label}</div>
                  <div className={styles.topBarDesc}>{item.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.contactSection}>
            <span className={styles.contactPhone}>
              <Phone className={styles.contactPhoneIcon} />
              Tư vấn hỗ trợ <span className={styles.contactPhoneHighlight}>1800 6785</span>
            </span>
            <span className={styles.contactInfo}>
              <Info className={styles.contactInfoIcon} />
              Tất cả các ngày trong tuần
            </span>
          </div>
          <div className={styles.logoSection}>
            <img src="/assets/image/Logo.jpg" alt="Logo" className={styles.logo} />
          </div>
          <div className={styles.socialSection}>
            {footerData.socials.map((s, i) => (
              <a key={i} href={s.url} className={styles.socialLink}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.columnsGrid}>
          <div>
            <h4 className={styles.columnTitle}>
              <Info className={styles.columnIcon} />
              THÔNG TIN LIÊN HỆ
            </h4>
            <ul className={styles.columnList}>
              {footerData.info.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          {footerData.columns.slice(0, 3).map((col, idx) => (
            <div key={idx}>
              <h4 className={styles.columnTitle}>
                {col.icon}
                {col.title}
              </h4>
              <ul className={styles.columnList}>
                {col.items.map((item, i) => {
                  let href = "#";
                  if (item === "Giới thiệu về Watch Store") href = "/about";
                  else if (item === "Kiến thức về Watch") href = "/news";
                  else if (item === "Bản tin công nghệ") href = "/news";
                  else if (item === "Tin khuyến mại") href = "/news";
                  
                  return (
                    <li key={i}>
                      <a href={href} className={styles.columnLink}>
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.paymentIcons}>
            {footerData.payments.map((p, i) => (
              <img key={i} src={p} alt="Payment" className={styles.paymentIcon} />
            ))}
          </div>
          <p className={styles.copyright}>
            Copyright © 2024 Watch Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
