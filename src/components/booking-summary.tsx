import {
  Calendar,
  CheckCircle2,
  Clock,
  DoorOpen,
  FileText,
  Users,
} from "lucide-react";
import type { Room } from "../type/api";

type BookingSummaryProps = {
  room: Room;
  dateLabel: string;
  timeLabel: string;
  durationLabel: string;
  participants: number;
  notes: string;
  isSubmitting?: boolean;
  canSubmit: boolean;
  onConfirm: () => void;
};

export default function BookingSummary({
  room,
  dateLabel,
  timeLabel,
  durationLabel,
  participants,
  notes,
  isSubmitting = false,
  canSubmit,
  onConfirm,
}: BookingSummaryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5 rounded-2xl bg-primary p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold tracking-tight">Booking Summary</h3>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80">
            Draft
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Date
              </p>
              <p className="text-sm font-bold">{dateLabel}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Time Slot
              </p>
              <p className="text-sm font-bold">{timeLabel}</p>
              <p className="mt-0.5 text-xs text-white/50">
                Duration: {durationLabel}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <DoorOpen className="h-4 w-4" />
            </div>
            <div>
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Room
              </p>
              <p className="text-sm font-bold">{room.name}</p>
              <p className="mt-0.5 text-xs text-white/50">Floor {room.floor}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Participants
              </p>
              <p className="text-sm font-bold">
                {participants}
                <span className="ml-1 text-xs font-normal text-white/40">
                  / {room.capacity} max
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/60">
                Notes
              </p>
              <p className="text-xs text-white/70">
                {notes.trim() || "No notes added"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15" />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/70">
              Availability
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Available
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full rounded-full bg-emerald-400" />
          </div>
        </div>

        <button
          type="button"
          onClick={onConfirm}
          disabled={!canSubmit || isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-primary shadow-sm transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          <CheckCircle2 className="h-4 w-4" />
          {isSubmitting ? "Creating Booking..." : "Confirm Booking"}
        </button>
      </div>

      <p className="px-2 text-center text-xs text-slate-400">
        Free cancellation up to 30 minutes before the booking starts.
      </p>
    </div>
  );
}
