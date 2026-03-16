import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { toast } from "react-hot-toast";
import axios from "axios";

export type RoomPayload = {
  name: string;
  description?: string;
  floor: string;
  capacity: number;
  isAvailable: boolean;
};

export default function UseRoomMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RoomPayload) => {
      const res = await api.post(API_ENDPOINT.ROOM, payload);
      return res.data.data;
    },

    onMutate: () => {
      const toastId = toast.loading("Adding Room...");
      return { toastId };
    },
    onSuccess: ({ toastId }) => {
      toast.dismiss(toastId);
      toast.success("Project added successfully", { id: toastId });
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: (error: unknown, _variables, context) => {
      let message = "Failed to add project";
      if (axios.isAxiosError(error))
        message = error.response?.data?.message || message;
      else if (error instanceof Error) message = error.message;
      if (context?.toastId) toast.dismiss(context.toastId);
      toast.error(message);
    },
  });
}
