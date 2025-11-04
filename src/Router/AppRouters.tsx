import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationLayout from "../pages/ApplicationLayout";

const AppRouters = () => {
  return (
    <BrowserRouter>
      <Suspense >
        <Routes>
          {/* Redirect base dashboard path */}
          {/* <Route path="/" element={<Navigate to="/dashboard/home" replace />} /> */}
          
          {/* Main layout route */}
          <Route path="/dashboard/*" element={<ApplicationLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouters;
