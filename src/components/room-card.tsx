import type { Room } from "../type/api";
import { Users, MapPin } from "lucide-react";

type Props = {
  rooms: Room;
};

export default function RoomCard({ rooms }: Props) {
  const image =
    rooms.images && rooms.images.length > 0
      ? rooms.images[0]
      : "https://placehold.co/400x250?text=No+Image";

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition duration-300 flex flex-col">
      <img src={image} alt={rooms.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">{rooms.name}</h3>

          <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md text-sm">
            <Users className="w-4 h-4" />
            {rooms.capacity}
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600 space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Floor: {rooms.floor}</span>
          </div>

          <div>
            Status:{" "}
            <span
              className={`font-medium ${
                rooms.isAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {rooms.isAvailable ? "Available" : "Occupied"}
            </span>
          </div>
        </div>

        <div className="border-t mt-4 pt-4 flex justify-end">
          <button className="bg-[#003366] w-30 text-white px-4 py-1.5 text-md rounded-lg hover:bg-[#014487] transition cursor-pointer">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
