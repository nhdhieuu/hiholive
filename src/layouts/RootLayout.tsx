import { Toaster } from "@/components/ui/sonner.tsx";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "@/layouts/components/TopBar.tsx";

export default function RootLayout() {
    return (
        <Fragment>
            <main className={`min-h-screen flex flex-col`}>
                <TopBar />
                <div className="grow bg-background min-w-screen">
                    <Outlet />
                </div>
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
