"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { sidebarItems } from "@/constants/sidebar";
import type { UserRole } from "@/lib/auth-guard";

interface Props {
  role: UserRole;
}

export function AppSidebar({ role }: Props) {
  const pathname = usePathname();

  const visibleItems = sidebarItems.filter((item) => item.roles.includes(role));

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="px-3 py-4">
          <h2 className="text-lg font-bold">GrailDaily CMS</h2>

          <p className="text-muted-foreground text-xs">Editorial Platform</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarMenu>
            {visibleItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={pathname === item.href}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="text-muted-foreground p-3 text-xs">GrailDaily v1.0</div>
      </SidebarFooter>
    </Sidebar>
  );
}
