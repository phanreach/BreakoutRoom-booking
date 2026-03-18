import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export type UpdateRoomImagePayload = {
  roomId: number;
  files: File[];
};

const updateRoomImage = async ({ roomId, files }: UpdateRoomImagePayload) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file)); // 'images' key should match backend
  const res = await api.put(API_ENDPOINT.UPDATE_ROOM_IMAGE(roomId), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export default function UseUpdateRoomImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoomImage,
    onMutate: () => {
      const toastId = toast.loading("Updating room images...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.success("Room images updated successfully 🎉", {
        id: context?.toastId,
      });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error: any, _variables, context) => {
      toast.error(error?.response?.data?.message || "Failed to update images", {
        id: context?.toastId,
      });
    },
  });
}
