"use server";

import { updateUser } from "@/services/user.service";

export async function updateUserAction(
  id: string,
  data: {
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Author";
    status: "Active" | "Inactive";
  },
) {
  return updateUser(id, data);
}
