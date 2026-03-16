import { useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import toast from "react-hot-toast";
import axios from "axios";

export type ImagePayload = {
  roomId: number;
  images: File;
};

export default function UseRoomImageMutation() {
  return useMutation({
    mutationFn: async (payload: ImagePayload) => {
      const formData = new FormData();
      formData.append("roomId", String(payload.roomId));
      formData.append("images", payload.images);

      const res = await api.post(
        API_ENDPOINT.ROOM_IMAGE(payload.roomId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      return res.data;
    },
    onMutate: () => {
      const toastId = toast.loading("Uploading logo...");
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context?.toastId);
      toast.success("Project updated successfully", { id: context?.toastId });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: unknown, _variables, context) => {
      let message = "Logo upload failed";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error(message, { id: context?.toastId });
    },
  });
}
