import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import axios from "axios";
import { toast } from "sonner";
import { API_ENDPOINT } from "../../api/endpoint";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export type SignUpPayload = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

export type RegisterResponse = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  token: string;
};

export type SignUpApiResponse = RegisterResponse;

export default function useSignUp() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: SignUpPayload) => {
      console.log("Signup payload:", payload);
      const res = await api.post<SignUpApiResponse>(
        API_ENDPOINT.REGISTER,
        payload,
      );
      console.log("Signup response:", res);

      return res.data;
    },
    onSuccess: (data: SignUpApiResponse) => {
      console.log("SIGNUP SUCCESS", data);

      Cookies.set("token", data.token);
      Cookies.set("role", data.role);
      Cookies.set("fullName", data.fullName);
      Cookies.set("email", data.email);
      Cookies.set("phone", data.phone);

      toast.success("Register successful!");

      if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    },
    onError: (error: unknown) => {
      console.error("Signup error:", error);
      let message = "Failed to signup";
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response);
        message = error.response?.data?.message || message;
      } else if (error instanceof Error) message = error.message;

      toast.error(message);
    },
  });
}
