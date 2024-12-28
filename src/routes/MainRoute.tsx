import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/layouts/user/RootLayout.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";
import { SignUpPage } from "@/pages/signup/SignUpPage.tsx";
import StreamingPage from "@/pages/streaming/StreamingPage.tsx";
import SearchPage from "@/pages/search/SearchPage.tsx";
import ChannelPage from "@/pages/channel/ChannelPage.tsx";
import AdminLayout from "@/layouts/admin/AdminLayout.tsx";
import { AdminSettingPage } from "@/pages/admin/setting/AdminSettingPage.tsx";
import { AdminUserPage } from "@/pages/admin/user/AdminUserPage.tsx";

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/streaming/:id" element={<StreamingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/channel" element={<ChannelPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* This is the root of the admin path */}
          <Route index element={<div>Welcome to Admin Panel</div>} />

          {/* Admin Sidebar with different routes */}
          <Route path="users" element={<AdminUserPage />} />
          <Route path="categories" element={<div>Categories Page</div>} />
          <Route path="settings" element={<AdminSettingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
