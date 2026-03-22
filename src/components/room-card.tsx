import { useNavigate } from "react-router-dom";
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
      ? rooms.images[0]
      : "https://placehold.co/400x250?text=No+Image";

  const navigate = useNavigate();

  const handleNavigate = (roomId: number) => {
    navigate(`/book-room/${roomId}`, { state: { room: rooms } });
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
          <span>Floor {rooms.description}</span>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="w-4 h-4 text-slate-400" />
          <span>Floor {rooms.floor}</span>
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
          {!isAdmin && (
            <button
              className="w-full cursor-pointer rounded-xl bg-[#003366] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#014487] hover:shadow-md sm:w-auto"
              onClick={() => handleNavigate(rooms.id)}
            >
              Book Now
            </button>
          )}

          {isAdmin && (
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                onClick={() => onEdit?.(rooms)}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[#003366] px-3.5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#014487]"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={() => onDelete?.(rooms.id)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-medium text-red-600 transition-all duration-200 hover:border-red-300 hover:bg-red-100"
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
