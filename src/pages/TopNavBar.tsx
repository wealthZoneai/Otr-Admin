// src/components/TopNavBar.tsx
import React from 'react';
import { Search, Bell, Home, Calendar, Activity, Mail, Settings, ChevronDown } from 'lucide-react';

// --- Type Definitions ---
interface QuickLink {
    name: string;
    icon: React.ElementType;
    path: string;
}

// --- Quick Links Data ---
const quickLinks: QuickLink[] = [
    { name: 'Home', icon: Home, path: '/dashboard/home' },
    { name: 'Calendar', icon: Calendar, path: '/dashboard/calendar' },
    { name: 'Activity', icon: Activity, path: '/dashboard/activity' },
    { name: 'Messages', icon: Mail, path: '/dashboard/messages' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

const TopNavBar: React.FC = () => {
    // We will use mock handlers for actions
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Searching for:', e.target.value);
    };

    const handleNotificationsClick = () => {
        alert('Showing notifications popover.');
    };

    return (
        <div className="flex justify-between items-center h-20 px-6 py-3 bg-white shadow-sm border-b border-gray-100">
            <div className="flex items-center space-x-6">

                {/* 1. Quick Links Block (Dark Blue Block) */}
                <nav className="flex items-center space-x-4 bg-[#053757] p-3 rounded-full text-white shadow-lg">
                    {quickLinks.map((link) => {
                        const Icon = link.icon;
                        const isHome = link.name === 'Home'; // Highlight Home as active visually

                        return (
                            <a
                                key={link.name}
                                href={link.path}
                                className={`flex items-center text-sm font-medium px-2 py-1 rounded-full transition-colors duration-200 
                                    ${isHome
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-gray-200 hover:text-white hover:bg-white/10'
                                    }`
                                }
                            >
                                <Icon className="w-4 h-4 mr-1" />
                                <span>{link.name}</span>
                            </a>
                        );
                    })}
                </nav>
            </div>

            {/* 2. Search, Notifications, and Profile Block */}
            <div className="flex items-center space-x-4">

                {/* Search Bar Block */}
                <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-md">

                    {/* Input Section (White Background) */}
                    <div className="flex items-center bg-white py-2 pl-4 pr-3">
                        <Search className="w-4 h-4 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            onChange={handleSearch}
                            // Adjusted width for a better feel
                            className="bg-white text-sm focus:outline-none w-48 placeholder-gray-500"
                        />
                    </div>
                </div>

                {/* Notification Icon */}
                <button
                    onClick={handleNotificationsClick}
                    className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
                    title="Notifications"
                >
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 block w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div
                    className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
                    title="User Profile"
                >
                    {/* Placeholder for the user's image */}
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-700">
                        {/*  */}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TopNavBar;