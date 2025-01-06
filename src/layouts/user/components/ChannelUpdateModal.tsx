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
import { getChannel, updateChannel } from "../api/updateChannel";
import { Channel, UpdateChannel } from "@/types/channel.ts";

interface ChannelUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChannelUpdateModal({
  open,
  onOpenChange,
}: ChannelUpdateModalProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.svg");
  const { userProfile } = useUserProfile();
  const [updateChannelRequest, setUpdateChannelRequest] = useState<Channel>();
  const [updateChannelBody, setUpdateChannelBody] = useState<UpdateChannel>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await uploadImg(file);
        if (response) {
          setAvatar(response.data.url);
          setUpdateChannelBody((prevState) => ({
            ...prevState,
            panel: response.data,
          }));
          toast.success("Cập nhật ảnh bìa thành công!", {
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
        toast.error("Cập nhật ảnh bìa thất bại!", {
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
      const response = await updateChannel(
        updateChannelRequest?.id || "",
        updateChannelBody || {},
      );
      console.log("Update channel response:", response);
      toast.success("Cập nhật thông tin thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      onOpenChange(false);
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
  const fetchChannelData = async () => {
    try {
      const response = await getChannel(userProfile?.user_name || "");
      if (response) {
        setAvatar(response.data.panel?.url || "/placeholder.svg");
        setUpdateChannelRequest(response.data);
      }
    } catch (error) {
      console.error("Fetch channel data failed:", error);
    }
  };

  useEffect(() => {
    fetchChannelData();

    if (!open) {
      // Reset userUpdate khi modal đóng

      setAvatar("/placeholder.svg");
    }
  }, [open]);
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
              defaultValue={updateChannelRequest?.description}
              className="resize-none"
              maxLength={300}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdateChannelBody((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
              }}
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
              defaultValue={updateChannelRequest?.contact}
              placeholder="Nhập thông tin liên hệ"
              onChange={(e) => {
                console.log(e.target.value);
                setUpdateChannelBody((prevState) => ({
                  ...prevState,
                  contact: e.target.value,
                }));
              }}
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
