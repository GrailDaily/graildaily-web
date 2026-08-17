import { prisma } from "@/lib/prisma";
const DEFAULT_SETTINGS = {
  siteName: "GrailDaily",
  description:
    "Discover stories about history, science, mysteries, culture, and the world around us.",
  siteUrl: "https://graildaily.com",
  language: "English",
  timezone: "Asia/Jakarta",
};
export async function getSiteSettings() {
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: DEFAULT_SETTINGS });
  }
  return settings;
}
export async function updateSiteSettings(data: {
  siteName: string;
  description: string;
  siteUrl: string;
  language: string;
  timezone: string;
}) {
  const existing = await prisma.siteSettings.findFirst();
  if (!existing) {
    return prisma.siteSettings.create({ data });
  }
  return prisma.siteSettings.update({ where: { id: existing.id }, data });
}
