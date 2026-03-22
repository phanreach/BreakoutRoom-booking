import { useState } from "react";
import useRoomQuery from "../../components/hook/use-room-query";
import RoomCard from "../../components/room-card";
import CreateRoom from "../../components/create-room";
import EditRoom from "../../components/edit-room";
import type { Room } from "../../type/api";
import UseDeleteRoom from "../../components/hook/use-delete-room";
import { RoomGridSkeleton } from "../../components/loading-skeletons";
import { DeleteDialog } from "../../components/delete-dialog";

export default function Room() {
  const { data: roomsData, isLoading, error } = useRoomQuery();

  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [roomDelete, setRoomDelete] = useState<Room | null>(null);

  const isAdmin = true;

  const { mutate: deleteRoom, isPending } = UseDeleteRoom();

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
  };

  const handleDelete = (roomId: number) => {
    const room = roomsData?.find((r) => r.id === roomId) || null;
    if (!room) return;

    setRoomDelete(room);
    setDeleteOpen(true);
  };

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col gap-4 border-b bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Room Management</h1>
            <p className="text-sm text-gray-500">Manage breakout rooms</p>
          </div>

          {isAdmin && <CreateRoom />}
        </div>
        <RoomGridSkeleton />
      </>
    );
  }
  if (error) return <p>Error loading rooms</p>;

  return (
    <>
      <div className="flex flex-col gap-4 border-b bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Room Management</h1>
          <p className="text-sm text-gray-500">Manage breakout rooms</p>
        </div>

        {isAdmin && <CreateRoom />}
      </div>

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:gap-6 sm:p-6 xl:grid-cols-3 2xl:grid-cols-4">
        {roomsData?.length ? (
          roomsData.map((room) => (
            <RoomCard
              key={room.id}
              rooms={room}
              isAdmin={isAdmin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg font-medium">No rooms found</p>
          </div>
        )}
      </div>
      {editingRoom && (
        <EditRoom room={editingRoom} onClose={() => setEditingRoom(null)} />
      )}

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Room"
        description={`Are you sure you want to delete "${roomDelete?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        onConfirm={() => {
          if (roomDelete) {
            deleteRoom(roomDelete.id, {
              onSuccess: () => {
                setDeleteOpen(false);
                setRoomDelete(null);
              },
            });
          }
        }}
      />
    </>
  );
}
