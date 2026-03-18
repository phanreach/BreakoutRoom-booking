import { useLocation } from "react-router-dom";
import type { Room } from "../type/api";
import { Calendar } from "../components/ui/calendar";
import BookingSummary from "../components/booking-summary";

export default function BookDetail() {
  const location = useLocation();
  const room: Room | undefined = location.state?.room;

  if (!room) return <p>Room not found</p>;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between border-b bg-white p-6">
        <div>
          <h1 className="text-3xl font-bold">Book Breakout {room.name}</h1>
          <p className="text-sm text-gray-500">
            Secure your space for focused study or collaborative group work
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 p-6 gap-6">
        {/* LEFT SECTION */}
        <div className="col-span-2 bg-white p-4 rounded-xl shadow-sm">
          {/* 2 COLUMN INSIDE CARD */}
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Calendar */}
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-4">
                Date & Time Selection
              </h2>

              <Calendar showOutsideDays captionLayout="dropdown" />
            </div>

            <div className="flex flex-col justify-center h-full pl-6">
              <h2 className="text-lg font-semibold mb-4">Select Time</h2>

              <div className="flex flex-col gap-4">
                {/* Start Time */}
                <div>
                  <label className="text-sm text-gray-500">Start Time</label>
                  <input
                    type="time"
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="text-sm text-gray-500">End Time</label>
                  <input
                    type="time"
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Duration */}
                <div className="text-sm text-gray-600">
                  Duration: <span className="font-medium">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-span-1">
          <BookingSummary />
        </div>
      </div>

      {/* ROOM INFO */}
      <div className="p-6 bg-white rounded-lg shadow-sm m-6">
        <p>
          <strong>Floor:</strong> {room.floor}
        </p>
        <p>
          <strong>Capacity:</strong> {room.capacity}
        </p>
        <p>
          <strong>Description:</strong> {room.description}
        </p>

        <div className="mt-4 flex gap-2 flex-wrap">
          {room.images.map((imgUrl) => (
            <img
              key={imgUrl}
              src={imgUrl}
              alt={room.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
