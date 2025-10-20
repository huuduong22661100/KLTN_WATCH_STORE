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
      icon: <Wrench className="inline mr-1 w-4 h-4" />,
      items: [
        "Cài đặt phần mềm",
        "Vệ sinh & Bảo dưỡng",
        "Nâng cấp & Sửa chữa",
      ],
    },
    {
      title: "VỀ CHÚNG TÔI",
      icon: <Users className="inline mr-1 w-4 h-4" />,
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
      icon: <Newspaper className="inline mr-1 w-4 h-4" />,
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
      icon: <HelpCircle className="inline mr-1 w-4 h-4" />,
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
      icon: <CreditCard className="inline mr-1 w-4 h-4" />,
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
    icon: <ShoppingCart className="w-5 h-5 text-yellow-400 mr-2" />,
    label: "MUA HÀNG ONLINE 24/7",
    desc: "Tất cả các ngày trong tuần",
  },
  {
    icon: <Phone className="w-5 h-5 text-yellow-400 mr-2" />,
    label: "HOTLINE BÁN HÀNG",
    desc: "1800 6785",
  },
  {
    icon: <Info className="w-5 h-5 text-yellow-400 mr-2" />,
    label: "HỖ TRỢ KĨ THUẬT",
    desc: "HN: 1800.6785 Nhánh 2 ",
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-0 pb-4">
      {}
      <div className="bg-[#575781] w-full border-b border-gray-800">
        <div className="container mx-auto  py-4">
          <ul className="flex align-center  gap-28 justify-center">
            {hotlineIcons.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-sm md:text-base"
              >
                {item.icon}
                <div>
                  <div className="font-bold">{item.label}</div>
                  <div className="text-gray-400">{item.desc}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4">
        {}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-gray-700 pb-6 mb-6">
          <div className="flex-1 flex flex-col gap-2">
            <span className="font-bold text-lg">
              <Phone className="inline w-5 h-5 text-yellow-400 mr-1" />
              Tư vấn hỗ trợ <span className="text-yellow-400">1800 6785</span>
            </span>
            <span className="text-gray-400 text-sm">
              <Info className="inline w-4 h-4 mr-1" />
              Tất cả các ngày trong tuần
            </span>
          </div>
          <div className="flex-1 flex justify-center my-4 md:my-0">
            <img src="/assets/image/Logo.jpg" alt="Logo" className="h-12" />
          </div>
          <div className="flex-1 flex justify-end gap-4">
            {footerData.socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                className="text-white hover:text-yellow-400"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-3 text-yellow-400">
              <Info className="inline w-4 h-4 mr-1" />
              THÔNG TIN LIÊN HỆ
            </h4>
            <ul className="text-sm space-y-1">
              {footerData.info.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          {footerData.columns.slice(0, 3).map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-3 text-yellow-400">
                {col.icon}
                {col.title}
              </h4>
              <ul className="text-sm space-y-1">
                {col.items.map((item, i) => {
                  
                  let href = "#";
                  if (item === "Giới thiệu về Watch Store") href = "/about";
                  else if (item === "Kiến thức về Watch") href = "/news";
                  else if (item === "Bản tin công nghệ") href = "/news";
                  else if (item === "Tin khuyến mại") href = "/news";
                  
                  return (
                    <li key={i}>
                      <a href={href} className="hover:text-yellow-400">
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        {}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            {footerData.payments.map((p, i) => (
              <img key={i} src={p} alt="Payment" className="h-6" />
            ))}
          </div>
          <p className="text-xs text-gray-400">
            Copyright © 2024 Watch Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
