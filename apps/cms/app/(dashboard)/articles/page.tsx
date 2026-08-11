import Link from "next/link";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";

import { ArticlesView } from "@/features/articles/views/articles-view";

import { getRecentArticles } from "@/services/article.service";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    category?: string;
  }>;
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const search = params.search ?? "";
  const status = params.status ?? "all";
  const category = params.category ?? "all";

  const result = await getRecentArticles({
    page,
    search,
    status,
    category,
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Articles"
        description="Manage all published, draft, and scheduled articles."
        action={
          <Link href="/articles/new">
            <Button>New Article</Button>
          </Link>
        }
      />

      <ArticlesView
        articles={result.articles}
        page={result.page}
        totalPages={result.totalPages}
      />
    </div>
  );
}
