import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CustomSidebarMenuItem } from "@/components/CustomeSidebarMenuItem.tsx";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
const items2 = [
  {
    avatar: "https://via.placeholder.com/150", // Đường dẫn ảnh đại diện
    name: "KaiCenat",
    category: "Just Chatting",
    viewers: "86.6K",
  },
  {
    avatar: "https://via.placeholder.com/150",
    name: "Streamer2",
    category: "Gaming",
    viewers: "22.1K",
  },
  {
    avatar: "https://via.placeholder.com/150",
    name: "Streamer3",
    category: "Gaming",
    viewers: "22.1K",
  },
  {
    avatar: "https://via.placeholder.com/150",
    name: "Streamer4",
    category: "Gaming",
    viewers: "22.1K",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className={"top-[82px]"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item, index) => (
                <CustomSidebarMenuItem
                  key={index}
                  avatar={item.avatar}
                  name={item.name}
                  category={item.category}
                  viewers={item.viewers}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
