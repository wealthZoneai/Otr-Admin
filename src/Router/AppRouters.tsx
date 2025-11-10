import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationLayout from "../pages/ApplicationLayout";
import LoginPage from "../pages/Auth/Login";
import SignUpPage from "../pages/Auth/Signup";

const AppRouters = () => {

  

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard/*"
            element={
              // <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ApplicationLayout />
              // </ProtectedRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouters;
