import { format } from "date-fns";
import { Layers, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookingSummary from "../components/booking-summary";
import CapacityBooking from "../components/capacity-booking";
import UseBookingMutation from "../components/hook/use-booking-mutation";
import { Calendar } from "../components/ui/calendar";
import type { Room } from "../type/api";

const formatTimeLabel = (value: string) => {
  if (!value) return "--";

  const [hourText, minute] = value.split(":");
  const hour = Number(hourText);

  if (Number.isNaN(hour)) return value;

  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12}:${minute} ${period}`;
};

const getDurationLabel = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return "--";

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;

  if (Number.isNaN(startTotal) || Number.isNaN(endTotal) || endTotal <= startTotal) {
    return "--";
  }

  const totalMinutes = endTotal - startTotal;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours && minutes) return `${hours}h ${minutes}m`;
  if (hours) return `${hours} hour${hours > 1 ? "s" : ""}`;
  return `${minutes} min`;
};

export default function BookDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const room: Room | undefined = location.state?.room;
  const { mutate: createBooking, isPending } = UseBookingMutation();

  const [date, setDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [participants, setParticipants] = useState(1);
  const [notes, setNotes] = useState("");

  const durationLabel = getDurationLabel(startTime, endTime);
  const dateLabel = date ? format(date, "EEEE, MMM d, yyyy") : "Select a date";
  const timeLabel =
    startTime && endTime
      ? `${formatTimeLabel(startTime)} - ${formatTimeLabel(endTime)}`
      : "Select a time slot";
  const canSubmit =
    Boolean(room) &&
    Boolean(date) &&
    Boolean(startTime) &&
    Boolean(endTime) &&
    durationLabel !== "--" &&
    participants > 0 &&
    participants <= (room?.capacity ?? 0);

  if (!room) return <p>Room not found</p>;

  const handleConfirmBooking = () => {
    if (!date || !canSubmit) return;

    createBooking(
      {
        roomId: room.id,
        date: format(date, "yyyy-MM-dd"),
        startTime,
        endTime,
        participants,
        notes: notes.trim(),
      },
      {
        onSuccess: () => {
          navigate("/my-bookings");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="border-b border-slate-100 bg-white px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/60">
                Room Booking
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Book Breakout <span className="text-primary">{room.name}</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Secure your space for focused study or collaborative group work
            </p>
          </div>

          <div className="mt-1 hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Layers className="h-4 w-4 text-primary/60" />
              <span>Floor {room.floor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Users className="h-4 w-4 text-primary/60" />
              <span>Up to {room.capacity} people</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-primary/60" />
              <span>{room.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 px-8 py-8 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 flex items-center gap-2 text-base font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </span>
              Date &amp; Time Selection
            </h2>

            <div className="grid items-start gap-8 md:grid-cols-2">
              <div className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  showOutsideDays
                  captionLayout="dropdown"
                />
              </div>

              <div className="flex flex-col gap-5 pt-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-primary"
                  />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Duration
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {durationLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CapacityBooking
            capacity={room.capacity}
            participants={participants}
            setParticipants={setParticipants}
            notes={notes}
            setNotes={setNotes}
          />

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-base font-semibold text-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </span>
              Room Information
            </h2>

            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Floor
                </p>
                <p className="text-lg font-bold text-slate-800">{room.floor}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Capacity
                </p>
                <p className="text-lg font-bold text-slate-800">
                  {room.capacity}{" "}
                  <span className="text-sm font-normal text-slate-400">pax</span>
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Room
                </p>
                <p className="text-lg font-bold text-slate-800">{room.name}</p>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-slate-500">
              {room.description}
            </p>

            {room.images.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {room.images.map((imgUrl) => (
                  <img
                    key={imgUrl}
                    src={imgUrl}
                    alt={room.name}
                    className="h-28 w-28 cursor-pointer rounded-xl border border-slate-100 object-cover shadow-sm transition-transform hover:scale-105"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="sticky top-6">
            <BookingSummary
              room={room}
              dateLabel={dateLabel}
              timeLabel={timeLabel}
              durationLabel={durationLabel}
              participants={participants}
              notes={notes}
              canSubmit={canSubmit}
              isSubmitting={isPending}
              onConfirm={handleConfirmBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
