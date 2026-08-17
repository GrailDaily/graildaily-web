import { notFound } from "next/navigation";
import { getCategories } from "@/services/categories.service";
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

  if (!article) {
    notFound();
  }

  const [media, categories] = await Promise.all([getMedia(), getCategories()]);

  const activeCategories = categories.filter(
    (category) => category.status === "Active",
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Article"
        description="Update an existing article."
      />

      <ArticleForm
        article={article}
        media={media}
        categories={activeCategories}
      />
    </div>
  );
}
