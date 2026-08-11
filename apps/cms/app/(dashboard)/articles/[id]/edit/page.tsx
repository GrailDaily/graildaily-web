import { notFound } from "next/navigation";

import { PageHeader } from "@/components/common/page-header";
import { ArticleForm } from "@/features/articles/forms/article-form";
import { getMedia } from "@/services/media.service";
import { getArticleById } from "@/services/article.service";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;

  const article = await getArticleById(id);
  const media = await getMedia();

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Article"
        description="Update an existing article."
      />

      <ArticleForm article={article} media={media} />
    </div>
  );
}
