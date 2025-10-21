"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bell,
  Home,
  Package,
  ShoppingCart,
  Users,
  FileText,
  Palette,
  Folder,
  LogOut,
  UserCircle,
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { toast } from "@/hooks/use-toast";
import styles from "./layout.module.css";

const navLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/products", icon: Package, label: "Products" },
  { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/dashboard/news", icon: FileText, label: "News" },
  { href: "/dashboard/categories", icon: Folder, label: "Categories" },
  { href: "/dashboard/colors", icon: Palette, label: "Colors" },
  { href: "/dashboard/users", icon: Users, label: "Users" },
];

interface NavLinkProps {
  href: string;
  icon: any;
  label: string;
}

const NavLink = ({ href, icon: Icon, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
    >
      <Icon className={styles.navIcon} />
      {label}
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) {
      router.replace("/login");
    } else {
      setIsAuthChecked(true);
    }
  }, [router]); 

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công", {
      description: "Hẹn gặp lại!",
    });
    router.replace("/login");
  };

  if (!isAuthChecked) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardGrid}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <div className={styles.sidebarHeader}>
            <Link href="/" className={styles.logoLink}>
              <span>Admin Panel</span>
            </Link>
            <Button variant="outline" size="icon" className={styles.notificationButton}>
              <Bell className={styles.navIcon} />
              <span className={styles.srOnly}>Toggle notifications</span>
            </Button>
          </div>
          <div className={styles.navContainer}>
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h2 className={styles.welcomeText}>
              Welcome, {user?.name || user?.email || "Admin"}
            </h2>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userDetails}>
              <UserCircle className={styles.userIcon} />
              <span className={styles.userEmail}>
                {user?.email || "admin@example.com"}
              </span>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className={styles.logoutIcon} />
              Đăng xuất
            </Button>
          </div>
        </header>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
