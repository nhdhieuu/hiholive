import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout.tsx";
import LoginPage from "@/pages/login/LoginPage.tsx";
import HomePage from "@/pages/home/HomePage.tsx";
import { SignUpPage } from "@/pages/signup/SignUpPage.tsx";
import StreamingPage from "@/pages/streaming/StreamingPage.tsx";

export const MainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/streaming" element={<StreamingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
