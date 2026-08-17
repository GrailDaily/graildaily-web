"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Activity {
  id: string;
  viewedAt: Date;
  article: {
    id: string;
    title: string;
    slug: string;
  };
}

interface Props {
  activities: Activity[];
}

function formatRelativeTime(date: Date) {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - new Date(date).getTime());

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";

  return `${days}d ago`;
}

export function RecentActivity({ activities }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Activity</CardTitle>

        <Eye className="text-muted-foreground h-5 w-5" />
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="text-muted-foreground py-6 text-center text-sm">
            No recent activity.
          </div>
        ) : (
          <div className="divide-y">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
                  <Eye className="text-muted-foreground h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/articles/${activity.article.id}/edit`}
                    className="block truncate text-sm font-medium hover:underline"
                  >
                    {activity.article.title}
                  </Link>

                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Article viewed
                  </p>
                </div>

                <span className="text-muted-foreground shrink-0 text-xs">
                  {formatRelativeTime(activity.viewedAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
