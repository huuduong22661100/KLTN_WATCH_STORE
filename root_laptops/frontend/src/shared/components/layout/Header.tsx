'use client';
import React, { useState, useEffect } from "react";
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
import { Clock, Heart, LogOut, Search, ShoppingCart, User } from "lucide-react";
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
import { Product, ProductCategory } from "@/features/products/types";
import styles from './Header.module.css';

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
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  const { data: categoriesData } = useCategories();
  const categories = categoriesData?.data || [];

  const { isAuthenticated: isLoggedIn, user, logout } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1"}/products?search=${searchQuery}`
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
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <img src={headerData.logoUrl} alt="Logo" className={styles.logoImage} />
          <span className={styles.logoText}>Watch Store</span>
        </Link>

        <NavigationMenu className={styles.navigation} delayDuration={0}>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold text-sm text-white flex items-center gap-1 bg-transparent hover:bg-gray-800 data-[state=open]:bg-gray-800">
                Sản phẩm
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-black border border-gray-700 rounded-lg shadow-lg p-2 min-w-[200px] z-50">
                <ul className="flex flex-col gap-1">
                  {categories.map((category: ProductCategory) => (
                    <li key={category._id}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/products?category=${category._id}`}
                          className="block px-4 py-2.5 text-white text-sm rounded hover:bg-gray-800 transition-colors"
                        >
                          {category.category}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {headerData.navItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink asChild >
                  <Link
                    href={item.url}
                    className="px-4 py-2 rounded font-semibold text-sm text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className={styles.searchWrapper}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim().length >= 2 && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <Search className={styles.searchIcon} />
            </button>
          </form>

          {showSearchResults && (
            <div className={styles.searchResultsWrapper}>
              {isSearching ? (
                <div className={styles.searchLoading}>
                  <div className={styles.searchSpinner}></div>
                  <p className={styles.searchLoadingText}>Đang tìm kiếm...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  <div className={styles.searchResultList}>
                    {searchResults.map((product) => (
                      <a
                        key={product._id}
                        href={`/products/${product._id}`}
                        className={styles.searchResultItem}
                      >
                        <img
                          src={product.images?.mainImg?.url || "/placeholder.jpg"}
                          alt={product.title}
                          className={styles.searchResultImage}
                        />
                        <div className={styles.searchResultInfo}>
                          <p className={styles.searchResultTitle}>
                            {product.title}
                          </p>
                          <p className={styles.searchResultPrice}>
                            {product.price?.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className={styles.showAllResults}>
                    <a
                      href={`/products?search=${encodeURIComponent(searchQuery)}`}
                      className={styles.showAllResultsLink}
                    >
                      Xem tất cả kết quả ({searchResults.length}+)
                    </a>
                  </div>
                </>
              ) : (
                <div className={styles.noResults}>
                  <Search className={styles.noResultsIcon} />
                  <p className={styles.noResultsText}>Không tìm thấy sản phẩm nào</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.actionsWrapper}>
          <div className={styles.cartWrapper}>
            <Link href="/cart" className={styles.cartLink}>
              <ShoppingCart className={styles.cartIcon} />
              <span className={styles.cartBadge}>
                {isClient ? totalItems : 0}
              </span>
            </Link>
            <div className={styles.cartDropdown}>
              <h3 className={styles.cartDropdownTitle}>Giỏ hàng của tôi</h3>
              <p className={styles.cartDropdownSubtitle}>
                {isClient ? totalItems : 0} sản phẩm trong giỏ
              </p>
              {cartItems.length === 0 ? (
                <p className={styles.cartEmptyText}>
                  Giỏ hàng của bạn trống.
                </p>
              ) : (
                <>
                  <div className={styles.cartItemList}>
                    {cartItems.map((item) => (
                      <div
                        key={item.product._id}
                        className={styles.cartItem}
                      >
                        <img
                          src={item.product.images.mainImg.url}
                          alt={item.product.title}
                          className={styles.cartItemImage}
                        />
                        <div className={styles.cartItemInfo}>
                          <p className={styles.cartItemTitle}>
                            {item.product.title}
                          </p>
                          <p className={styles.cartItemPrice}>
                            {item.quantity} x{" "}
                            {item.product.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <p className={styles.cartItemTotalPrice}>
                          {(item.quantity * item.product.price).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </p>
                      </div>
                    ))}
                  </div>
                  <hr className={styles.divider} />
                  <div className={styles.subtotal}>
                    <span>Tổng phụ:</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  <Button
                    asChild
                    className={styles.viewCartButton}
                    variant="outline"
                  >
                    <Link href="/cart">Xem hoặc chỉnh sửa giỏ hàng</Link>
                  </Button>
                  <Button asChild className={styles.checkoutButton}>
                    <Link href="/checkout">Tiến hành thanh toán</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className={styles.userActions}>
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={styles.userButton}>
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
                  <Button variant="ghost" className={styles.userButton}>
                    <User className={styles.userIcon} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/login" className="block w-full">
                      Đăng Nhập
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link href="/register" className="block w-full">
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
