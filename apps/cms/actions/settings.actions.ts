"use server";
import { revalidatePath } from "next/cache";
import { updateSiteSettings } from "@/services/settings.service";
export async function updateSiteSettingsAction(data: {
  siteName: string;
  description: string;
  siteUrl: string;
  language: string;
  timezone: string;
}) {
  const settings = await updateSiteSettings(data);
  revalidatePath("/settings");
  return settings;
}
