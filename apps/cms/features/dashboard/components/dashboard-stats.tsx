import { Card, CardContent } from "@/components/ui/card";

interface Props {
  total: number;
  published: number;
  draft: number;
  review: number;
  scheduled: number;
  archived: number;
}

export function DashboardStats({
  total,
  published,
  draft,
  review,
  scheduled,
  archived,
}: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard title="Total Articles" value={total} />
      <StatCard title="Published" value={published} />
      <StatCard title="Draft" value={draft} />
      <StatCard title="Review" value={review} />
      <StatCard title="Scheduled" value={scheduled} />
      <StatCard title="Archived" value={archived} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground text-sm">{title}</p>

        <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
}
