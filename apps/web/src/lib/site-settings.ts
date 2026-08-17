export interface SiteSettings {
  siteName: string;
  description: string;
  siteUrl: string;
  language: string;
  timezone: string;
}
const CMS_API_URL = import.meta.env.CMS_API_URL ?? "http://localhost:3000";
const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "GrailDaily",
  description:
    "Discover stories about history, science, mysteries, culture, and the world around us.",
  siteUrl: "https://graildaily.com",
  language: "English",
  timezone: "Asia/Jakarta",
};
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const response = await fetch(`${CMS_API_URL}/api/settings`);
    if (!response.ok) {
      throw new Error(`Failed to fetch site settings: ${response.status}`);
    }
    return (await response.json()) as SiteSettings;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
    return DEFAULT_SETTINGS;
  }
}
