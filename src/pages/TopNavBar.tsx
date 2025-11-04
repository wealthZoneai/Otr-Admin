// src/components/TopNavBar.tsx
import React, { useState } from "react";
import {
  Search,
  Bell,
  Home,
  Calendar,
  Activity,
  Mail,
  Settings,
  Menu,
  X,
} from "lucide-react";

interface QuickLink {
  name: string;
  icon: React.ElementType;
  path: string;
}

const quickLinks: QuickLink[] = [
  { name: "Home", icon: Home, path: "/dashboard/home" },
  { name: "Calendar", icon: Calendar, path: "/dashboard/calendar" },
  { name: "Activity", icon: Activity, path: "/dashboard/activity" },
  { name: "Messages", icon: Mail, path: "/dashboard/messages" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const TopNavBar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Searching for:", e.target.value);
  };

  const handleNotificationsClick = () => {
    alert("Showing notifications popover.");
  };

  return (
    <>
      {/* --- Desktop Navbar --- */}
      <div className="hidden md:flex justify-between items-center h-20 px-6 py-3 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        {/* Left Block - Quick Links */}
        <nav className="flex items-center space-x-4 bg-[#053757] p-3 rounded-full text-white shadow-lg">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const isHome = link.name === "Home";
            return (
              <a
                key={link.name}
                href={link.path}
                className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  isHome
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4 mr-1" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Block - Search + Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md">
            <div className="flex items-center bg-white py-2 pl-4 pr-3">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search here..."
                onChange={handleSearch}
                className="bg-white text-sm focus:outline-none w-48 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Notification */}
          <button
            onClick={handleNotificationsClick}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div
            className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
            title="User Profile"
          >
            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-700">
              U
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Navbar --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#053757] text-white flex justify-between items-center px-4 py-3 shadow-md z-50">
        {/* Logo / Title */}
        <div className="font-bold text-lg">LOGO</div>

        {/* Right icons */}
        <div className="flex items-center space-x-3">
          <button onClick={handleNotificationsClick}>
            <Bell className="w-5 h-5" />
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[56px] left-0 right-0 bg-white shadow-lg z-40 flex flex-col items-start py-3 space-y-3 border-t border-gray-200 animate-slide-down">
          {/* Search */}
          <div className="flex items-center border border-gray-300 rounded-full mx-4 px-3 py-2 w-[90%]">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              className="bg-transparent text-sm text-gray-700 focus:outline-none w-full"
            />
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 px-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className="flex items-center gap-1 bg-[#053757] text-white px-3 py-2 rounded-full text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavBar;
