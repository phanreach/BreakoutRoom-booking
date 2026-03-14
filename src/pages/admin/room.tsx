import useRoomQuery from "../../components/hook/use-room-query";
import RoomCard from "../../components/room-card";

export default function Room() {
  const { data: roomsData, isLoading, error } = useRoomQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading rooms</p>;

  return (
    <div>
      {roomsData?.length ? (
        roomsData.map((room) => <RoomCard key={room.id} rooms={room} />)
      ) : (
        <p>No rooms found</p>
      )}
    </div>
  );
}
