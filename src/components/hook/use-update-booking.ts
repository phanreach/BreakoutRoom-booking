import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export type UpdateBookingsPayload = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  notes: string;
};

const updateBookings = async ({ id, ...payload }: UpdateBookingsPayload) => {
  const res = await api.put(API_ENDPOINT.BOOKING_UPDATE(id), payload);
  return res.data;
};

export default function UseUpdateBookings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBookings,
    onMutate: () => {
      const toastId = toast.loading("Updating booking...");
      return { toastId };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success("Booking updated successfully 🎉", {
        id: context?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },

    onError: (error: any, _variables, context) => {
      toast.error(
        error?.response?.data?.message || "Failed to update bookings",
        {
          id: context?.toastId,
        },
      );
    },
  });
}
