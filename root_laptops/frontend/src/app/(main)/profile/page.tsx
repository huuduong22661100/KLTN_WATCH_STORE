"use client";

import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileForm from "@/features/profile/components/ProfileForm";
import ChangePasswordForm from "@/features/profile/components/ChangePasswordForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { isHydrated, isAuthenticated } = useAuthGuard();
  const { data: user, isLoading } = useProfile();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tài khoản của tôi</h1>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
          </p>
        </div>

        <ProfileForm 
          user={user} 
          onOpenPasswordDialog={() => setIsPasswordDialogOpen(true)}
        />

        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
              <DialogDescription>
                Nhập mật khẩu hiện tại và mật khẩu mới để thay đổi
              </DialogDescription>
            </DialogHeader>
            <ChangePasswordForm onSuccess={() => setIsPasswordDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
