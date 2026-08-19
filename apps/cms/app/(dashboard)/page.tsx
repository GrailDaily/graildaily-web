export const dynamic = "force-dynamic";
export const revalidate = 0;

import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import {
  getDashboardStats,
  getViewsLast7Days,
  getTopArticlesByViews,
  getRecentViewActivity,
} from "@/services/dashboard.service";
import { DashboardActions } from "@/features/dashboard/components/dashboard-actions";
import { DashboardChart } from "@/features/dashboard/components/dashboard-chart";
import { RecentArticles } from "@/features/dashboard/components/recent-articles";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { PageHeader } from "@/components/common/page-header";
import { TopArticles } from "@/features/dashboard/components/top-articles";

import { getRecentArticles } from "@/services/article.service";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const viewsLast7Days = await getViewsLast7Days();

  const topArticles = await getTopArticlesByViews(5);

  const recentActivity = await getRecentViewActivity(8);

  const recentArticles = await getRecentArticles({
    page: 1,
    limit: 5,
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Administrator."
      />

      <DashboardStats
        total={stats.total}
        published={stats.published}
        draft={stats.draft}
        review={stats.review}
        scheduled={stats.scheduled}
        archived={stats.archived}
        totalViews={stats.totalViews}
      />

      <DashboardActions />

      <DashboardChart data={viewsLast7Days} />

      <div className="grid gap-8 lg:grid-cols-2">
        <TopArticles articles={topArticles} />

        <RecentActivity activities={recentActivity} />
      </div>

      <RecentArticles articles={recentArticles.articles} />
    </div>
  );
}
