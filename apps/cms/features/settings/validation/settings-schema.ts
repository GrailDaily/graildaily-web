import { z } from "zod";

export const siteSettingsSchema = z.object({
  siteName: z
    .string()
    .trim()
    .min(1, "Site name is required")
    .max(120, "Site name is too long"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description is too long"),

  siteUrl: z
    .string()
    .trim()
    .url("Invalid site URL")
    .max(2048, "Site URL is too long")
    .refine(
      (value) => /^https?:\/\//i.test(value),
      "Site URL must use HTTP or HTTPS",
    ),

  language: z
    .string()
    .trim()
    .min(1, "Language is required")
    .max(50, "Language is too long"),

  timezone: z
    .string()
    .trim()
    .min(1, "Timezone is required")
    .max(100, "Timezone is too long")
    .refine(
      (value) => {
        try {
          new Intl.DateTimeFormat("en-US", { timeZone: value });
          return true;
        } catch {
          return false;
        }
      },
      "Invalid timezone",
    ),
});

export type SiteSettingsSchema = z.infer<typeof siteSettingsSchema>;
