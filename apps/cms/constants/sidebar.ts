import {
  LayoutDashboard,
  FileText,
  FolderTree,
  Image,
  Users,
  Settings,
} from "lucide-react";

import type { UserRole } from "@/lib/auth-guard";

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Articles",
    href: "/articles",
    icon: FileText,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Categories",
    href: "/categories",
    icon: FolderTree,
    roles: ["Admin", "Editor"],
  },
  {
    title: "Media",
    href: "/media",
    icon: Image,
    roles: ["Admin", "Editor", "Author"],
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    roles: ["Admin"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["Admin"],
  },
] satisfies {
  title: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
}[];
