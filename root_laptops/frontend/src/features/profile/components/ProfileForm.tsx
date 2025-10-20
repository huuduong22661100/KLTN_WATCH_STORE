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
    <div className="space-y-6">
      {}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Ảnh đại diện</CardTitle>
              <CardDescription>
                {isEditing ? "Cập nhật ảnh đại diện của bạn" : "Thông tin ảnh đại diện"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-border">
                {(isEditing ? formData.avatar_url : user.avatar_url) && !imageError ? (
                  <Image
                    src={isEditing ? formData.avatar_url : user.avatar_url || ""}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="object-cover"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
            </div>
            <div className="flex-1">
              {isEditing ? (
                <>
                  <Label htmlFor="avatar_url">URL ảnh đại diện</Label>
                  <Input
                    id="avatar_url"
                    name="avatar_url"
                    value={formData.avatar_url}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="mt-2"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Nhập URL ảnh đại diện
                  </p>
                </>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium">URL ảnh</p>
                  <p className="text-sm text-muted-foreground break-all">
                    {user.avatar_url || "Chưa có ảnh đại diện"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
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
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
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
                  <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                    {user.name || "Chưa cập nhật"}
                  </p>
                )}
              </div>

              {}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md text-muted-foreground">
                  {user.email}
                </p>
                {!isEditing && (
                  <p className="text-xs text-muted-foreground">
                    Email không thể thay đổi
                  </p>
                )}
              </div>

              {}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
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
                  <p className="text-sm font-medium py-2 px-3 bg-muted rounded-md">
                    {user.phone || "Chưa cập nhật"}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Thông tin địa chỉ
              </h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ chi tiết</Label>
                {isEditing ? (
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                    rows={3}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md min-h-[80px]">
                    {user.address || "Chưa cập nhật"}
                  </p>
                )}
              </div>
            </div>

            {isEditing && (
              <>
                <Separator />
                <div className="flex gap-3">
                  <Button type="submit" disabled={isPending} className="flex-1">
                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Lưu thông tin
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isPending}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Hủy
                  </Button>
                </div>
              </>
            )}
          </form>
          
          {!isEditing && (
            <>
              <Separator className="my-6" />
              <div className="flex gap-3">
                {onOpenPasswordDialog && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onOpenPasswordDialog}
                    className="w-full"
                  >
                    <Lock className="w-4 h-4 mr-2" />
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
