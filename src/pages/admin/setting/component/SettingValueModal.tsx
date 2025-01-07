import { Setting } from "@/types/setting.ts";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useEffect, useState } from "react";
import { updateAdminSetting } from "@/pages/admin/setting/api/adminSettingApi.ts";
import { toast } from "react-toastify";

interface SettingValueModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  setting?: Setting;
  refreshData: () => void;
}

export const SettingValueModal = ({
  isOpen,
  onClose,
  setting,
  refreshData,
}: SettingValueModalProps) => {
  const [updateValue, setUpdateValue] = useState<string>("");

  const handleClick = async () => {
    console.log("click");
    try {
      const response = await updateAdminSetting(
        setting?.name || "",
        JSON.parse(updateValue),
      );
      console.log("response: ", response);
      toast.success("Cập nhật thành công!");
      onClose(false);
      refreshData();
    } catch (e) {
      console.error("Failed to update setting: ", e);
      toast.error("Cập nhật thất bại!");
    }
  };
  useEffect(() => {
    if (setting) {
      setUpdateValue(JSON.stringify(setting.value, null, 2));
    }
  }, [setting, isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="bio">value</Label>
            <Textarea
              className={"h-[500px]"}
              value={updateValue}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdateValue(e.target.value);
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
};
