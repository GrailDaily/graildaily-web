import { ShieldCheck, Users, UserCheck, UserX } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  editors: number;
  authors: number;
}

export function UserStats({
  total,
  active,
  inactive,
  admins,
  editors,
  authors,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatCard title="Total Users" value={total} icon={Users} />

      <StatCard title="Active" value={active} icon={UserCheck} />

      <StatCard title="Inactive" value={inactive} icon={UserX} />

      <StatCard title="Administrators" value={admins} icon={ShieldCheck} />

      <StatCard title="Editors" value={editors} icon={Users} />

      <StatCard title="Authors" value={authors} icon={Users} />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-muted-foreground text-sm">{title}</p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight">
            {value.toLocaleString()}
          </h2>
        </div>

        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
          <Icon className="text-muted-foreground h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
