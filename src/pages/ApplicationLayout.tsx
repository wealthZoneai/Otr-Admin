import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./home";

const ApplicationLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 overflow-auto">
        <Routes>
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default ApplicationLayout;
