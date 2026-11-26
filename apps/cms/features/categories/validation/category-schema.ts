import { z } from "zod";

const categoryImageSchema = z
  .string()
  .trim()
  .max(2048, "Image path or URL is too long")
  .refine(
    (value) =>
      value === "" ||
      (value.startsWith("/") && !value.startsWith("//")) ||
      /^https:\/\/\S+$/i.test(value),
    "Image must be an HTTPS URL or a local path",
  )
  .transform((value) => value || undefined);

export const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required").max(100),
  slug: z
    .string()
    .trim()
    .min(1, "Category slug is required")
    .max(120)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug may only contain lowercase letters, numbers, and hyphens",
    ),
  description: z
    .string()
    .trim()
    .min(1, "Category description is required")
    .max(1000),
  image: categoryImageSchema,
});

export const updateCategorySchema = categorySchema.extend({
  status: z.enum(["Active", "Inactive"]),
});

export const categoryIdSchema = z
  .string()
  .trim()
  .min(1, "Category ID is required")
  .max(191, "Invalid category ID");

export type CategorySchema = z.infer<typeof categorySchema>;
export type UpdateCategorySchema = z.infer<typeof updateCategorySchema>;
