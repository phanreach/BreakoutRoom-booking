import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, { type AxiosRequestConfig } from "axios";

const deleteBooking = async (id: number) => {
  const res = await api.delete(API_ENDPOINT.BOOKING_DELETE(id), {
    skipErrorToast: true,
  } as AxiosRequestConfig & { skipErrorToast: boolean });
  return res.data;
};

export default function UseDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBooking,

    onMutate: () => {
      const toastId = toast.loading("Deleting booking...");
      return { toastId };
    },

    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast.success("Booking deleted successfully", { id: context?.toastId });
    },

    onError: (error: unknown, _variables, context) => {
      let message = "Delete failed";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message, { id: context?.toastId });
    },
  });
}
