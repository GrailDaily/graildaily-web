import { PageHeader } from "@/components/common/page-header";

import { ArticleForm } from "@/features/articles/forms/article-form";
import { getMedia } from "@/services/media.service";
import { getCategories } from "@/services/categories.service";

export default async function NewArticlePage() {
  const [media, categories] = await Promise.all([getMedia(), getCategories()]);

  const activeCategories = categories.filter(
    (category) => category.status === "Active",
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="New Article"
        description="Create a new article for GrailDaily."
      />

      <ArticleForm media={media} categories={activeCategories} />
    </div>
  );
}
