"use server";

import { requireActionRole } from "@/lib/auth-guard";
import { updateUser } from "@/services/user.service";
import {
  userIdSchema,
  userSchema,
} from "@/features/users/validation/user-schema";

export async function updateUserAction(
  id: string,
  data: {
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Author";
    status: "Active" | "Inactive";
  },
) {
  await requireActionRole(["Admin"]);

  const validatedId = userIdSchema.parse(id);
  const validation = userSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid user data.");
  }

  return updateUser(validatedId, validation.data);
}
