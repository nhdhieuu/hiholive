import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "@/layouts/user/components/TopBar.tsx";

export default function RootLayout() {
  return (
    <Fragment>
      <main className={`min-h-screen flex flex-col`}>
        <TopBar />
        {/*<SidebarProvider
          className={" max-w-screen min-h-[calc(100vh_-_82px)] "}
        >
          <AppSidebar />
          <div className={"flex-grow overflow-hidden"}>{<Outlet />}</div>
        </SidebarProvider>*/}
        <Outlet />
      </main>
    </Fragment>
  );
}
