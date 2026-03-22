import DashboardStats from "../components/dashboard-stats";
import {
  upcomingBookings,
  quickRooms,
  recentActivity,
} from "../components/constant/data-dummy";
import Cookies from "js-cookie";
export default function Dashboard() {
  const fullname = Cookies.get("fullName");
  const isLoading = false;

  const stats = [
    {
      id: "booking",
      title: "Total Bookings",
      value: 12,
      icon: "users" as const,
      iconColor: "text-green-500",
    },
    {
      id: "hour",
      title: "Hour Spent",
      value: 20,
      icon: "Clock" as const,
      iconColor: "text-blue-500",
    },
    {
      id: "favorite-room",
      title: "Favorite Room",
      value: 4,
      icon: "House" as const,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background-light p-4 dark:bg-background-dark sm:p-6 lg:p-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
            Welcome Back, {fullname}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your breakout room bookings and activity.
          </p>
        </div>

        <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 sm:w-auto">
          + New Booking
        </button>
      </header>

      {/* Stats */}
      <div className="mb-10">
        <DashboardStats stats={stats} isLoading={isLoading} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Bookings */}
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-xl font-bold">Upcoming Bookings</h3>
              <button className="text-primary text-sm font-semibold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:gap-6 sm:p-5"
                >
                  <img
                    src={booking.image}
                    className="h-48 w-full rounded-lg object-cover sm:h-28 sm:w-40"
                  />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-xs font-bold text-primary">
                        {booking.status}
                      </span>

                      <h4 className="font-bold text-lg mt-1">{booking.room}</h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {booking.date} • {booking.duration}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button className="text-sm font-bold text-primary">
                        View Details
                      </button>
                      <button className="text-sm font-bold text-red-500">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Book */}
          <section>
            <h3 className="text-xl font-bold mb-4">Quick Book</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickRooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-xl border bg-white dark:bg-slate-900 hover:border-primary cursor-pointer"
                >
                  <h5 className="font-bold">{room.name}</h5>

                  <p className="text-xs text-slate-500 mb-4">
                    Capacity: {room.capacity} People
                  </p>

                  <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg">
                    Instant Book
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div>
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <h3 className="text-lg font-bold mb-6">Recent Activity</h3>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id}>
                  <p className="text-sm font-semibold">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.desc}</p>
                  <p className="text-[10px] text-slate-400">{activity.time}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2 text-sm font-semibold border rounded-lg">
              View History
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
