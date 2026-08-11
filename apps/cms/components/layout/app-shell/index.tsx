"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppHeader } from "../app-header";
import { AppSidebar } from "../app-sidebar";

interface Props {
  children: React.ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <AppHeader />

        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
