import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import toast from "react-hot-toast";
import axios, { type AxiosRequestConfig } from "axios";

export type BookingPayload = {
  roomId: number;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  notes: string;
};

export default function UseBookingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: BookingPayload) => {
      const res = await api.post(API_ENDPOINT.BOOKING, payload, {
        skipErrorToast: true,
      } as AxiosRequestConfig & { skipErrorToast: boolean });
      return res.data.data;
    },

    onMutate: () => {
      const toastId = toast.loading("Creating booking...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success("Booking created successfully", { id: context?.toastId });
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (error: unknown, _variables, context) => {
      let message = "Failed to create booking";
      if (axios.isAxiosError(error))
        message = error.response?.data?.message || message;
      else if (error instanceof Error) message = error.message;
      toast.error(message, { id: context?.toastId });
    },
  });
}
