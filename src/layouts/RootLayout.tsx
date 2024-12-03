import { Toaster } from "@/components/ui/sonner.tsx";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "@/layouts/components/TopBar.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/AppSideBar.tsx";

export default function RootLayout() {
  return (
    <Fragment>
      <main className={`min-h-screen flex flex-col`}>
        <TopBar />
        <SidebarProvider className={"min-h-[calc(100vh_-_82px)] "}>
          <AppSidebar />
          <SidebarTrigger />
          {<Outlet />}
        </SidebarProvider>
      </main>
      <Toaster
        position="top-right"
        expand={false}
        richColors={true}
        duration={3000}
        closeButton
        offset="30px"
      />
    </Fragment>
  );
}
