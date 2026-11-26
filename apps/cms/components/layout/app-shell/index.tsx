"use client";

import type { UserRole } from "@/lib/auth-guard";
import { RoleContext } from "./role-context";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "../app-header";
import { AppSidebar } from "../app-sidebar";

interface Props {
  children: React.ReactNode;
  role: UserRole;
}

export function AppShell({ children, role }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar role={role} />

      <SidebarInset>
        <AppHeader />

        <RoleContext.Provider value={role}>
          <main className="min-w-0 flex-1 p-6">{children}</main>
        </RoleContext.Provider>
      </SidebarInset>
    </SidebarProvider>
  );
}

