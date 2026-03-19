import BookingTable from "../../components/booking-table";
import { DeleteDialog } from "../../components/delete-dialog";
import EditBooking from "../../components/edit-booking";
import UseBookingQuery from "../../components/hook/use-booking-query";
import UseDeleteBooking from "../../components/hook/use-delete-booking";
import type { Booking } from "../../type/api";
import { useState } from "react";

export default function StudentBooking() {
  const { data: bookingData, isLoading, error } = UseBookingQuery();
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [bookingDelete, setBookingDelete] = useState<Booking | null>(null);

  const { mutate: deleteBooking, isPending } = UseDeleteBooking();

  if (isLoading) return <p>Loading...</p>;
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
      <div className="flex justify-between border-b bg-white p-6">
        <div>
          <h1 className="text-3xl font-bold">Booking Management</h1>
          <p className="text-sm text-gray-500">
            Monitor and handle student breakout room reservations.
          </p>
        </div>
      </div>

      <div className="p-6">
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
