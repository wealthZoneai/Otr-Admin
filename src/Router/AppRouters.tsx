import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./isAuthenticated";


// const Login = React.lazy(() => import("../pages/Auth/Signin/Login"));
// const Signup = React.lazy(() => import("../pages/Auth/Signup/Signup"));
// const DashboardLayout = React.lazy(() => import("../pages/DashboardLayout/DashboardLayout"));

const AppRouters = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {/* <Route
            path="/"
            element={
             <Login />
            }
          /> */}
      

          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouters;
