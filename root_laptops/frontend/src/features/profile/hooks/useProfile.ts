import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile, changePassword, UpdateProfileData, ChangePasswordData } from "../api";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export function useProfile() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(token!),
    enabled: !!token,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateUserProfile(token!, data),
    onSuccess: (userData) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      updateProfile(userData);
      toast.success("Cập nhật thông tin thành công!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Cập nhật thất bại");
    },
  });
}

export function useChangePassword() {
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(token!, data),
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Đổi mật khẩu thất bại");
    },
  });
}
