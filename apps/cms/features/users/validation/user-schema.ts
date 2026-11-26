import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),

  role: z.enum(["Admin", "Editor", "Author"]),

  status: z.enum(["Active", "Inactive"]),
});

export const userIdSchema = z
  .string()
  .trim()
  .min(1, "User ID is required")
  .max(191, "Invalid user ID");

export type UserSchema = z.infer<typeof userSchema>;
