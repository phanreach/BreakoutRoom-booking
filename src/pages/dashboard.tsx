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
    <div className="bg-background-light dark:bg-background-dark min-h-screen p-8">
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Welcome Back, {fullname}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your breakout room bookings and activity.
          </p>
        </div>

        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90">
          + New Booking
        </button>
      </header>

      {/* Stats */}
      <div className="mb-10">
        <DashboardStats stats={stats} isLoading={isLoading} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Bookings */}
          <section>
            <div className="flex justify-between mb-4">
              <h3 className="text-xl font-bold">Upcoming Bookings</h3>
              <button className="text-primary text-sm font-semibold">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-6"
                >
                  <img
                    src={booking.image}
                    className="w-40 h-28 rounded-lg object-cover"
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

                    <div className="flex gap-3">
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
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
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
