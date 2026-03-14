import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@camtech.edu.kh"), {
      message: "Only CamTech email (@camtech.edu.kh) is allowed",
    }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
