import useRoomQuery from "../components/hook/use-room-query";
import RoomCard from "../components/room-card";

export default function Book() {
  const { data: roomsData, isLoading, error } = useRoomQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rooms</p>;

  return (
    <div>
      <div className="flex justify-between border-b bg-white p-6">
        <div>
          <h1 className="text-3xl font-bold">Book Breakout Room</h1>
          <p className="text-sm text-gray-500">
            Find and book the perfect space for your next group study
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 p-6 gap-4">
        {roomsData?.length ? (
          roomsData.map((room) => <RoomCard key={room.id} rooms={room} />)
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
}
