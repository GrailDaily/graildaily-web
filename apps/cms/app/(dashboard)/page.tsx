import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { getDashboardStats } from "@/services/dashboard.service";
import { DashboardActions } from "@/features/dashboard/components/dashboard-actions";
import { RecentArticles } from "@/features/dashboard/components/recent-articles";
import { PageHeader } from "@/components/common/page-header";

import { getRecentArticles } from "@/services/article.service";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const recentArticles = await getRecentArticles({
    page: 1,
    limit: 5,
  });

  return (
    <div className="space-y-8">
      <div>
        <PageHeader
          title="Dashboard"
          description="Welcome back, Administrator."
        />
      </div>

      <DashboardStats
        total={stats.total}
        published={stats.published}
        draft={stats.draft}
        review={stats.review}
        scheduled={stats.scheduled}
        archived={stats.archived}
      />

      <DashboardActions />

      <RecentArticles articles={recentArticles.articles} />
    </div>
  );
}
