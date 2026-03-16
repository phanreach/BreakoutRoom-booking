import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export type UpdateRoomPayload = {
  roomId: number;
  name: string;
  description: string;
  capacity: number;
  floor: string;
  isAvailable: boolean;
};

const updateRoom = async ({ roomId, ...payload }: UpdateRoomPayload) => {
  const res = await api.put(API_ENDPOINT.UPDATE_ROOM(roomId), payload);
  return res.data;
};

export default function UseUpdateRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoom,
    onMutate: () => {
      const toastId = toast.loading("Updating room...");
      return { toastId };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success("Room updated successfully 🎉", {
        id: context?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },

    onError: (error: any, _variables, context) => {
      toast.error(error?.response?.data?.message || "Failed to update room", {
        id: context?.toastId,
      });
    },
  });
}
