import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { API_ENDPOINT } from "../../api/endpoint";
import api from "../../api/api";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  token: string;
  refreshToken: string;
};

export type LoginApiResponse = {
  success: boolean;
  code: string;
  status: number;
  message: string;
  data: LoginResponse;
};

export default function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const res = await api.post<LoginResponse>(API_ENDPOINT.LOGIN, payload);
      return res.data;
    },
    onSuccess: (data: LoginResponse) => {
      console.log("LOGIN SUCCESS", data);

      Cookies.set("token", data.token);
      Cookies.set("refreshToken", data.refreshToken);
      Cookies.set("role", data.role);
      Cookies.set("fullName", data.fullName);
      Cookies.set("email", data.email);
      Cookies.set("phone", data.phone);

      toast.success("Login successful!");

      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { message?: string })?.message ||
          "Login failed!";

        console.error("Login error:", message);
        toast.error(message);
      }
    },
  });
}
