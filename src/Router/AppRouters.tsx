import  { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationLayout from "../pages/ApplicationLayout";
import LoginPage from "../pages/Auth/Login";
import SignUpPage from "../pages/Auth/Signup";

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Suspense >
        <Routes>
          {/* Redirect base dashboard path */}
          <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
          
          {/* Main layout route */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard/*" element={<ApplicationLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouters;
