import { z } from "zod";

export const roomSchema = z.object({
  name: z.string().min(1, "Please enter room name"),
  description: z.string().optional(),
  floor: z.string().min(1, "Please enter floor number"),
  capacity: z.number().min(1, "Please enter capacity"),
  isAvailable: z.boolean().optional(),
});

export type RoomSchema = z.infer<typeof roomSchema>;
