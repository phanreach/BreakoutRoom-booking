import type React from "react";
import { Building2, CalendarDays, FileText, Users, X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Booking } from "../type/api";
import useRoomQuery from "./hook/use-room-query";
import UseUpdateBookings from "./hook/use-update-booking";

type Props = {
  booking: Booking;
  onClose: () => void;
};

type BookingForm = {
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  notes: string;
};

type InputProps = {
  label: string;
  icon: React.ReactNode;
  error?: string;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({
  label,
  icon,
  error,
  type = "text",
  ...props
}: InputProps) => (
  <div className="flex flex-col gap-2">
    <label className="flex items-center gap-2 text-sm font-bold">
      {icon}
      {label}
    </label>

    <input
      type={type}
      className={`w-full rounded-lg border p-3 focus:ring-2 focus:ring-[#003366] ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...props}
    />

    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default function EditBooking({ booking, onClose }: Props) {
  const { mutate: updateBooking, isPending } = UseUpdateBookings();
  const { data: rooms = [], isLoading: isLoadingRooms } = useRoomQuery();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingForm>();

  useEffect(() => {
    if (!booking) return;

    reset({
      roomId: booking.room?.id ?? undefined,
      date: booking.date,
      startTime: booking.startTime.slice(0, 5),
      endTime: booking.endTime.slice(0, 5),
      participants: booking.participants,
      notes: booking.notes ?? "",
    });
  }, [booking, reset]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: BookingForm) => {
    updateBooking(
      {
        id: booking.id,
        ...data,
        notes: data.notes ?? "",
      },
      {
        onSuccess: () => handleClose(),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex justify-between border-b p-6">
          <h2 className="text-2xl font-bold">Edit Booking</h2>
          <button type="button" onClick={handleClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 p-6">
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm font-bold">
                <Building2 className="h-4 w-4" />
                Room
              </label>

              <select
                defaultValue={booking.room?.id}
                {...register("roomId", {
                  required: "Room is required",
                  valueAsNumber: true,
                })}
                disabled={isLoadingRooms}
                className={`w-full rounded-lg border p-3 ${
                  errors.roomId ? "border-red-500" : "border-gray-300"
                }`}
              >
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>

              {errors.roomId && (
                <p className="text-sm text-red-500">{errors.roomId.message}</p>
              )}
            </div>

            <FormInput
              label="Date"
              icon={<CalendarDays className="h-4 w-4" />}
              type="date"
              error={errors.date?.message}
              {...register("date", { required: "Date is required" })}
            />

            <FormInput
              label="Start Time"
              icon={<CalendarDays className="h-4 w-4" />}
              type="time"
              error={errors.startTime?.message}
              {...register("startTime", { required: "Start time required" })}
            />

            <FormInput
              label="End Time"
              icon={<CalendarDays className="h-4 w-4" />}
              type="time"
              error={errors.endTime?.message}
              {...register("endTime", { required: "End time required" })}
            />

            <FormInput
              label="Participants"
              icon={<Users className="h-4 w-4" />}
              type="number"
              error={errors.participants?.message}
              {...register("participants", {
                required: "Participants required",
                valueAsNumber: true,
              })}
            />

            <FormInput
              label="Notes"
              icon={<FileText className="h-4 w-4" />}
              error={errors.notes?.message}
              {...register("notes")}
            />
          </div>

          <div className="flex gap-3 border-t p-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl border py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || isLoadingRooms}
              className="flex-1 rounded-xl bg-[#003366] py-2 text-white hover:bg-[#014487] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
