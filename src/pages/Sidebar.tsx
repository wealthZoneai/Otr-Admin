import React, { useState } from "react";
import { LayoutDashboard, FileText, IdCard, HelpCircle, Settings } from "lucide-react";

const Sidebar: React.FC = () => {
  const [active, setActive] = useState("Job Notifications");

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={22} /> },
    { name: "Job Notifications", icon: <FileText size={22} /> },
    { name: "Admit Card", icon: <IdCard size={22} /> },
    { name: "Help & Support", icon: <HelpCircle size={22} /> },
    { name: "Settings", icon: <Settings size={22} /> },
  ];

  return (
    <div className="h-screen w-[90px] bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center py-6 text-white">
      {/* Logo */}
      <div className="mb-8 text-lg font-bold tracking-wide">LOGO</div>

      {/* Menu */}
      <nav className="flex flex-col gap-5">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`flex flex-col items-center text-xs font-medium px-3 py-2 rounded-xl transition-all duration-300 ${
              active === item.name
                ? "bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md"
                : "text-gray-200 hover:text-white hover:bg-blue-800"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
