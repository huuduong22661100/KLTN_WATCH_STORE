"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, Clock, GitCompareArrows, Heart, LogOut, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenuGroup, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

const headerData = {
  logoUrl: "/assets/image/Logo.jpg",
  navItems: [
    {
      name: "Sản phẩm",
      url: "/products",
      submenu: [
        { name: "Laptop Gaming", url: "/products?category=Gaming" },
        { name: "Laptop Văn phòng", url: "/products?category=Office" },
        { name: "Laptop cho Sinh viên", url: "/products?category=Student" },
        { name: "Laptop Đồ họa", url: "/products?category=Graphic-Design" },
      ],
    },
    { url: "/brands", name: "Thương hiệu" },
    { url: "/news", name: "Tin tức" },
    { url: "/contact", name: "Liên hệ" },
  ],
};

const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const cartItems = useCartStore((state) => state.items);
  const [isClient, setIsClient] = useState(false);

  const { isLoggedIn, user, logout } = useAuthStore();
  console.log("User object in Header:", user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className=" bg-black h-full text-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 bg-black px-4 h-28">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={headerData.logoUrl} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl tracking-widest">LAPTOP STORE</span>
        </a>

        {/* Navigation */}
        <NavigationMenu className="hidden lg:flex items-center gap-8">
          <NavigationMenuList className=" gap-4 ">
            {headerData.navItems.map((item) =>
              item.submenu ? (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger className="font-semibold text-sm text-white flex items-center gap-1 bg-transparent">
                    {item.name}
                  </NavigationMenuTrigger>

                  <NavigationMenuContent className="bg-black border border-gray-700 rounded-lg shadow-lg p-2 min-w-[180px] z-50">
                    <ul className="flex flex-col">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <NavigationMenuLink asChild>
                            <a
                              href={subItem.url}
                              className="block px-4 py-2 text-white rounded hover:bg-gray-800 transition-colors"
                            >
                              {subItem.name}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild >
                    <a
                      href={item.url}
                      className="px-4 py-2 rounded font-semibold text-sm text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className="hidden md:flex items-center mx-6 w-80">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full h-10 pl-4 pr-10 rounded-full bg-gray-900 text-white border border-gray-700 focus:border-yellow-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div className="relative group">
            <a href="/cart" className="relative">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {isClient ? totalItems : 0}
              </span>
            </a>
            {/* Cart Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-80 bg-black border border-gray-700 shadow-lg rounded-md p-4 z-50 hidden group-hover:block">
              <h3 className="font-bold text-lg mb-2">Giỏ hàng của tôi</h3>
              <p className="text-sm text-gray-400 mb-4">
                {isClient ? totalItems : 0} sản phẩm trong giỏ
              </p>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-400">
                  Giỏ hàng của bạn trống.
                </p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={item.product._id}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={item.product.images.mainImg.url}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-medium line-clamp-1">
                            {item.product.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.quantity} x{" "}
                            {item.product.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          {(item.quantity * item.product.price).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </p>
                      </div>
                    ))}
                  </div>
                  <hr className="my-3 border-gray-700" />
                  <div className="flex justify-between font-bold">
                    <span>Tổng phụ:</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <Button
                    asChild
                    className="w-full mb-2 mt-3 border-yellow-400 text-yellow-400"
                    variant="outline"
                  >
                    <a href="/cart">Xem hoặc chỉnh sửa giỏ hàng</a>
                  </Button>
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300">
                    Tiến hành thanh toán
                  </Button>
                </>
              )}
            </div>
          </div>
          {/* Account Icon/Avatar with Dropdown */}
          <div className="flex items-center gap-2  w-[28px] h-[28px]">
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    {user.avatar_url ? (
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={user.avatar_url} alt={user.name} />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <User className="w-7 h-7 text-white" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile" passHref>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>My Account</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/profile/orders" passHref>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Lịch sử đơn hàng</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/wishlist" passHref>
                      <DropdownMenuItem>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>My Wish List (0)</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/compare" passHref>
                      <DropdownMenuItem>
                        <GitCompareArrows className="mr-2 h-4 w-4" />
                        <span>Compare (0)</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <User className="w-7 h-7 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black text-white border border-gray-700" align="end" forceMount>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/auth/login" className="block w-full">
                      Đăng Nhập
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/auth/register" className="block w-full">
                      Đăng Ký
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
