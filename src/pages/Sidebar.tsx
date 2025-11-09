// src/components/Sidebar.tsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  IdCard,
  Headset,
  Settings,
  ScrollText ,
} from "lucide-react";

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard/home" },
  { name: "Job Notifications", icon: FileText, path: "/dashboard/notifications" },
  { name: "Admit Card", icon: IdCard, path: "/dashboard/admit-card" },
   { name: "Exam", icon: ScrollText , path: "/dashboard/Exam" },
  { name: "Help & Support", icon: Headset, path: "/dashboard/help" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },

];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <div className="hidden md:flex h-screen w-[100px] bg-[#053757] flex-col items-center py-6 text-white shadow-2xl rounded-tr-xl rounded-br-xl">
        {/* Logo */}
        <div className="mb-10 text-xl font-extrabold tracking-wider">LOGO</div>

        {/* Menu */}
        <nav className="flex flex-col gap-6 w-full px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center text-xs font-medium w-full p-2.5 rounded-xl transition-all duration-300 transform 
                  ${
                    isActive
                      ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg"
                      : "text-gray-200 hover:text-white hover:bg-white/10"
                  }`}
              >
                <Icon size={24} className="mb-1" />
                <span className="text-center">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* --- Mobile Bottom Navbar --- */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#053757] text-white flex justify-around items-center py-2 shadow-2xl md:hidden">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center text-xs transition-all duration-300 ${
                isActive
                  ? "text-cyan-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] mt-0.5">{item.name.split(" ")[0]}</span>
            </NavLink>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
