"use client";

import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { DatePickerComponent } from "@/components/DatePickerComponent.tsx";
import {
  createStream,
  CreateStreamRequest,
} from "@/layouts/user/api/createStream.ts";
import { StreamInfoModal } from "@/layouts/user/components/StreamInfoModal.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Category } from "@/types/category.ts";
import { getCategory } from "@/pages/home/api/homeApi.ts";
import { cn } from "@/lib/utils.ts";

interface StreamDialogProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (isOpen: boolean) => void;
}

export function StreamDialog({ isOpen, onOpenChange }: StreamDialogProps) {
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState("nhdhieuu went live!");
  const [description, setDescription] = useState("");
  const [isRerun, setIsRerun] = useState<boolean>(false);
  const [streamKey, setStreamKey] = useState<string>("");
  const [rtmpLink, setRtmpLink] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [categories, setCategories] = useState<Category[]>([]);

  const [showStreamInfoModal, setShowStreamInfoModal] =
    useState<boolean>(false);

  async function onSubmitCreateStream() {
    try {
      const payload: CreateStreamRequest = {
        title: title,
        description: description,
        notification: notification,
        categoryId: selectedCategory?.id || "",
        scheduledStartTime: new Date(), // Thay đổi điều này theo DatePickerComponent
        isRerun: isRerun,
      };

      const response = await createStream(payload);
      console.log(response.data);

      // Set streamKey and rtmpLink from the response
      setStreamKey(response.data.streamKey);
      setRtmpLink(response.data.rtmpLink);

      // Show the Stream Info Modal
      setShowStreamInfoModal(true);
    } catch (e) {
      console.error(e);
    }
  }

  const fetchCategories = async () => {
    try {
      // Fetch categories
      const response = await getCategory();
      console.log("categories Data:", response.data);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Tiêu đề</Label>
              <div className="relative">
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={140}
                  className="pr-16"
                  placeholder="123"
                />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                  {title.length}/140
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <div className="relative">
                <Input
                  id="title"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={140}
                  className="pr-16"
                  placeholder="123"
                />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                  {title.length}/140
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Danh mục</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                  >
                    {selectedCategory
                      ? selectedCategory.name
                      : "Chọn danh mục..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.id}
                            onSelect={() => {
                              setSelectedCategory(category);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedCategory?.id === category.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notification">Thông báo</Label>
              <div className="relative">
                <Input
                  id="notification"
                  value={notification}
                  onChange={(e) => setNotification(e.target.value)}
                  maxLength={140}
                  className="pr-16"
                />
                <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                  {notification.length}/140
                </span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Lên lịch</Label>
              <div className="relative">
                <DatePickerComponent />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="rerun"
                checked={isRerun}
                onCheckedChange={(checked) => setIsRerun(checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none item-center">
                <label
                  htmlFor="rerun"
                  className="text-sm font-medium leading-none"
                >
                  Phát lại
                </label>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                console.log(open);
                onOpenChange(false);
                console.log(open);
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              onClick={onSubmitCreateStream}
              className="bg-[#9333EA] hover:bg-[#7E22CE]"
            >
              Hoàn tất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <StreamInfoModal
        open={showStreamInfoModal}
        onOpenChange={setShowStreamInfoModal}
        streamKey={streamKey}
        rtmpLink={rtmpLink}
      />
    </div>
  );
}
