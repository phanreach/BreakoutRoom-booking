import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@camtech.edu.kh"), {
      message: "Only CamTech email (@camtech.edu.kh) is allowed",
    }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
