import { Calendar, CircleX, Clock3, DoorOpen, FileText } from "lucide-react";
import type { Booking } from "../type/api";

type Props = {
  bookings: Booking[];
  title: string;
  emptyMessage: string;
  onCancel?: (bookingId: number) => void;
  isCancelling?: boolean;
};

export default function BookingCard({
  bookings,
  title,
  emptyMessage,
  onCancel,
  isCancelling = false,
}: Props) {
  if (!bookings.length) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-white px-8 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
          <Calendar className="h-6 w-6 text-slate-400" />
        </div>
        <p className="text-sm font-medium text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-2 px-1">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-4 w-4 text-primary" />
        </div>
        <p className="text-base font-semibold text-slate-800">{title}</p>
        <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </span>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md"
          >
            {/* Accent bar */}
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/60 to-primary rounded-l-2xl" />

            <div className="flex flex-col gap-0 md:flex-row">
              {/* IMAGE */}
              <div className="relative ml-1 w-full overflow-hidden md:w-44 md:min-h-full">
                <img
                  src={
                    booking.room?.images?.[0]?.imageUrl || "/placeholder.jpg"
                  }
                  alt={booking.room?.name}
                  className="h-44 w-full object-cover md:h-full md:rounded-none md:rounded-l-none transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r" />
              </div>

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-slate-900 leading-snug">
                        {booking.room?.name || "Breakout Room"}
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-400">
                        Reserved by{" "}
                        <span className="font-medium text-slate-500">
                          {booking.userName || "Unknown user"}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* DETAILS GRID */}
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/8">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-xs font-medium">
                        {booking.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/8">
                        <Clock3 className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-xs font-medium">
                        {booking.startTime} – {booking.endTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/8">
                        <DoorOpen className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-xs font-medium">
                        {booking.participants} participants
                      </span>
                    </div>

                    <div className="flex items-start gap-2 col-span-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/8">
                        <FileText className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="text-xs text-slate-500 leading-relaxed">
                        {booking.notes?.trim() || "No notes added"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CANCEL BUTTON */}
                {onCancel && (
                  <div className="flex justify-end border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      disabled={isCancelling}
                      onClick={() => onCancel(booking.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3.5 py-1.5 text-xs font-semibold text-red-500 transition-all hover:border-red-200 hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
                    >
                      <CircleX className="h-3.5 w-3.5" />
                      {isCancelling ? "Cancelling..." : "Cancel Booking"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
