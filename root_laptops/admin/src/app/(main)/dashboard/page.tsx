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

export default function DashboardPage() {
  const { data: productsData } = useProducts({ limit: 1000 });
  const { data: ordersData } = useOrders({ limit: 1000 });
  const { data: usersData } = useUsers({ limit: 1000 });

  // Calculate statistics
  const totalProducts = productsData?.total || 0;
  const totalOrders = ordersData?.total || 0;
  const totalUsers = usersData?.total || 0;
  
  const totalRevenue = ordersData?.data?.reduce((sum, order) => {
    if (order.status !== 'cancelled') {
      return sum + order.total; // Backend uses 'total', not 'total_amount'
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Tổng quan về hoạt động của cửa hàng
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">{card.trend}</span>
                <span className="text-xs text-muted-foreground">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Sản phẩm sắp hết hàng
            </CardTitle>
            <CardDescription>
              Có {lowStockProducts} sản phẩm cần nhập thêm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {productsData?.data?.filter(p => p.stock < 10).slice(0, 5).map((product) => (
                <div key={product._id} className="flex justify-between items-center text-sm">
                  <span className="truncate">{product.title}</span>
                  <span className="text-red-600 font-medium">{product.stock} sản phẩm</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-yellow-600" />
              Đơn hàng chờ xác nhận
            </CardTitle>
            <CardDescription>
              Có {pendingOrders} đơn hàng cần xử lý
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ordersData?.data?.filter(o => o.status === 'pending').slice(0, 5).map((order) => (
                <div key={order._id} className="flex justify-between items-center text-sm">
                  <span className="truncate">{order.order_number}</span>
                  <span className="font-medium">{order.total.toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Sản phẩm bán chạy
            </CardTitle>
            <CardDescription>
              Top 5 sản phẩm có doanh số cao nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {productsData?.data?.slice(0, 5).map((product, index) => (
                <div key={product._id} className="flex justify-between items-center text-sm">
                  <span className="truncate">#{index + 1} {product.title}</span>
                  <span className="font-medium">{product.price.toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
