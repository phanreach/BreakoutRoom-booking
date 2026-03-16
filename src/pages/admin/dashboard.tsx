import DashboardStats from "../../components/dashboard-stats";

export default function AdminDashboard() {
  const isLoading = false;
  const stats = [
    {
      id: "booking",
      title: "Total Bookings",
      value: 0,
      icon: "users" as const,
      iconColor: "text-blue-500",
    },
    {
      id: "user",
      title: "Total Users",
      value: 0,
      icon: "CalendarCheck" as const,
      iconColor: "text-green-500",
    },
    {
      id: "room",
      title: "Room Occupancy",
      value: 0,
      icon: "ClipboardClock" as const,
      iconColor: "text-red-500",
    },
  ];
  return (
    <div className="min-h-screen">
      <div className="w-auto py-6 space-y-6">
        <DashboardStats stats={stats} isLoading={isLoading} />
      </div>
    </div>
  );
}
