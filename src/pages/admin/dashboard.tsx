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
import { FolderUp, HousePlus, UserPlus } from "lucide-react";
import useUsersQuery from "../../components/hook/use-users-query";
import useRoomQuery from "../../components/hook/use-room-query";
import UseBookingQuery from "../../components/hook/use-booking-query";

export default function AdminDashboard() {
  const { data: users = [], isLoading: isLoadingUsers } = useUsersQuery();
  const { data: rooms = [], isLoading: isLoadingRooms } = useRoomQuery();
  const { data: bookings = [], isLoading: isLoadingBookings } =
    UseBookingQuery();

  const isLoading = isLoadingUsers || isLoadingRooms || isLoadingBookings;

  const stats = [
    {
      id: "booking",
      title: "Total Bookings",
      value: bookings.length,
      icon: "CalendarCheck" as const,
      iconColor: "text-blue-500",
    },
    {
      id: "user",
      title: "Total Users",
      value: users.length,
      icon: "users" as const,
      iconColor: "text-green-500",
    },
    {
      id: "room",
      title: "Total Rooms",
      value: rooms.length,
      icon: "House" as const,
      iconColor: "text-red-500",
    },
  ];

  const formatTime24To12 = (time24: string) => {
    if (!time24) return "N/A";
    const [hourStr, minuteStr] = time24.split(":");
    let hour = Number.parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour %= 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minuteStr} ${ampm}`;
  };

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
            <p className="text-sm text-slate-500">
              {bookings.length} booking{bookings.length === 1 ? "" : "s"}
            </p>
          </div>

          <Table className="min-w-full">
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="px-4 py-3">User</TableHead>
                <TableHead className="px-4 py-3">Room</TableHead>
                <TableHead className="px-4 py-3">Date</TableHead>
                <TableHead className="px-4 py-3">Time Slot</TableHead>
                <TableHead className="px-4 py-3">Participants</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No bookings found
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((booking) => (
                  <TableRow
                    key={booking.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          {booking.userName
                            ? booking.userName.charAt(0).toUpperCase()
                            : "N"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-sm font-bold">
                            {booking.userName || "N/A"}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Booking #{booking.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-sm font-medium">
                      {booking.room?.name || "N/A"}
                    </TableCell>

                    <TableCell className="px-4 py-3">{booking.date}</TableCell>

                    <TableCell className="px-4 py-3">
                      {formatTime24To12(booking.startTime)} -{" "}
                      {formatTime24To12(booking.endTime)}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      {booking.participants}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
