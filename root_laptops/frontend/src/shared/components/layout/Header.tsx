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
import { ChevronDown, Clock, Heart, LogOut, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/features/wishlist/store/wishlistStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { DropdownMenuGroup, DropdownMenuLabel } from "@/shared/components/ui/dropdown-menu";
import { useCategories } from "@/features/products/hook/useCategories";

const headerData = {
  logoUrl: "/assets/image/Logo.jpg",
  navItems: [
    { url: "/brands", name: "Thương hiệu" },
    { url: "/news", name: "Tin tức" },
    { url: "/about", name: "Giới thiệu" },
    { url: "/contact", name: "Liên hệ" },
  ],
};

const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const cartItems = useCartStore((state) => state.items);
  const wishlistTotal = useWishlistStore((state) => state.getTotalItems());
  const [isClient, setIsClient] = useState(false);
  
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Fetch categories for dynamic menu
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];

  const { isAuthenticated: isLoggedIn, user, logout } = useAuthStore();
  console.log("User object in Header:", user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Search products when user types
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http:
        );
        const data = await response.json();
        setSearchResults(data.data || []);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setShowSearchResults(false);
    }
  };

  return (
    <header className=" bg-black h-full text-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 bg-black px-4 h-28">
        {}
        <a href="/" className="flex items-center gap-2">
          <img src={headerData.logoUrl} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl tracking-widest">Watch Store</span>
        </a>

        {}
        <NavigationMenu className="hidden lg:flex items-center gap-8" delayDuration={0}>
          <NavigationMenuList className=" gap-4 ">
            {}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold text-sm text-white flex items-center gap-1 bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                Sản phẩm
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-black border border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px] z-50">
                <ul className="flex flex-col gap-1">
                  {categories.map((category: any) => (
                    <li key={category._id}>
                      <NavigationMenuLink asChild>
                        <a
                          href={`/products?category=${category._id}`}
                          className="block px-4 py-2.5 text-white text-sm rounded hover:bg-gray-800 transition-colors"
                        >
                          {category.category}
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {}
            {headerData.navItems.map((item) => (
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
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {}
        <div className="hidden md:flex items-center mx-6 w-96 relative">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length >= 2 && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-full h-11 pl-4 pr-10 rounded-full bg-gray-900 text-white border border-gray-700 focus:border-yellow-400 text-base"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400 hover:text-yellow-400 transition-colors" />
            </button>
          </form>

          {}
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-gray-700 rounded-lg shadow-xl z-50 max-h-[450px] overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-center text-gray-400">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400 mx-auto"></div>
                  <p className="mt-2 text-sm">Đang tìm kiếm...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="p-2">
                    {searchResults.map((product) => (
                      <a
                        key={product._id}
                        href={`/products/${product._id}`}
                        className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded transition-colors"
                      >
                        <img
                          src={product.images?.mainImg?.url || "/placeholder.jpg"}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-base font-medium line-clamp-2 mb-1">
                            {product.title}
                          </p>
                          <p className="text-yellow-400 text-base font-bold">
                            {product.price?.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 p-2">
                    <a
                      href={`/products?search=${encodeURIComponent(searchQuery)}`}
                      className="block text-center text-yellow-400 hover:text-yellow-300 text-sm font-medium py-2"
                    >
                      Xem tất cả kết quả ({searchResults.length}+)
                    </a>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-gray-400">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Không tìm thấy sản phẩm nào</p>
                </div>
              )}
            </div>
          )}
        </div>

        {}
        <div className="flex items-center gap-4">
          {}
          <div className="relative group">
            <a href="/cart" className="relative">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {isClient ? totalItems : 0}
              </span>
            </a>
            {}
            <div className="absolute top-full right-0 pd-2 w-80 bg-black border border-gray-700 shadow-lg rounded-md p-4 z-50 hidden group-hover:block">
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
                    <a href="/checkout">Tiến hành thanh toán</a>
                  </Button>
                </>
              )}
            </div>
          </div>
          {}
          <div className="flex items-center gap-2 ml-4">
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage src={user.avatar_url} alt={user.name || "User"} />
                      <AvatarFallback className="bg-yellow-400 text-black font-bold">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link href="/profile" passHref>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Tài khoản của tôi</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/orders" passHref>
                      <DropdownMenuItem className="cursor-pointer">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Lịch sử đơn hàng</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/wishlist" passHref>
                      <DropdownMenuItem className="cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Sản phẩm yêu thích ({isClient ? wishlistTotal : 0})</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                    <User className="w-6 h-6 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
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
