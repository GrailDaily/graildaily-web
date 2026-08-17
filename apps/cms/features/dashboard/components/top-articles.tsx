import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  views: number;
}

interface Props {
  articles: TopArticle[];
}

export function TopArticles({ articles }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Articles by Views</CardTitle>

        <Link
          href="/articles"
          className="text-primary text-sm font-medium hover:underline"
        >
          View All
        </Link>
      </CardHeader>

      <CardContent>
        {articles.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            No published articles yet.
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <div className="text-muted-foreground w-8 text-center text-lg font-semibold">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/articles/${article.id}/edit`}
                    className="block truncate font-medium hover:underline"
                  >
                    {article.title}
                  </Link>

                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{article.category}</Badge>

                    <span className="text-muted-foreground text-xs">
                      {article.views} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
