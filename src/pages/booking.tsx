import useRoomQuery from "../components/hook/use-room-query";
import { RoomGridSkeleton } from "../components/loading-skeletons";
import RoomCard from "../components/room-card";

export default function Book() {
  const { data: roomsData, isLoading, error } = useRoomQuery();

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col gap-4 border-b bg-white p-4 sm:p-6">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Book Breakout Room</h1>
            <p className="text-sm text-gray-500">
              Find and book the perfect space for your next group study
            </p>
          </div>
        </div>
        <RoomGridSkeleton />
      </div>
    );
  }
  if (error) return <p>Error loading rooms</p>;

  return (
    <div>
      <div className="flex flex-col gap-4 border-b bg-white p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Book Breakout Room</h1>
          <p className="text-sm text-gray-500">
            Find and book the perfect space for your next group study
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-3 2xl:grid-cols-4">
        {roomsData?.length ? (
          roomsData.map((room) => <RoomCard key={room.id} rooms={room} />)
        ) : (
          <p>No rooms found</p>
        )}
      </div>
    </div>
  );
}
