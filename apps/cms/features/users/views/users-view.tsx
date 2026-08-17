"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { UsersToolbar } from "../components/users-toolbar";
import { UsersTable } from "../components/users-table";

import type { CmsUser } from "@/services/user.service";

interface Props {
  users: CmsUser[];
}

export function UsersView({ users }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role") ?? "all";
  const status = searchParams.get("status") ?? "all";

  const updateFilters = (
    nextSearch: string,
    nextRole: string,
    nextStatus: string,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSearch) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }

    if (nextRole !== "all") {
      params.set("role", nextRole);
    } else {
      params.delete("role");
    }

    if (nextStatus !== "all") {
      params.set("status", nextStatus);
    } else {
      params.delete("status");
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="space-y-6">
      <UsersToolbar
        search={search}
        role={role}
        status={status}
        onSearchChange={(value) => updateFilters(value, role, status)}
        onRoleChange={(value) => updateFilters(search, value, status)}
        onStatusChange={(value) => updateFilters(search, role, value)}
      />

      <Card>
        <CardContent className="p-0">
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
