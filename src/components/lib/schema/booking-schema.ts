import { z } from "zod";

export const bookingSchema = z.object({
  date: z.string().min(1, "Date is required"),

  startTime: z.string().min(1, "Start time is required"),

  endTime: z.string().min(1, "End time is required"),

  participants: z.string().min(1, "At least 1 participant required"),

  notes: z.string().optional(),
});
