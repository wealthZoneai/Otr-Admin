// src/components/Sidebar.tsx
import React from "react";
// We use 'useLocation' to manage the active state without relying on 'onClick' props
import { NavLink, useLocation } from "react-router-dom"; 
import {
    LayoutDashboard,
    FileText,
    IdCard,
    Headset, // Using Headset for Help & Support (LifeBuoy is too complex for this style)
    Settings,
} from "lucide-react";

// --- Type Definitions ---
interface MenuItem {
    name: string;
    icon: React.ElementType; 
    path: string; 
}

// --- Menu Data Structure ---
// NOTE: I'm mapping the names from your image/input to the paths used in your router logic.
const menuItems: MenuItem[] = [
    // Matches the visual layout and paths (assuming /dashboard is the base)
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/home" },
    { name: "Job Notifications", icon: FileText, path: "/dashboard/notifications" },
    { name: "Admit Card", icon: IdCard, path: "/dashboard/admit-card" },
    { name: "Help & Support", icon: Headset, path: "/dashboard/help" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];


const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <div className="h-screen w-[100px] bg-[#053757] flex flex-col items-center py-6 text-white shadow-2xl rounded-tr-xl rounded-br-xl">
            
            {/* Logo */}
            <div className="mb-10 text-xl font-extrabold tracking-wider">LOGO</div>

            {/* Menu */}
            <nav className="flex flex-col gap-6 w-full px-2">
                {menuItems.map((item) => {
                    // Check if the current route path starts with the item's path (for parent/child highlighting)
                    const isActive = location.pathname.startsWith(item.path);
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={`flex flex-col items-center text-xs font-medium w-full p-2.5 rounded-xl transition-all duration-300 transform 
                                ${isActive
                                    ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg"
                                    : "text-gray-200 hover:text-white hover:bg-white/10"
                                }`
                            }
                        >
                            {/* Icon */}
                            <Icon size={24} className="mb-1" />
                            {/* Label */}
                            <span className="text-center">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;