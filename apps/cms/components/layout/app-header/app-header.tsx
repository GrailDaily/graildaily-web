"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="bg-background flex h-16 items-center border-b px-6">
      <SidebarTrigger />

      <div className="ml-4">
        <h1 className="font-semibold">Dashboard</h1>
      </div>
    </header>
  );
}
