import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
