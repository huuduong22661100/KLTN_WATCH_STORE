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
import styles from './page.module.css';

export default function ProfilePage() {
  const { isHydrated, isAuthenticated } = useAuthGuard();
  const { data: user, isLoading } = useProfile();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  
  if (!isHydrated) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Tài khoản của tôi</h1>
          <p className={styles.subtitle}>
            Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
          </p>
        </div>

        <ProfileForm 
          user={user} 
          onOpenPasswordDialog={() => setIsPasswordDialogOpen(true)}
        />

        <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
          <DialogContent style={{ maxWidth: '500px' }}>
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
