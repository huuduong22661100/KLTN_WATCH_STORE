import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export function useLogout() {
  const router = useRouter();
  const { logout } = useAuthStore();

  return () => {
    logout();
    router.push('/login');
  };
}