"use server";
import { revalidatePath } from "next/cache";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/services/categories.service";
export async function createCategoryAction(data: {
  name: string;
  slug: string;
  description: string;
  image?: string;
}) {
  const category = await createCategory(data);
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
  const category = await updateCategory(id, data);
  revalidatePath("/categories");
  revalidatePath("/articles");
  return category;
}
export async function deleteCategoryAction(id: string) {
  const category = await deleteCategory(id);
  revalidatePath("/categories");
  revalidatePath("/articles");
  return category;
}
