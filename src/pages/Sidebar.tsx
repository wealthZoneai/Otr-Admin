// src/components/Sidebar.tsx
import React, { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  Settings,
  LifeBuoy,
  Users,
  CreditCard,
  Lock,
  Truck,
  MapPin,
  Package,
  Clock,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  children?: MenuItem[];
}

const navItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications" },
  {
    id: "fleet",
    label: "Fleet Management",
    icon: Truck,
    path: "/fleet",
    children: [
      { id: "fleet-overview", label: "Rider Overview", icon: Users, path: "/fleet/overview" },
      { id: "fleet-batch", label: "Batch Management", icon: Package, path: "/fleet/batch" },
      { id: "fleet-slots", label: "Delivery Slots", icon: Clock, path: "/fleet/slots" },
      { id: "fleet-tracking", label: "Live Tracking", icon: MapPin, path: "/fleet/tracking" },
    ],
  },
  { id: "help", label: "Help & Support", icon: LifeBuoy, path: "/help" },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings",
    children: [
      { id: "set-user", label: "User Management", icon: Users, path: "/settings/users" },
      { id: "set-payment", label: "Payment Settings", icon: CreditCard, path: "/settings/payment" },
      { id: "set-security", label: "Security", icon: Lock, path: "/settings/security" },
    ],
  },
];

interface NavItemProps {
  item: MenuItem;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: (path: string) => void;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({
  item,
  isActive,
  isCollapsed,
  onClick,
  currentPath,
}) => {
  const [isExpanded, setIsExpanded] = useState(
    item.children ? currentPath.startsWith(item.path) : false
  );

  const Icon = item.icon;
  const hasChildren = !!item.children;

  const handleItemClick = () => {
    if (hasChildren) setIsExpanded(!isExpanded);
    else onClick(item.path);
  };

  const isCurrent = currentPath === item.path;

  const itemClasses = `
    flex items-center rounded-xl cursor-pointer transition-all duration-200
    ${isCurrent ? "bg-blue-600 text-white shadow-md" : "text-gray-200 hover:bg-blue-700/40"}
    ${isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"}
  `;

  return (
    <li className="my-1">
      <div className={itemClasses} onClick={handleItemClick}>
        <div className="flex items-center">
          <Icon className={`w-5 h-5 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span className="font-medium">{item.label}</span>}
        </div>

        {!isCollapsed && hasChildren && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {hasChildren && isExpanded && !isCollapsed && (
        <ul className="ml-5 mt-1 border-l border-blue-600/40 space-y-1">
          {item.children?.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              isActive={currentPath === child.path}
              isCollapsed={isCollapsed}
              onClick={onClick}
              currentPath={currentPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPath, setCurrentPath] = useState("/fleet/tracking");

  const handleNavigation = (path: string) => setCurrentPath(path);

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";
  const ToggleIcon = isCollapsed ? ChevronsRight : ChevronsLeft;

  return (
    <aside
      className={`${sidebarWidth} h-screen bg-gray-900 text-white transition-all duration-300 flex flex-col p-4`}
    >
      {/* Header */}
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        } mb-6 pb-3 border-b border-blue-700/50`}
      >
        {!isCollapsed && (
          <h1 className="text-xl font-extrabold text-white tracking-wide">
            PLATFORM
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full hover:bg-blue-600/70 transition"
        >
          <ToggleIcon className="w-5 h-5 text-blue-400" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={currentPath.startsWith(item.path)}
              isCollapsed={isCollapsed}
              onClick={handleNavigation}
              currentPath={currentPath}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="pt-4 mt-4 border-t border-blue-700/50 text-sm text-gray-400">
          <p className="text-white font-semibold">Admin User</p>
          <p>john.doe@corp.com</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
