import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { API_ENDPOINT } from "../../api/endpoint";
import { toast } from "sonner";
import axios from "axios";

const deleteRoom = async (roomId: number) => {
  const res = await api.delete(API_ENDPOINT.DELETE_ROOM(roomId));
  return res.data;
};

export default function UseDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoom,

    onMutate: () => {
      toast.loading("Deleting room...");
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success("Room deleted successfully");
    },

    onError: (error: unknown) => {
      let message = "Delete failed";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
}
