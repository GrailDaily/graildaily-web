import { z } from "zod";

export const articleSlugSchema = z
  .string()
  .trim()
  .min(3, "Slug must contain at least 3 characters")
  .max(200, "Slug must not exceed 200 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug may only contain lowercase letters, numbers, and hyphens",
  );

const scheduledAtSchema = z.string().nullable().refine((value) => {
  if (value === null) {
    return true;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const [, year, month, day, hour, minute] = match;

  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  const h = Number(hour);
  const min = Number(minute);

  if (y < 1000 || m < 1 || m > 12) {
    return false;
  }

  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();

  return (
    d >= 1 &&
    d <= daysInMonth &&
    h >= 0 &&
    h <= 23 &&
    min >= 0 &&
    min <= 59
  );
}, "Scheduled date and time must be valid.");
export const articleSchema = z.object({
  title: z.string().trim().min(5, "Title must contain at least 5 characters").max(200),

  slug: articleSlugSchema,

  excerpt: z
    .string()
    .trim()
    .min(20, "Excerpt must contain at least 20 characters")
    .max(500, "Excerpt must not exceed 500 characters"),

  content: z
    .string()
    .min(100, "Content is too short")
    .max(200_000, "Content must not exceed 200,000 characters"),

  category: z.string().trim().min(1, "Please choose a category"),

  author: z.string().trim().min(2, "Author is required"),

  status: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived"]),

  scheduledAt: scheduledAtSchema.optional(),

  showInHero: z.boolean(),

  showInEditorsPicks: z.boolean(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;

export const articleActionSchema = articleSchema.extend({
  scheduledAt: scheduledAtSchema,

  featuredImage: z.string().trim().max(2048).nullable(),
}).superRefine((data, ctx) => {
  if (data.status === "Scheduled" && data.scheduledAt === null) {
    ctx.addIssue({
      code: "custom",
      path: ["scheduledAt"],
      message: "A scheduled date and time are required.",
    });
  }
});

export const articleIdSchema = z
  .string()
  .trim()
  .min(1, "Article ID is required")
  .max(191, "Invalid article ID");

export const articleIdsSchema = z
  .array(articleIdSchema)
  .min(1, "Select at least one article")
  .max(500, "Too many articles selected")
  .refine(
    (ids) => new Set(ids).size === ids.length,
    "Duplicate article IDs are not allowed",
  );

export const articleStatusSchema = z.enum([
  "Draft",
  "Review",
  "Scheduled",
  "Published",
  "Archived",
]);
