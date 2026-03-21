import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { API_ENDPOINT } from "./endpoint";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

if (!VITE_BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined in environment variables.");
}

const api = axios.create({
  baseURL: VITE_BASE_URL,
  withCredentials: true,
});

type RequestWithToastControl = {
  skipErrorToast?: boolean;
};

const getErrorMessage = (error: AxiosError) => {
  const data = error.response?.data as
    | {
        message?: string;
        error?: string;
        errors?: Array<{ message?: string }> | Record<string, string[] | string>;
      }
    | undefined;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  if (Array.isArray(data?.errors)) {
    const firstMessage = data.errors.find((item) => item?.message)?.message;
    if (firstMessage) return firstMessage;
  }

  if (data?.errors && typeof data.errors === "object") {
    const firstError = Object.values(data.errors).flat()[0];
    if (typeof firstError === "string" && firstError.trim()) {
      return firstError;
    }
  }

  return "Something went wrong!";
};

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  const url = config.url?.toLowerCase() || "";
  const publicEndpoints = ["/login", "/register"];

  const isPublic = publicEndpoints.some((path) => url.includes(path));

  if (!isPublic && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const requestConfig = error.config as (typeof error.config &
      RequestWithToastControl) | null;

    if (!requestConfig?.skipErrorToast) {
      toast.error(getErrorMessage(error));
    }

    return Promise.reject(error);
  },
);

export const loginApi = (username: string, password: string) =>
  api.post(API_ENDPOINT.LOGIN, { username, password });

// export const meApi = () => api.get(API_ENDPOINT.PROFILE);

export const refreshToken = async (): Promise<string | null> => {
  try {
    const storedRefreshToken = Cookies.get("refreshToken");
    if (!storedRefreshToken) return null;

    const response = await axios.post(`${VITE_BASE_URL}/auth/refresh`, {
      refreshToken: storedRefreshToken,
    });

    const newAccessToken =
      response.data?.accessToken ?? response.data?.data?.accessToken;
    const newRefreshToken =
      response.data?.refreshToken ?? response.data?.data?.refreshToken;

    if (newAccessToken) {
      Cookies.set("token", newAccessToken);
      if (newRefreshToken) {
        Cookies.set("refreshToken", newRefreshToken);
      }
      return newAccessToken;
    }

    return null;
  } catch (err) {
    console.error("Failed to refresh token", err);
    return null;
  }
};

// export const logoutApi = () =>
//   api.post<{ message: string }>(API_ENDPOINT.LOGOUT);

export default api;
