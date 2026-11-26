"use server";

import { revalidatePath } from "next/cache";
import { requireActionRole } from "@/lib/auth-guard";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categories.service";
import {
  categoryIdSchema,
  categorySchema,
  updateCategorySchema,
} from "@/features/categories/validation/category-schema";

export async function createCategoryAction(data: {
  name: string;
  slug: string;
  description: string;
  image?: string;
}) {
  await requireActionRole(["Admin", "Editor"]);

  const validation = categorySchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid category data.");
  }

  const category = await createCategory(validation.data);

  revalidatePath("/categories");
  revalidatePath("/articles");

  return category;
}

export async function updateCategoryAction(
  id: string,
  data: {
    name: string;
    slug: string;
    description: string;
    image?: string;
    status: "Active" | "Inactive";
  },
) {
  await requireActionRole(["Admin", "Editor"]);

  const validatedId = categoryIdSchema.parse(id);
  const validation = updateCategorySchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid category data.");
  }

  const category = await updateCategory(validatedId, validation.data);

  revalidatePath("/categories");
  revalidatePath("/articles");

  return category;
}

export async function deleteCategoryAction(id: string) {
  await requireActionRole(["Admin", "Editor"]);

  const validatedId = categoryIdSchema.parse(id);
  const category = await deleteCategory(validatedId);

  revalidatePath("/categories");
  revalidatePath("/articles");

  return category;
}
