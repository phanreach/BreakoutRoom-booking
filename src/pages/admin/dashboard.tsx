import DashboardStats from "../../components/dashboard-stats";

export default function AdminDashboard() {
  const isLoading = false;
  const stats = [
    {
      id: "booking",
      title: "Total Bookings",
      value: 0,
      icon: "users" as const,
      iconColor: "text-green-500",
    },
  ];
  return (
    <div className="min-h-screen">
      <div>
        <h1 className="font-bold text-3xl px-4">Welcome Back!</h1>
      </div>
      <div className="w-full py-6 space-y-6">
        <DashboardStats stats={stats} isLoading={isLoading} />
      </div>
    </div>
  );
}
