import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useUserProfile } from "@/stores/useUserProfile.ts";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { userProfile } = useUserProfile();

  if (userProfile?.SystemRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
