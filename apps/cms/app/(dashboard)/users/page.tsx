import { PageHeader } from "@/components/common/page-header";

import { UsersView } from "@/features/users/views/users-view";

import { getUserStats, getUsers } from "@/services/user.service";

import { UserStats } from "@/features/users/components/user-stats";

interface Props {
  searchParams: Promise<{
    search?: string;
    role?: string;
    status?: string;
  }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const params = await searchParams;

  const search = params.search ?? "";
  const role = params.role ?? "all";
  const status = params.status ?? "all";

  const [users, stats] = await Promise.all([
    getUsers({
      search,
      role,
      status,
    }),
    getUserStats(),
  ]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Users"
        description="Manage users and their access to the GrailDaily CMS."
      />
      <UserStats
        total={stats.total}
        active={stats.active}
        inactive={stats.inactive}
        admins={stats.admins}
        editors={stats.editors}
        authors={stats.authors}
      />

      <UsersView users={users} />
    </div>
  );
}
