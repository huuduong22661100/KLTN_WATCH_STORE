"use client";

import { useState, useEffect } from "react";
import { useUpdateProfile } from "../hooks/useProfile";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Separator } from "@/shared/components/ui/separator";
import { User } from "@/features/auth/types";
import { Loader2, User as UserIcon, Mail, Phone, MapPin, Camera, Edit, X, Lock } from "lucide-react";
import Image from "next/image";
import styles from './ProfileForm.module.css';

interface ProfileFormProps {
  user: User;
  onOpenPasswordDialog?: () => void;
}

export default function ProfileForm({ user, onOpenPasswordDialog }: ProfileFormProps) {
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
    avatar_url: user.avatar_url || "",
  });

  useEffect(() => {
    console.log("User data in ProfileForm:", user);
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      avatar_url: user.avatar_url || "",
    });
    setImageError(false); // Reset image error when user changes
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      avatar_url: user.avatar_url || "",
    });
    setIsEditing(false);
  };

  return (
    <div className={styles.profileFormWrapper}>
      <Card>
        <CardHeader>
          <div className={styles.cardHeaderContent}>
            <div>
              <CardTitle>Ảnh đại diện</CardTitle>
              <CardDescription>
                {isEditing ? "Cập nhật ảnh đại diện của bạn" : "Thông tin ảnh đại diện"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarContainer}>
                {(isEditing ? formData.avatar_url : user.avatar_url) && !imageError ? (
                  <Image
                    src={isEditing ? formData.avatar_url : user.avatar_url || ""}
                    alt={user.name}
                    width={96}
                    height={96}
                    className={styles.avatarImage}
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <UserIcon className={styles.avatarPlaceholderIcon} />
                )}
              </div>
            </div>
            <div className={styles.avatarInputArea}>
              {isEditing ? (
                <>
                  <Label htmlFor="avatar_url">URL ảnh đại diện</Label>
                  <Input
                    id="avatar_url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className={styles.avatarInput}
                  />
                  <p className={styles.avatarInputHint}>
                    Nhập URL ảnh đại diện
                  </p>
                </>
              ) : (
                <div className={styles.avatarDisplayInfo}>
                  <p className={styles.avatarInfoLabel}>URL ảnh</p>
                  <p className={styles.avatarInfoValue}>
                    {user.avatar_url || "Chưa có ảnh đại diện"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className={styles.cardHeaderContent}>
            <div>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                {isEditing ? "Chỉnh sửa thông tin cá nhân của bạn" : "Chi tiết thông tin cá nhân"}
              </CardDescription>
            </div>
            {!isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className={styles.editIcon} />
                Chỉnh sửa
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <Label htmlFor="name" className={styles.labelWithIcon}>
                  <UserIcon className={styles.labelIcon} />
                  Họ và tên
                </Label>
                {isEditing ? (
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên"
                    required
                  />
                ) : (
                  <p className={styles.readOnlyInput}>
                    {user.name || "Chưa cập nhật"}
                  </p>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="email" className={styles.labelWithIcon}>
                  <Mail className={styles.labelIcon} />
                  Email
                </Label>
                <p className={styles.readOnlyEmail}>
                  {user.email}
                </p>
                {!isEditing && (
                  <p className={styles.emailHint}>
                    Email không thể thay đổi
                  </p>
                )}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="phone" className={styles.labelWithIcon}>
                  <Phone className={styles.labelIcon} />
                  Số điện thoại
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0123456789"
                  />
                ) : (
                  <p className={styles.readOnlyInput}>
                    {user.phone || "Chưa cập nhật"}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className={styles.addressSection}>
              <h3 className={styles.addressTitle}>
                <MapPin className={styles.addressIcon} />
                Thông tin địa chỉ
              </h3>
              
              <div className={styles.formGroup}>
                <Label htmlFor="address">Địa chỉ chi tiết</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                    rows={3}
                    className={styles.addressTextarea}
                  />
                ) : (
                  <p className={styles.readOnlyAddress}>
                    {user.address || "Chưa cập nhật"}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <>
                <Separator />
                <div className={styles.actionButtons}>
                  <Button type="submit" disabled={isPending} className={styles.actionButton}>
                    {isPending && <Loader2 className={styles.spinner} />}
                    Lưu thông tin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isPending}
                    className={styles.actionButton}
                  >
                    <X className={styles.buttonIcon} />
                    Hủy
                  </Button>
                </div>
              </>
            )}
          </form>
          
          {!isEditing && (
            <>
              <Separator className={styles.separator} />
              <div className={styles.actionButtons}>
                {onOpenPasswordDialog && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onOpenPasswordDialog}
                    className={styles.changePasswordButton}
                  >
                    <Lock className={styles.buttonIcon} />
                    Đổi mật khẩu
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
