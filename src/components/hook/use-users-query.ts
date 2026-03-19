import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import type { User } from "../../type/api";

export default function useUsersQuery() {
  const apiFn = async (): Promise<User[]> => {
    const res = await api.get(API_ENDPOINT.USERS);
    // Some APIs wrap results in a 'data' or 'content' field.
    return res.data.data ?? res.data.content ?? res.data;
  };

  return useQuery({
    queryKey: ["users"],
    queryFn: apiFn,
    // keep data cached for a short time to avoid refetching too often
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
