import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./home"; 
import TopNavBar from "./TopNavBar";
import JobNotification from "./JobNotifications/JobNotifications";
import AdmitCard from "./AdmitCard/AdmitCard";
import AdminHelpAndSupport from "./HelpAndsupport";
import AdminSettings from "./Settings";
import AdminExam from "./Exam";



// const AdmitCard = () => <div className="p-8 text-xl">Admit Card Page</div>;

// const Settings = () => <div className="p-8 text-xl">Settings Page</div>;

const ApplicationLayout: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            
            {/* 1. Sidebar (Fixed on the left) */}
            <Sidebar />
            
            <div className="flex-1 bg-gray-50 overflow-y-auto"> 
                
                <header className="sticky top-0 z-10">
                    <TopNavBar />
                </header>

                <main className="p-6">
                    <Routes>
                        <Route path="home" element={<Home />} />
                        <Route path="notifications" element={<JobNotification/>} />
                        <Route path="admit-card" element={<AdmitCard />} />
                        <Route path="help" element={<AdminHelpAndSupport />} />
                        <Route path="settings" element={<AdminSettings />} />
                     <Route path="Exam" element={<AdminExam />} />
             

                        {/* Add all other routes here */}
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default ApplicationLayout;