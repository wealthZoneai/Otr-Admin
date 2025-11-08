import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Save,
  RefreshCw,
  Settings,
  Power,
} from "lucide-react";

const AdminSettings: React.FC = () => {
  // ✅ Profile State
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@govtjobs.in",
    phone: "+91 9876543210",
    role: "Super Admin",
  });

  // ✅ Security State
  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: true,
  });

  // ✅ Notification Preferences
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newJobAlerts: true,
    applicantUpdates: true,
    systemAlerts: false,
  });

  // ✅ System Settings
  const [system, setSystem] = useState({
    appVersion: "2.5.1",
    maintenanceMode: false,
  });

  const handleSave = () => {
    alert("✅ Settings saved successfully!");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <Settings className="text-blue-600" /> Admin Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <Card title="Profile Information" icon={<User className="text-blue-600" />}>
          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <InputField
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <InputField
              label="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <InputField
              label="Role"
              value={profile.role}
              readOnly
            />
          </div>
        </Card>

        {/* Security Settings */}
        <Card title="Password & Security" icon={<Lock className="text-rose-600" />}>
          <div className="space-y-4">
            <InputField
              label="Current Password"
              type="password"
              value={security.currentPassword}
              onChange={(e) =>
                setSecurity({ ...security, currentPassword: e.target.value })
              }
            />
            <InputField
              label="New Password"
              type="password"
              value={security.newPassword}
              onChange={(e) =>
                setSecurity({ ...security, newPassword: e.target.value })
              }
            />
            <InputField
              label="Confirm Password"
              type="password"
              value={security.confirmPassword}
              onChange={(e) =>
                setSecurity({ ...security, confirmPassword: e.target.value })
              }
            />

            <div className="flex items-center justify-between border-t pt-3 mt-3">
              <label className="text-sm text-gray-700 font-medium flex items-center gap-2">
                <Shield className="text-green-600" size={18} /> Two-Factor Authentication
              </label>
              <input
                type="checkbox"
                checked={security.twoFactorAuth}
                onChange={() =>
                  setSecurity({
                    ...security,
                    twoFactorAuth: !security.twoFactorAuth,
                  })
                }
                className="h-4 w-4 accent-green-600"
              />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card title="Notification Preferences" icon={<Bell className="text-yellow-600" />}>
          <div className="space-y-3">
            {Object.entries(notifications).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center justify-between text-sm text-gray-700"
              >
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() =>
                    setNotifications({ ...notifications, [key]: !value })
                  }
                  className="h-4 w-4 accent-blue-600"
                />
              </label>
            ))}
          </div>
        </Card>

        {/* System Settings */}
        <Card title="System Configuration" icon={<Power className="text-indigo-600" />}>
          <div className="space-y-4">
            <InputField
              label="Application Version"
              value={system.appVersion}
              readOnly
            />

            <div className="flex items-center justify-between border-t pt-3 mt-3">
              <label className="text-sm text-gray-700 font-medium">
                Enable Maintenance Mode
              </label>
              <input
                type="checkbox"
                checked={system.maintenanceMode}
                onChange={() =>
                  setSystem({
                    ...system,
                    maintenanceMode: !system.maintenanceMode,
                  })
                }
                className="h-4 w-4 accent-red-600"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Save / Reset Buttons */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition-all"
        >
          <RefreshCw size={16} /> Reset
        </button>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-6 py-2 rounded-md font-semibold hover:from-pink-600 hover:via-rose-600 hover:to-pink-700 transition-all"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;

/* ---------------------------- Reusable Components ---------------------------- */

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, icon, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  value,
  readOnly = false,
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={`w-full mt-1 border rounded-md p-2 text-sm focus:ring-pink-500 focus:border-pink-500 ${
        readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
      }`}
    />
  </div>
);
