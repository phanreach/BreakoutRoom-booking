import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import api from "../../api/api";
import { API_ENDPOINT } from "../../api/endpoint";

export default function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const res = await api.delete(API_ENDPOINT.USER(userId));
      return res.data.data ?? res.data;
    },
    onMutate: () => {
      toast.loading("Deleting user...");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error: unknown) => {
      let message = "Failed to delete user";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      toast.error(message);
    },
  });
}
