import { Calendar, Clock, DoorOpen } from "lucide-react";

export default function BookingSummary() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-primary text-white p-6 rounded-xl shadow-lg flex flex-col gap-6">
        <h3 className="text-lg font-bold">Booking Summary</h3>

        <div className="flex flex-col gap-4">
          {/* Date */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-white/70">Date</p>
              <p className="text-sm font-bold">Tuesday, Mar 5, 2026</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-white/70">Time Slot</p>
              <p className="text-sm font-bold">11:00 AM - 12:00 PM (1h)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <DoorOpen className="w-5 h-5 mt-0.5" />
            <div>
              <p className="text-xs text-white/70">Room Recommendation</p>
              <p className="text-sm font-bold">Room 304 - Level 3</p>
              <p className="text-xs text-white/60">Features: Whiteboard, TV</p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Availability Status</span>
              <span className="bg-emerald-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Available
              </span>
            </div>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-full"></div>
            </div>
          </div>
          <button className="w-full py-3 bg-white text-primary rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors shadow-sm">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
