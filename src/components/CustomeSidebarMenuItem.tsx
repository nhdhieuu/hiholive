import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx"; // Hợp nhất classNames nếu cần

interface SidebarMenuItemProps {
  avatar: string; // Link ảnh đại diện
  name: string; // Tên hiển thị
  category: string; // Mô tả (e.g., Just Chatting)
  viewers: string; // Số người xem (e.g., 86.6K)
  active?: boolean; // Trạng thái active
  className?: string; // Class bổ sung
}

export function CustomSidebarMenuItem({
  name,
  category,
  viewers,
  active,
  className,
}: SidebarMenuItemProps) {
  return (
    <div
      className={cn(
        "flex items-center space-x-3 p-2 rounded-md transition-all",
        active ? "bg-accent text-accent-foreground" : "hover:bg-accent",
        className,
      )}
    >
      {/* Avatar */}
      <Avatar className={"cursor-pointer"}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {/* Text Content */}
      <div className="flex flex-col">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-xs text-muted-foreground">{category}</span>
      </div>

      {/* Viewers */}
      <div className="flex items-center space-x-1 ml-auto">
        <span className="w-2 h-2 rounded-full bg-red-500"></span>
        <span className="text-xs">{viewers}</span>
      </div>
    </div>
  );
}
