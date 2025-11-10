import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Landmark, Building, Users, FileText, Briefcase } from "lucide-react";

const Dashboard: React.FC = () => {
  // 🔹 Summary Data
  const summary = {
    totalGovtJobs: 42,
    totalPrivateJobs: 58,
    totalApplicants: 2780,
    totalApplications: 8690,
    shortlisted: 440,
  };

  // 📈 Trend Data
  const weeklyTrend = [
    { day: "Mon", Govt: 80, Private: 60 },
    { day: "Tue", Govt: 130, Private: 100 },
    { day: "Wed", Govt: 200, Private: 160 },
    { day: "Thu", Govt: 180, Private: 150 },
    { day: "Fri", Govt: 220, Private: 190 },
    { day: "Sat", Govt: 160, Private: 120 },
    { day: "Sun", Govt: 100, Private: 70 },
  ];

  // 🏢 Job Categories
  const jobCategories = [
    { category: "Police / Defence", openings: 180 },
    { category: "Railways", openings: 150 },
    { category: "Teaching", openings: 210 },
    { category: "Banking", openings: 130 },
    { category: "Private Sector", openings: 250 },
  ];

  // 👥 Gender Distribution
  const genderData = [
    { name: "Male", value: 1800 },
    { name: "Female", value: 910 },
    { name: "Other", value: 70 },
  ];
  const COLORS = ["#2563eb", "#ec4899", "#f59e0b"];

  // 🧾 Recent Jobs
  const recentJobs = [
    { title: "AP Police Constable 2025", type: "Government", openings: 120, lastDate: "18 Nov 2025" },
    { title: "Indian Railways JE Notification", type: "Government", openings: 90, lastDate: "20 Nov 2025" },
    { title: "State Bank of India Clerk Jobs", type: "Government", openings: 200, lastDate: "25 Nov 2025" },
    { title: "Infosys Graduate Hiring Drive", type: "Private", openings: 300, lastDate: "30 Nov 2025" },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 min-h-screen">
      {/* HEADER */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
        Employment Analytics Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <SummaryCard title="Govt. Jobs" value={summary.totalGovtJobs} icon={<Landmark />} color="from-blue-600 to-blue-800" />
        <SummaryCard title="Private Jobs" value={summary.totalPrivateJobs} icon={<Building />} color="from-rose-500 to-rose-700" />
        <SummaryCard title="Applicants" value={summary.totalApplicants} icon={<Users />} color="from-green-500 to-green-700" />
        <SummaryCard title="Applications" value={summary.totalApplications} icon={<FileText />} color="from-yellow-500 to-amber-600" />
        <SummaryCard title="Shortlisted" value={summary.shortlisted} icon={<Briefcase />} color="from-indigo-500 to-indigo-700" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Trend Line Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Weekly Job Application Trend
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyTrend}>
              <defs>
                <linearGradient id="colorGovt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorPrivate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Govt" stroke="#2563eb" strokeWidth={2} fill="url(#colorGovt)" dot={{ r: 5 }} />
              <Line type="monotone" dataKey="Private" stroke="#ec4899" strokeWidth={2} fill="url(#colorPrivate)" dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Category-wise Job Openings
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={jobCategories}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="openings" fill="url(#barGradient)" barSize={25} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Gender Distribution
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }:any) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {genderData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT JOBS TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-base font-semibold text-gray-700 mb-3">
          Latest Job Notifications
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-3 text-left border-b">Job Title</th>
              <th className="py-2 px-3 text-left border-b">Type</th>
              <th className="py-2 px-3 text-left border-b">Openings</th>
              <th className="py-2 px-3 text-left border-b">Last Date</th>
            </tr>
          </thead>
          <tbody>
            {recentJobs.map((job, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 border-b last:border-none transition"
              >
                <td className="py-2 px-3 font-medium text-gray-800">
                  {job.title}
                </td>
                <td
                  className={`py-2 px-3 font-semibold ${
                    job.type === "Government"
                      ? "text-blue-600"
                      : "text-rose-600"
                  }`}
                >
                  {job.type}
                </td>
                <td className="py-2 px-3">{job.openings}</td>
                <td className="py-2 px-3">{job.lastDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

/* ------------------------- Summary Card ------------------------- */
interface SummaryProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard: React.FC<SummaryProps> = ({ title, value, icon, color }) => (
  <div
    className={`bg-gradient-to-br ${color} text-white rounded-xl p-5 flex flex-col justify-between shadow-md hover:scale-[1.02] transition-transform`}
  >
    <div className="flex items-center justify-between">
      <div className="text-lg font-semibold">{title}</div>
      <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
    </div>
    <h3 className="text-3xl font-bold mt-3">{value}</h3>
  </div>
);
