'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, AlertCircle } from "lucide-react";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { useUsers } from "@/features/users/hooks/useUsers";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({ limit: 1000 });
  const { data: ordersData, isLoading: isLoadingOrders } = useOrders({ limit: 1000 });
  const { data: usersData, isLoading: isLoadingUsers } = useUsers({ limit: 1000 });

  const isLoading = isLoadingProducts || isLoadingOrders || isLoadingUsers;

  const totalProducts = productsData?.total || 0;
  const totalOrders = ordersData?.total || 0;
  const totalUsers = usersData?.total || 0;
  
  const totalRevenue = ordersData?.data?.reduce((sum, order) => {
    if (order.status !== 'cancelled') {
      return sum + order.total;
    }
    return sum;
  }, 0) || 0; 

  const lowStockProducts = productsData?.data?.filter(p => p.stock < 10).length || 0;
  const pendingOrders = ordersData?.data?.filter(o => o.status === 'pending').length || 0;

  const cardData = [
    {
      title: "Tổng doanh thu",
      icon: DollarSign,
      value: `${totalRevenue.toLocaleString('vi-VN')}đ`,
      description: `Từ ${totalOrders} đơn hàng`,
      trend: "+20.1%",
      color: "text-green-600"
    },
    {
      title: "Tổng sản phẩm",
      icon: Package,
      value: totalProducts.toString(),
      description: `${lowStockProducts} sản phẩm sắp hết hàng`,
      trend: "+5.2%",
      color: lowStockProducts > 0 ? "text-orange-600" : "text-blue-600"
    },
    {
      title: "Đơn hàng",
      icon: ShoppingCart,
      value: totalOrders.toString(),
      description: `${pendingOrders} đơn chờ xác nhận`,
      trend: "+12.5%",
      color: pendingOrders > 0 ? "text-yellow-600" : "text-purple-600"
    },
    {
      title: "Người dùng",
      icon: Users,
      value: totalUsers.toString(),
      description: "Tổng số tài khoản",
      trend: "+8.3%",
      color: "text-indigo-600"
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.description}>
          Tổng quan về hoạt động của cửa hàng
        </p>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Đang tải dữ liệu dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            {cardData.map((card, index) => (
              <Card key={index}>
                <CardHeader className={styles.cardHeader}>
                  <CardTitle className={styles.cardTitle}>{card.title}</CardTitle>
                  <card.icon className={`${styles.cardIcon} ${card.color === "text-green-600" ? styles.iconGreen : card.color === "text-blue-600" ? styles.iconBlue : card.color === "text-orange-600" ? styles.iconOrange : card.color === "text-yellow-600" ? styles.iconYellow : card.color === "text-purple-600" ? styles.iconPurple : styles.iconIndigo}`} />
                </CardHeader>
                <CardContent>
                  <div className={styles.cardValue}>{card.value}</div>
                  <p className={styles.cardDescription}>
                    {card.description}
                  </p>
                  <div className={styles.trendContainer}>
                    <TrendingUp className={styles.trendIcon} />
                    <span className={styles.trendValue}>{card.trend}</span>
                    <span className={styles.trendLabel}>so với tháng trước</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className={styles.detailsSection}>
            <Card className={styles.detailCard}>
              <CardHeader>
                <CardTitle className={styles.detailCardHeader}>
                  <AlertCircle className={`${styles.detailIcon} ${styles.iconOrange}`} />
                  Sản phẩm sắp hết hàng
                </CardTitle>
                <CardDescription>
                  Có {lowStockProducts} sản phẩm cần nhập thêm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.detailsList}>
                  {productsData?.data?.filter(p => p.stock < 10).slice(0, 5).map((product) => (
                    <div key={product._id} className={styles.detailItem}>
                      <span className={`${styles.detailItemTruncate} ${styles.detailItemFlex}`}>{product.title}</span>
                      <span className={`${styles.detailItemTruncate} ${styles.detailItemFlex}`}>{product.price.toLocaleString('vi-VN')}đ</span>
                      <span className={styles.detailStock}>{product.stock} sản phẩm</span>
                      {product.images?.mainImg?.url && (
                        <img 
                          src={product.images.mainImg.url} 
                          alt={product.images.mainImg.alt_text || product.title} 
                          className={styles.detailImage}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={styles.detailCard}>
              <CardHeader>
                <CardTitle className={styles.detailCardHeader}>
                  <ShoppingCart className={`${styles.detailIcon} ${styles.iconYellow}`} />
                  Đơn hàng chờ xác nhận
                </CardTitle>
                <CardDescription>
                  Có {pendingOrders} đơn hàng cần xử lý
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.detailsList}>
                  {ordersData?.data?.filter(o => o.status === 'pending').slice(0, 5).map((order) => (
                    <div key={order._id} className={styles.detailItem}>
                      <span className={styles.detailItemTruncate}>{order._id}</span>
                      <span className={styles.detailItemTruncate}>{order.updatedAt}</span>
                      <span className={styles.detailPrice}>{order.total.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={styles.detailCard}>
              <CardHeader>
                <CardTitle className={styles.detailCardHeader}>
                  <TrendingUp className={`${styles.detailIcon} ${styles.iconGreen}`} />
                  Sản phẩm bán chạy
                </CardTitle>
                <CardDescription>
                  Top 5 sản phẩm có doanh số cao nhất
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={styles.detailsList}>
                  {productsData?.data?.slice(0, 5).map((product, index) => (
                    <div key={product._id} className={styles.detailItem}>
                      <span className={styles.detailItemTruncate}>#{index + 1} {product.title}</span>
                      <span className={styles.detailPrice}>{product.price.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
