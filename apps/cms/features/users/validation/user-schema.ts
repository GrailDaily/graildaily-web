import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  email: z.string().email("Please enter a valid email address"),

  role: z.enum(["Admin", "Editor", "Author"]),

  status: z.enum(["Active", "Inactive"]),
});

export type UserSchema = z.infer<typeof userSchema>;
