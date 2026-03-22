import { Users } from "lucide-react";

type Props = {
  capacity: number;
  participants: number;
  setParticipants: (val: number) => void;
  notes: string;
  setNotes: (val: string) => void;
};

export default function CapacityBooking({
  capacity,
  participants,
  setParticipants,
  notes,
  setNotes,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-6 flex items-center gap-2 text-base font-semibold text-slate-800">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          2
        </span>
        Booking Details
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Number of Participants
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="number"
              min={1}
              max={capacity}
              value={participants}
              onChange={(e) => {
                const nextValue = Number(e.target.value);
                if (Number.isNaN(nextValue)) return;
                setParticipants(Math.min(Math.max(nextValue, 1), capacity));
              }}
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 outline-none transition focus:border-primary"
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            Room capacity: {capacity} people
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
            Notes <span className="normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Add booking notes"
            className="w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
