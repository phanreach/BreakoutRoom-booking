import type { Room } from "../../type/api";
import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

export default function useRoomQuery() {
  const apiFn = async (): Promise<Room[]> => {
    const res = await api.get(API_ENDPOINT.ROOM);
    return res.data.content;
  };

  return useQuery({
    queryKey: ["rooms"],
    queryFn: apiFn,
  });
}
