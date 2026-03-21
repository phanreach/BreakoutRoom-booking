import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .refine((email) => email.endsWith("@camtech.edu.kh"), {
      message: "Only CamTech email (@camtech.edu.kh) is allowed",
    }),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters")
    .optional()
    .or(z.literal("")),
  role: z.enum(["ADMIN", "USER"]),
  enabled: z.boolean(),
});

export const createUserSchema = userSchema.refine(
  (data) => Boolean(data.password && data.password.trim()),
  {
    message: "Password is required",
    path: ["password"],
  },
);

export type UserSchema = z.infer<typeof userSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
