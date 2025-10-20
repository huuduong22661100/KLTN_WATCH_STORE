import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";


export function useAuthGuard(redirectTo: string = "/login") {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  
  useEffect(() => {
    if (isHydrated && !token) {
      router.push(redirectTo);
    }
  }, [token, router, isHydrated, redirectTo]);

  return {
    isHydrated,
    isAuthenticated: !!token,
    token,
  };
}
