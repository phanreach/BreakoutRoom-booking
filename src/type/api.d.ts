export type User = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: "ADMIN" | "USER";
  enabled: boolean;
};

export type RoomImage = {
  id: number;
  image_url: string[];
};

export type Room = {
  id: number;
  name: string;
  capacity: number;
  floor: string;
  isAvailable: boolean;
  images: string[];
  description: string;
};

export type Booking = {
  id: number;
  roomId?: number;
  room?: {
    id: number;
    name: string;
    images?: {
      id: number;
      imageUrl: string;
    }[];
  };
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  notes: string;
  userId: number | null;
  userName: string | null;
};
