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
