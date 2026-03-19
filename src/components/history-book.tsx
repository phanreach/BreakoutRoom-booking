import Cookies from "js-cookie";
import BookingCard from "./booking-card";
import UseBookingQuery from "./hook/use-booking-query";
import UseDeleteBooking from "./hook/use-delete-booking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const toBookingEndDate = (date: string, endTime: string) => {
  const value = new Date(`${date}T${endTime}`);
  return Number.isNaN(value.getTime()) ? null : value;
};

export default function HistoryBook() {
  const fullName = Cookies.get("fullName")?.trim().toLowerCase();
  const { data: bookingData = [], isLoading, error } = UseBookingQuery();
  const { mutate: deleteBooking, isPending } = UseDeleteBooking();

  const userBookings = bookingData.filter((booking) => {
    if (!fullName || !booking.userName) return false;
    return booking.userName.trim().toLowerCase() === fullName;
  });

  const now = new Date();

  const upcomingBookings = userBookings.filter((booking) => {
    const bookingEndDate = toBookingEndDate(booking.date, booking.endTime);
    return bookingEndDate ? bookingEndDate >= now : true;
  });

  const pastBookings = userBookings.filter((booking) => {
    const bookingEndDate = toBookingEndDate(booking.date, booking.endTime);
    return bookingEndDate ? bookingEndDate < now : false;
  });

  return (
    <div className="min-h-screen bg-slate-50/60">
      {/* HEADER */}
      <div className="border-b bg-white px-8 py-6 shadow-sm">
        <div className="mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Bookings
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage your study room reservations and history
            </p>
          </div>

          {/* Summary pills */}
          {!isLoading && !error && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {upcomingBookings.length} upcoming
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                {pastBookings.length} past
              </span>
            </div>
          )}
        </div>
      </div>

      {/* STATES */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 p-12 text-sm text-slate-400">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-primary" />
          Loading your bookings…
        </div>
      )}

      {error && (
        <div className="mx-auto mt-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-500 mx-6">
          ⚠️ Failed to load your bookings. Please try again.
        </div>
      )}

      {/* TABS */}
      {!isLoading && !error && (
        <div className="mx-auto px-6 py-6">
          <Tabs defaultValue="upcoming">
            <TabsList variant="line">
              <TabsTrigger value="upcoming">
                Upcoming
                <span className="ml-1.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                  {upcomingBookings.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="past-booking">
                Past Bookings
                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-500">
                  {pastBookings.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <BookingCard
                bookings={upcomingBookings}
                title="Current Bookings"
                emptyMessage="You do not have any upcoming bookings."
                onCancel={(bookingId) => deleteBooking(bookingId)}
                isCancelling={isPending}
              />
            </TabsContent>

            <TabsContent value="past-booking">
              <BookingCard
                bookings={pastBookings}
                title="Past Bookings"
                emptyMessage="You do not have any past bookings yet."
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}
