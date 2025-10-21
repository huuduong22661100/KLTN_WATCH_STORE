"use client";

import { useState } from "react";
import { useChangePassword } from "../hooks/useProfile";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import styles from './ChangePasswordForm.module.css';

interface ChangePasswordFormProps {
  onSuccess?: () => void;
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
  const { mutate: changePassword, isPending } = useChangePassword();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }

    changePassword(formData, {
      onSuccess: () => {
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
        <div className={styles.inputWrapper}>
          <Input
            id="currentPassword"
            name="currentPassword"
            type={showPassword.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={styles.toggleButton}
            onClick={() =>
              setShowPassword({ ...showPassword, current: !showPassword.current })
            }
          >
            {showPassword.current ? (
              <EyeOff className={styles.toggleIcon} />
            ) : (
              <Eye className={styles.toggleIcon} />
            )}
          </Button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <Label htmlFor="newPassword">Mật khẩu mới</Label>
        <div className={styles.inputWrapper}>
          <Input
            id="newPassword"
            name="newPassword"
            type={showPassword.new ? "text" : "password"}
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
            required
            minLength={6}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={styles.toggleButton}
            onClick={() =>
              setShowPassword({ ...showPassword, new: !showPassword.new })
            }
          >
            {showPassword.new ? (
              <EyeOff className={styles.toggleIcon} />
            ) : (
              <Eye className={styles.toggleIcon} />
            )}
          </Button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
        <div className={styles.inputWrapper}>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu mới"
            required
            minLength={6}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={styles.toggleButton}
            onClick={() =>
              setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
            }
          >
            {showPassword.confirm ? (
              <EyeOff className={styles.toggleIcon} />
            ) : (
              <Eye className={styles.toggleIcon} />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" disabled={isPending} className={styles.submitButton}>
        {isPending && <Loader2 className={styles.spinner} />}
        Đổi mật khẩu
      </Button>
    </form>
  );
}
