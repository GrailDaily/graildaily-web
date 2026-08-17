import {
  Archive,
  FileText,
  Eye,
  FileCheck,
  FileClock,
  FileEdit,
  ClipboardList,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  published: number;
  draft: number;
  review: number;
  scheduled: number;
  archived: number;
  totalViews: number;
}

export function DashboardStats({
  total,
  published,
  draft,
  review,
  scheduled,
  archived,
  totalViews,
}: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Articles"
        value={total}
        icon={FileText}
      />

      <StatCard
        title="Published"
        value={published}
        icon={FileCheck}
      />

      <StatCard
        title="Total Views"
        value={totalViews}
        icon={Eye}
        featured
      />

      <StatCard
        title="Draft"
        value={draft}
        icon={FileEdit}
      />

      <StatCard
        title="Review"
        value={review}
        icon={ClipboardList}
      />

      <StatCard
        title="Scheduled"
        value={scheduled}
        icon={FileClock}
      />

      <StatCard
        title="Archived"
        value={archived}
        icon={Archive}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  featured?: boolean;
}

function StatCard({
  title,
  value,
  icon: Icon,
  featured = false,
}: StatCardProps) {
  return (
    <Card
      className={
        featured
          ? "border-primary/30 ring-primary/10 ring-1"
          : undefined
      }
    >
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
