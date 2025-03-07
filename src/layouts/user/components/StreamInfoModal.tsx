import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { toast } from "react-toastify";

interface StreamInfoModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  streamKey: string;
  rtmpLink: string;
}

export function StreamInfoModal({
  open,
  onOpenChange,
  streamKey,
  rtmpLink,
}: StreamInfoModalProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copy thành công!", {
        position: "top-right",
        autoClose: 3000, // Tự động đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Thông tin Stream </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="streamKey">Stream Key</Label>
            <div className="relative flex items-center">
              <Input
                id="streamKey"
                value={streamKey}
                readOnly
                className="pr-16"
              />
              <Button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => handleCopy(streamKey)}
              >
                Copy
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="rtmpLink">RTMP Link</Label>
            <div className="relative flex items-center">
              <Input
                id="rtmpLink"
                value={rtmpLink}
                readOnly
                className="pr-16"
              />
              <Button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => handleCopy(rtmpLink)}
              >
                Copy
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Trở về
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
