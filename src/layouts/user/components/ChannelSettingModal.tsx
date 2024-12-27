"use client";

import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea.tsx";

interface ChannelSettingModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
}

export function ChannelSettingModal({
  open,
  onOpenChange,
}: ChannelSettingModalProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.svg");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thông tin kênh</DialogTitle>
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
                onClick={() =>
                  setAvatar(prompt("Nhập URL ảnh hồ sơ mới:") || avatar)
                }
              >
                Thêm ảnh hồ sơ
              </Button>
              <p className="text-xs text-muted-foreground">
                Phải là ảnh định dạng JPEG, PNG hoặc GIF và không lớn hơn 10MB.
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Tên người dùng</Label>
            <Input id="username" defaultValue="nhdhieuu" disabled={true} />
            <p className="text-xs text-muted-foreground">
              Bạn có thể cập nhật tên người dùng của mình
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="displayName">Tên hiển thị</Label>
            <Input id="displayName" defaultValue="nhdhieuu" />
            <p className="text-xs text-muted-foreground">
              Tùy chỉnh viết hoa tên người dùng của bạn
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea id="bio" className="resize-none" maxLength={300} />
            <p className="text-xs text-muted-foreground">
              Phần mô tả cho bảng Giới thiệu trên trang kênh của bạn, không dài
              quá 300 ký tự
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Lưu thay đổi</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
