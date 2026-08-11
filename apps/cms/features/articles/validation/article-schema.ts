import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5, "Title must contain at least 5 characters").max(200),

  slug: z.string().min(3, "Slug is required"),

  excerpt: z.string().min(20, "Excerpt must contain at least 20 characters"),

  content: z.string().min(100, "Content is too short"),

  category: z.string().min(1, "Please choose a category"),

  author: z.string().min(2, "Author is required"),

  status: z.enum(["Draft", "Review", "Scheduled", "Published", "Archived"]),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
