import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ChartLineDefault from "../../components/ui/line-chart";
import DashboardStats from "../../components/dashboard-stats";
import { EllipsisVertical, FolderUp, HousePlus, UserPlus } from "lucide-react";

export default function AdminDashboard() {
  const isLoading = false;
  const stats = [
    {
      id: "booking",
      title: "Total Bookings",
      value: 12,
      icon: "CalendarCheck" as const,
      iconColor: "text-blue-500",
    },
    {
      id: "user",
      title: "Total Users",
      value: 212,
      icon: "users" as const,
      iconColor: "text-green-500",
    },
    {
      id: "room",
      title: "Room Occupancy",
      value: 12,
      icon: "ClipboardClock" as const,
      iconColor: "text-red-500",
    },
  ];

  const bookings = [
    {
      user: "Alex Johnson",
      course: "Computer Science",
      room: "Room 402 - Tech Hub",
      time: "Today, 2:00 PM",
      duration: "2 Hours",
      status: "Confirmed",
      avatar:
        "https://img.freepik.com/premium-vector/vector-illustration-color-avatar-user-profile-person-icon-profile-picture-person-with-facial-features-suitable-social-media-profiles-icons-screensavers-as-templatex9_719432-2106.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      user: "Sarah Miller",
      course: "Architecture",
      room: "Room 105 - Design Lab",
      time: "Today, 4:30 PM",
      duration: "1 Hour",
      status: "Pending",
      avatar: "https://img.icons8.com/color/1200/user-male-circle--v10.jpg",
    },
    {
      user: "Marcus Chen",
      course: "Business School",
      room: "Room 312 - Study Pod",
      time: "Today, 10:00 AM",
      duration: "3 Hours",
      status: "Completed",
      avatar:
        "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211471.png",
    },
  ];

  return (
    <div>
      <main className="flex-1 overflow-y-auto p-8 not-odd:space-y-8">
        <div className="w-auto py-6 space-y-6">
          <DashboardStats stats={stats} isLoading={isLoading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChartLineDefault />
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <h3 className="text-lg font-bold mb-6">Quick Actions</h3>

            {/* Buttons */}
            {[
              {
                icon: <HousePlus />,
                title: "Add New Room",
                subtitle: "Config space & capacity",
              },
              {
                icon: <UserPlus />,
                title: "Register User",
                subtitle: "Student or Faculty account",
              },
              {
                icon: <FolderUp />,
                title: "Broadcast Message",
                subtitle: "Send alerts to active users",
              },
            ].map((action, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary hover:bg-primary/5 transition-all text-left mb-4 last:mb-0 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {action.icon}
                </div>
                <div>
                  <p className="font-bold text-sm">{action.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {action.subtitle}
                  </p>
                </div>
              </button>
            ))}

            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl mt-auto">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                System Health
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  All systems operational
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg mt-6 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h3 className="text-lg font-bold">Recent Bookings</h3>
            <button className="text-sm text-primary font-semibold hover:underline">
              View All Bookings
            </button>
          </div>

          <Table className="min-w-full">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="px-4 py-3">User</TableHead>
                <TableHead className="px-4 py-3">Room</TableHead>
                <TableHead className="px-4 py-3">Time</TableHead>
                <TableHead className="px-4 py-3">Status</TableHead>
                <TableHead className="px-4 py-3 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((b) => (
                <TableRow
                  key={b.user}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={b.avatar}
                          alt={b.user}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-sm font-bold">{b.user}</p>
                        <p className="text-[10px] text-slate-400 ">
                          {b.course}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {b.room}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <div className="text-sm">{b.time}</div>
                    <p className="text-[10px] text-slate-40">{b.duration}</p>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${
                        b.status === "Confirmed"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : b.status === "Pending"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400"
                      }`}
                    >
                      {b.status}
                    </span>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-4 py-3 text-center">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <EllipsisVertical />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
