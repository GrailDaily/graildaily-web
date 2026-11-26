"use server";

import { revalidatePath } from "next/cache";
import { requireActionRole } from "@/lib/auth-guard";
import { updateSiteSettings } from "@/services/settings.service";
import { siteSettingsSchema } from "@/features/settings/validation/settings-schema";

export async function updateSiteSettingsAction(data: {
  siteName: string;
  description: string;
  siteUrl: string;
  language: string;
  timezone: string;
}) {
  await requireActionRole(["Admin"]);

  const validation = siteSettingsSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid settings data.");
  }

  const settings = await updateSiteSettings(validation.data);

  revalidatePath("/settings");
  return settings;
}
