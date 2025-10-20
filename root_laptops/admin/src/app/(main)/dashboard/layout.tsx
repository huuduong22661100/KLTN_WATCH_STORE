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
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
        isActive ? "bg-muted text-primary" : "text-muted-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
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
  }, []); 

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công", {
      description: "Hẹn gặp lại!",
    });
    router.replace("/login");
  };

  
  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="">Admin Panel</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <h2 className="text-lg font-semibold">
              Welcome, {user?.name || user?.email || "Admin"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <UserCircle className="h-5 w-5 text-muted-foreground" />
              <span className="hidden md:inline text-muted-foreground">
                {user?.email || "admin@example.com"}
              </span>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
