import { PageHeader } from "@/components/common/page-header";
import { getSiteSettings } from "@/services/settings.service";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        description="Manage your GrailDaily CMS configuration."
      />

      <SettingsForm settings={settings} />
    </div>
  );
}
