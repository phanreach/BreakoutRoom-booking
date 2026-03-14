export const API_ENDPOINT = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  ROOM: "/api/rooms",
};

export type ApiEndpointProps = (typeof API_ENDPOINT)[keyof typeof API_ENDPOINT];
