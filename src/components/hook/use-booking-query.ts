import { API_ENDPOINT } from "../../api/endpoint";
import type { Booking } from "../../type/api";
import api from "../../api/api";
import { useQuery } from "@tanstack/react-query";

export default function UseBookingQuery() {
  const apiFn = async (): Promise<Booking[]> => {
    const res = await api.get(API_ENDPOINT.BOOKING);
    return res.data.data;
  };

  return useQuery({
    queryKey: ["booking"],
    queryFn: apiFn,
  });
}
