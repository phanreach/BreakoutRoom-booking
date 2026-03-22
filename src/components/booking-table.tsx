import { PenBox, Trash2 } from "lucide-react";
import type { Booking } from "../type/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Props = {
  bookings: Booking[];
  onEdit?: (booking: Booking) => void;
  onDelete?: (booking: Booking) => void;
};

export default function BookingTable({ bookings, onEdit, onDelete }: Props) {
  function formatTime24To12(time24: string) {
    if (!time24) return "N/A";
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) hour = 12;
    return `${hour}:${minute} ${ampm}`;
  }
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table className="min-w-[760px]">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="px-4 py-3">STUDENT</TableHead>
              <TableHead className="px-4 py-3">ROOM</TableHead>
              <TableHead className="hidden px-4 py-3 md:table-cell">
                DATE
              </TableHead>
              <TableHead className="px-4 py-3">TIME SLOT</TableHead>
              <TableHead className="px-4 py-3">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-4"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((b) => (
                <TableRow
                  key={b.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                        {b.userName ? b.userName.charAt(0).toUpperCase() : "N"}
                      </div>
                      <span className="text-gray-600 font-semibold">
                        {b.userName || "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {b.room?.name || "N/A"}
                  </TableCell>

                  <TableCell className="hidden px-4 py-3 md:table-cell">
                    {b.date}
                  </TableCell>

                  <TableCell className="px-4 py-3">
                    {formatTime24To12(b.startTime)} -{" "}
                    {formatTime24To12(b.endTime)}
                  </TableCell>

                  <TableCell className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => onEdit?.(b)}
                      title="Edit"
                      className="p-2 rounded-lg hover:bg-blue-50 text-primary transition"
                    >
                      <PenBox size={18} />
                    </button>

                    <button
                      onClick={() => onDelete?.(b)}
                      title="Delete"
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
