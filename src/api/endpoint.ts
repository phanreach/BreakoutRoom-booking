export const API_ENDPOINT = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  ROOM: "/api/rooms",
  DELETE_ROOM: (roomId: number) => `/api/rooms/${roomId}`,
  UPDATE_ROOM: (roomId: number) => `/api/rooms/${roomId}`,
  ROOM_IMAGE: (roomId: number) => `/api/rooms/upload-images/${roomId}`,
};

export type ApiEndpointProps = (typeof API_ENDPOINT)[keyof typeof API_ENDPOINT];
