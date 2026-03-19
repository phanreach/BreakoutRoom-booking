export const API_ENDPOINT = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",

  ROOM: "/api/rooms",
  DELETE_ROOM: (roomId: number) => `/api/rooms/${roomId}`,
  UPDATE_ROOM: (roomId: number) => `/api/rooms/${roomId}`,
  ROOM_IMAGE: (roomId: number) => `/api/rooms/upload-images/${roomId}`,
  UPDATE_ROOM_IMAGE: (roomId: number) => `/api/rooms/update-images/${roomId}`,
  DELETE_ROOM_IMAGE: (imageId: number) => `/api/rooms/images/${imageId}`,

  BOOKING: "/api/booking",
  BOOKING_DELETE: (Id: number) => `/api/booking/${Id}`,
  BOOKING_UPDATE: (Id: number) => `/api/booking/${Id}`,

  USERS: "/api/users",
  USER: (userId: number) => `/api/users/${userId}`,
};

export type ApiEndpointProps = (typeof API_ENDPOINT)[keyof typeof API_ENDPOINT];
