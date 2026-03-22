import BookingTable from "../../components/booking-table";
import { DeleteDialog } from "../../components/delete-dialog";
import EditBooking from "../../components/edit-booking";
import UseBookingQuery from "../../components/hook/use-booking-query";
import UseDeleteBooking from "../../components/hook/use-delete-booking";
import { BookingTableSkeleton } from "../../components/loading-skeletons";
import type { Booking } from "../../type/api";
import { useState } from "react";

export default function StudentBooking() {
  const { data: bookingData, isLoading, error } = UseBookingQuery();
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bookingDelete, setBookingDelete] = useState<Booking | null>(null);

  const { mutate: deleteBooking, isPending } = UseDeleteBooking();

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col gap-4 border-b bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Booking Management
            </h1>
            <p className="text-sm text-gray-500">
              Monitor and handle student breakout room reservations.
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <BookingTableSkeleton />
        </div>
      </div>
    );
  }
  if (error) return <p>Error loading bookings</p>;

  const handleEdit = (booking: Booking) => {
    setEditBooking(booking);
  };

  const handleDelete = (booking: Booking) => {
    setBookingDelete(booking);
    setDeleteOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Booking Management
          </h1>
          <p className="text-sm text-gray-500">
            Monitor and handle student breakout room reservations.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <BookingTable
          bookings={bookingData || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {editBooking && (
        <EditBooking
          booking={editBooking}
          onClose={() => setEditBooking(null)}
        />
      )}

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Booking"
        description={`Are you sure you want to delete the booking for "${bookingDelete?.room?.name || bookingDelete?.notes || "this room"}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        onConfirm={() => {
          if (bookingDelete) {
            deleteBooking(bookingDelete.id, {
              onSuccess: () => {
                setDeleteOpen(false);
                setBookingDelete(null);
              },
            });
          }
        }}
      />
    </div>
  );
}
