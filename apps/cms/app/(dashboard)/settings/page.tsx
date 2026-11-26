import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/auth-guard";
import { PageHeader } from "@/components/common/page-header";
import { getSiteSettings } from "@/services/settings.service";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const requestHeaders = await headers();

  const authResult = await requireRole(
    new Request("http://localhost", {
      headers: requestHeaders,
    }),
    ["Admin"],
  );

  if (!authResult.ok) {
    if (authResult.status === 401) {
      redirect("/login");
    }

    notFound();
  }

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
