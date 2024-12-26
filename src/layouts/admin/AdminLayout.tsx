import { Fragment } from "react";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/layouts/admin/component/AdminSidebar.tsx";
import { AdminTopBar } from "@/layouts/admin/component/AdminTopBar.tsx";

export default function AdminLayout() {
  return (
    <Fragment>
      <main className={`min-h-screen flex flex-col`}>
        <AdminTopBar />
        <SidebarProvider
          className={" max-w-screen min-h-[calc(100vh_-_82px)] "}
        >
          <AdminSidebar></AdminSidebar>
          <div className={"flex-grow overflow-hidden"}>{<Outlet />}</div>
        </SidebarProvider>
      </main>
    </Fragment>
  );
}
