import { AppShell } from "@/components/layout/app-shell";
import { requireActiveUser } from "@/lib/auth-guard";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();

  const authResult = await requireActiveUser(
    new Request("http://localhost", {
      headers: requestHeaders,
    }),
  );

  if (!authResult.ok) {
    redirect("/login");
  }

  return <AppShell role={authResult.user.role}>{children}</AppShell>;
}
