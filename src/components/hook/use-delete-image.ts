import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import { API_ENDPOINT } from "../../api/endpoint";
import { toast } from "sonner";
import axios from "axios";

export type DeleteImagePayload = {
  imageId: number;
};

const deleteImage = async ({ imageId }: DeleteImagePayload) => {
  const res = await api.delete(API_ENDPOINT.DELETE_ROOM_IMAGE(imageId));
  return res.data;
};

export default function UseDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImage,

    onMutate: () => {
      const toastId = toast.loading("Deleting image...");
      return { toastId };
    },

    onSuccess: (_data, _variables, context) => {
      toast.success("Image deleted", { id: context?.toastId });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },

    onError: (error: unknown, _variables, context) => {
      let message = "Failed to delete image";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message, { id: context?.toastId });
    },
  });
}
