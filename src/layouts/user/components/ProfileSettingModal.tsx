"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { uploadImg } from "../api/uploadImgApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserProfile } from "@/stores/useUserProfile.ts";

interface ProfileSettingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSettingModal({
  isOpen,
  onOpenChange,
}: ProfileSettingModalProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.svg");
  const { userProfile } = useUserProfile();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImg(file);
        setAvatar(response.data.url);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="px-6 py-6">
          <DialogHeader>
            <DialogTitle>Thông tin tài khoản</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-2"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Thêm ảnh hồ sơ
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground">
                  Phải là ảnh định dạng JPEG, PNG hoặc GIF và không lớn hơn
                  10MB.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Họ</Label>
                <Input id="firstName" defaultValue={userProfile?.first_name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input id="lastName" defaultValue={userProfile?.last_name} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                type="tel"
                defaultValue={userProfile?.phone_number}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Địa chỉ</Label>
              <Input id="address" defaultValue={userProfile?.address} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dateOfBirth">Ngày sinh</Label>
              <Input
                id="dateOfBirth"
                type="date"
                defaultValue={userProfile?.date_of_birth}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Lưu thay đổi</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
