import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CustomSidebarMenuItem } from "@/components/CustomeSidebarMenuItem.tsx";

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
    <Sidebar collapsible={"icon"} className={"top-[82px]"}>
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
      <SidebarFooter className={"flex items-end"}>
        <SidebarTrigger></SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  );
}
