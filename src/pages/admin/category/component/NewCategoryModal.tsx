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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { uploadImg } from "@/layouts/user/api/uploadImgApi";
import { CreateCategory } from "@/types/category.ts";
import { createCategory } from "../api/adminCategoryApi";

interface NewCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refreshData: () => void;
}

export function NewCategoryModal({
  open,
  onOpenChange,
  refreshData,
}: NewCategoryModalProps) {
  const [avatar, setAvatar] = useState<string>("/placeholder.svg");
  const [createCategoryData, setCreateCategoryData] = useState<CreateCategory>({
    name: "",
    description: "",
    image: undefined,
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
          setCreateCategoryData((prevState) => ({
            ...prevState,
            image: response.data,
          }));
          toast.success("Cập nhật ảnh thành công!", {
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
        toast.error("Cập nhật ảnh thất bại!", {
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
      const response = await createCategory(createCategoryData);
      console.log(response.data);
      toast.success("Cập nhật thông tin thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      refreshData();
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Danh mục mới</DialogTitle>
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
                Thêm ảnh
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
            <Label htmlFor="bio">Tên</Label>
            <Input
              id="name"
              onChange={(e) => {
                console.log(e.target.value);
                setCreateCategoryData((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contact">Mô tả</Label>
            <Input
              id="description"
              type="text"
              placeholder="Nhập mô tả"
              onChange={(e) => {
                console.log(e.target.value);
                setCreateCategoryData((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} type="submit">
            Hoàn tất
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
