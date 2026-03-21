import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import api from "../../api/api";
import { API_ENDPOINT } from "../../api/endpoint";

export type CreateUserPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "ADMIN" | "USER";
  enabled: boolean;
};

export default function useUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateUserPayload) => {
      const res = await api.post(API_ENDPOINT.USERS, payload);
      return res.data.data ?? res.data;
    },
    onMutate: () => {
      toast.loading("Creating user...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to create user";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
}
