import type { Room } from "../type/api";
import {
  Users,
  MapPin,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

type Props = {
  rooms: Room;
  isAdmin?: boolean;
  onEdit?: (room: Room) => void;
  onDelete?: (roomId: number) => void;
};

export default function RoomCard({
  rooms,
  isAdmin = false,
  onEdit,
  onDelete,
}: Props) {
  const image =
    rooms.images && rooms.images.length > 0
      ? rooms.images[0] // now a string URL
      : "https://placehold.co/400x250?text=No+Image";

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100">
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={rooms.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div
          className={`absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm border ${
            rooms.isAvailable
              ? "bg-green-100/90 text-green-700 border-green-200"
              : "bg-red-100/90 text-red-600 border-red-200"
          }`}
        >
          {rooms.isAvailable ? (
            <>
              <CheckCircle2 className="w-3 h-3" /> Available
            </>
          ) : (
            <>
              <XCircle className="w-3 h-3" /> Occupied
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-bold text-gray-900 leading-snug">
            {rooms.name}
          </h3>
          <div className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg text-xs font-medium shrink-0">
            <Users className="w-3.5 h-3.5" />
            {rooms.capacity}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>Floor {rooms.floor}</span>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 mt-4 pt-4 flex justify-end items-center gap-2">
          {!isAdmin && (
            <button className="bg-[#003366] text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-[#014487] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
              Book Now
            </button>
          )}

          {isAdmin && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit?.(rooms)}
                className="flex items-center gap-1.5 bg-[#003366] text-white text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-[#014487] transition-colors duration-200"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => onDelete?.(rooms.id)}
                className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-sm font-medium px-3.5 py-2 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
