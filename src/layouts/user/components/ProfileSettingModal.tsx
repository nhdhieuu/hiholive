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
import { useEffect, useState } from "react";
import { uploadImg } from "../api/uploadImgApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserProfile } from "@/stores/useUserProfile.ts";
import { Switch } from "@/components/ui/switch";
import { UserUpdate } from "@/types/user.ts";
import { toast } from "react-toastify";
import { updateProfile } from "@/layouts/user/api/updateProfile.ts";

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
  const [isUsernameEditable, setIsUsernameEditable] = useState(false);
  const [isDisplayNameEditable, setIsDisplayNameEditable] = useState(false);
  const [userUpdate, setUserUpdate] = useState<UserUpdate>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImg(file);
        if (response) {
          setAvatar(response.data.url);
          setUserUpdate({ ...userUpdate, avatar: response.data });
          toast.success("Cập nhật ảnh đại diện thành công!", {
            position: "top-right",
            autoClose: 3000, // Tự động đóng sau 3 giây
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Cập nhật ảnh đại diện thất bại!", {
          position: "top-right",
          autoClose: 3000, // Tự động đóng sau 3 giây
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  const handleClick = async () => {
    try {
      const response = await updateProfile(
        userProfile?.id || "",
        userUpdate || {},
      );
      if (response) {
        toast.success("Cập nhật thông tin thành công!", {
          position: "top-right",
          autoClose: 3000, // Tự động đóng sau 3 giây
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Update profile failed:", error);
      toast.error("Cập nhật thông tin thất bại!", {
        position: "top-right",
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  useEffect(() => {
    if (!isOpen) {
      // Reset userUpdate khi modal đóng
      setUserUpdate(undefined);
      setAvatar("/placeholder.svg");
      setIsUsernameEditable(false);
      setIsDisplayNameEditable(false);
    }
  }, [isOpen]);
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
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="username-toggle"
                    checked={isUsernameEditable}
                    onCheckedChange={setIsUsernameEditable}
                  />
                  <Label htmlFor="username-toggle">Chỉnh sửa</Label>
                </div>
              </div>
              <Input
                id="username"
                defaultValue={userProfile?.user_name}
                disabled={!isUsernameEditable}
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="displayName" className="text-right">
                  Display name
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="displayName-toggle"
                    checked={isDisplayNameEditable}
                    onCheckedChange={setIsDisplayNameEditable}
                  />
                  <Label htmlFor="displayName-toggle">Chỉnh sửa</Label>
                </div>
              </div>
              <Input
                id="displayName"
                defaultValue={userProfile?.display_name}
                disabled={!isDisplayNameEditable}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Họ</Label>
                <Input
                  id="firstName"
                  defaultValue={userProfile?.first_name}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, first_name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input
                  id="lastName"
                  defaultValue={userProfile?.last_name}
                  onChange={(e) =>
                    setUserUpdate({ ...userUpdate, last_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Số điện thoại</Label>
              <Input
                id="phoneNumber"
                type="tel"
                defaultValue={userProfile?.phone_number}
                onChange={(e) => {
                  setUserUpdate({
                    ...userUpdate,
                    phone_number: e.target.value,
                  });
                }}
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
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    date_of_birth: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Giới tính</Label>
              <Select
                onValueChange={(value) =>
                  setUserUpdate({ ...userUpdate, gender: value })
                }
              >
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
            <Button onClick={handleClick} type="submit">
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
