import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";
import api from "../../api/api";
import { API_ENDPOINT } from "../../api/endpoint";

export type UpdateUserPayload = {
  userId: number;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  role: "ADMIN" | "USER";
  enabled: boolean;
};

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, ...payload }: UpdateUserPayload) => {
      const res = await api.put(API_ENDPOINT.USER(userId), payload);
      return res.data.data ?? res.data;
    },
    onMutate: () => {
      toast.loading("Updating user...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to update user";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
}
