import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationLayout from "../pages/ApplicationLayout";

const AppRouters = () => {
    const isAuthenticated = false;

 

    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route
                        path="/dashboard/*"
                        element={
                            <ApplicationLayout />
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default AppRouters;
