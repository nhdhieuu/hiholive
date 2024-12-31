"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { uploadImg } from "../api/uploadImgApi";
import { toast } from "react-toastify";
import { useUserProfile } from "@/stores/useUserProfile.ts";
import { createChannelApi } from "@/layouts/user/api/createChannelApi.ts";
import { CreateChannel } from "@/types/channel.ts";

interface ChannelSettingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChannelSettingModal({
  open,
  onOpenChange,
}: ChannelSettingModalProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.svg");
  const { userProfile, setUserProfile } = useUserProfile();

  const [createChannel, setCreateChannel] = useState<CreateChannel>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    userName: userProfile?.user_name,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    displayName: userProfile?.display_name,
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImg(file);
        if (response) {
          setAvatar(response.data.url);
          setCreateChannel({ ...createChannel, pannel: response.data });
          toast.success("Cập nhật ảnh đại diện thành công!", {
            position: "top-right",
            autoClose: 3000,
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
          autoClose: 3000,
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
      const response = await createChannelApi(createChannel || {});
      if (response) {
        setUserProfile({
          ...userProfile,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          bio: createChannel.description,
          SystemRole: "streamer",
        });
        toast.success("Cập nhật thông tin thành công!", {
          position: "top-right",
          autoClose: 3000,
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  useEffect(() => {
    if (!open) {
      // Reset userUpdate khi modal đóng
      setCreateChannel({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        userName: userProfile?.user_name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        displayName: userProfile?.display_name,
      });
      setAvatar("/placeholder.svg");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tạo kênh</DialogTitle>
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
                Thêm ảnh bìa
              </Button>
              <input
                id="fileInput"
                type="file"
                accept="image/jpeg,image/png,image/gif"
                className="hidden"
                onChange={handleFileChange}
              />
              <p className="text-xs text-muted-foreground">
                Phải là ảnh định dạng JPEG, PNG hoặc GIF và không lớn hơn 10MB.
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="bio">Giới thiệu bản thân</Label>
            <Textarea
              id="bio"
              className="resize-none"
              maxLength={300}
              onChange={(e) =>
                setCreateChannel({
                  ...createChannel,
                  description: e.target.value,
                })
              }
            />
            <p className="text-xs text-muted-foreground">
              Phần mô tả cho bảng Giới thiệu trên trang kênh của bạn, không dài
              quá 300 ký tự
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">Liên hệ</Label>
            <Input
              id="contact"
              type="text"
              placeholder="Nhập thông tin liên hệ"
              onChange={(e) =>
                setCreateChannel({
                  ...createChannel,
                  contact: e.target.value,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              onChange={(e) =>
                setCreateChannel({
                  ...createChannel,
                  url: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} type="submit">
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
