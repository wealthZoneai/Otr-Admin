import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  MessageCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Reply,
  X,
  Send,
} from "lucide-react";

/* ----------------------------- Types ----------------------------- */
interface Ticket {
  id: string;
  user: string;
  email: string;
  issue: string;
  status: "Open" | "Pending" | "Resolved" | "Escalated";
  createdAt: string;
}

interface Trend {
  day: string;
  tickets: number;
}

/* ----------------------------- Data ----------------------------- */
const tickets: Ticket[] = [
  {
    id: "SUP-2024",
    user: "Ravi Kumar",
    email: "ravi@example.com",
    issue: "Login not working",
    status: "Open",
    createdAt: "Nov 8, 2025",
  },
  {
    id: "SUP-2025",
    user: "Priya Sharma",
    email: "priya@gmail.com",
    issue: "Payment failed but deducted",
    status: "Pending",
    createdAt: "Nov 7, 2025",
  },
  {
    id: "SUP-2026",
    user: "Sneha Reddy",
    email: "sneha@gmail.com",
    issue: "Unable to upload documents",
    status: "Escalated",
    createdAt: "Nov 6, 2025",
  },
  {
    id: "SUP-2027",
    user: "Rahul Dev",
    email: "rahul@gmail.com",
    issue: "Job not visible in dashboard",
    status: "Resolved",
    createdAt: "Nov 5, 2025",
  },
];

const trend: Trend[] = [
  { day: "Mon", tickets: 8 },
  { day: "Tue", tickets: 16 },
  { day: "Wed", tickets: 10 },
  { day: "Thu", tickets: 18 },
  { day: "Fri", tickets: 22 },
  { day: "Sat", tickets: 14 },
  { day: "Sun", tickets: 9 },
];

/* -------------------------- Main Component -------------------------- */
const AdminHelpAndSupport: React.FC = () => {
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredTickets = tickets.filter(
    (t) =>
      (filter === "All" || t.status === filter) &&
      (t.user.toLowerCase().includes(search.toLowerCase()) ||
        t.issue.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Help & Support Center
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all user queries, issues, and support tickets here.
          </p>
        </div>
        <div className="mt-3 md:mt-0 flex items-center gap-3">
          <input
            type="text"
            placeholder="Search user or issue..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-pink-500 focus:border-pink-500 w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:ring-pink-500 focus:border-pink-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>Pending</option>
            <option>Resolved</option>
            <option>Escalated</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Summary title="Open" value={8} color="blue" icon={<MessageCircle />} />
        <Summary title="Pending" value={5} color="amber" icon={<Clock />} />
        <Summary title="Resolved" value={14} color="green" icon={<CheckCircle2 />} />
        <Summary title="Escalated" value={3} color="rose" icon={<AlertTriangle />} />
      </div>

      {/* Ticket Trend Chart */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Weekly Ticket Activity
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tickets"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7, fill: "#1d4ed8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tickets Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Support Tickets
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Ticket ID</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Issue</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Created</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 border-b last:border-0 transition-all"
                >
                  <td className="px-4 py-2 font-semibold text-gray-800">{ticket.id}</td>
                  <td className="px-4 py-2">{ticket.user}</td>
                  <td className="px-4 py-2">{ticket.issue}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="px-4 py-2 text-gray-500">{ticket.createdAt}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => setSelected(ticket)}
                      className="text-pink-600 hover:text-pink-700 font-medium flex items-center justify-center gap-1 mx-auto"
                    >
                      <Reply size={14} /> Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTickets.length === 0 && (
            <p className="text-center py-4 text-gray-500">No tickets found.</p>
          )}
        </div>
      </div>

      {/* Reply Drawer */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white w-full sm:w-[400px] h-full p-6 rounded-l-2xl shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Reply to {selected.user}
              </h3>
              <button onClick={() => setSelected(null)}>
                <X size={20} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Issue:</strong> {selected.issue}
            </p>
            <textarea
              rows={6}
              placeholder="Type your response here..."
              className="border rounded-md p-3 text-sm focus:ring-pink-500 focus:border-pink-500 flex-grow"
            ></textarea>
            <button className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white px-4 py-2 rounded-md font-medium hover:from-pink-600 hover:via-rose-600 hover:to-pink-700">
              <Send size={16} /> Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHelpAndSupport;

/* -------------------------- Reusable Components -------------------------- */

interface SummaryProps {
  title: string;
  value: number;
  color: "blue" | "green" | "amber" | "rose";
  icon: React.ReactNode;
}

const Summary: React.FC<SummaryProps> = ({ title, value, color, icon }) => {
  const colors = {
    blue: "from-blue-500 to-blue-700",
    green: "from-green-500 to-emerald-700",
    amber: "from-amber-400 to-yellow-600",
    rose: "from-rose-500 to-pink-600",
  }[color];

  return (
    <div
      className={`bg-gradient-to-br ${colors} text-white rounded-xl shadow-md p-5 flex flex-col justify-between transition-transform hover:scale-[1.02]`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{title}</span>
        <div className="bg-white/20 p-2 rounded-md">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
};

const StatusBadge: React.FC<{ status: Ticket["status"] }> = ({ status }) => {
  const styles =
    status === "Open"
      ? "bg-blue-100 text-blue-700"
      : status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : status === "Resolved"
      ? "bg-green-100 text-green-700"
      : "bg-rose-100 text-rose-700";
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
};
