import { PageHeader } from "@/components/common/page-header";

import { ArticleForm } from "@/features/articles/forms/article-form";
import { getMedia } from "@/services/media.service";

export default async function NewArticlePage() {
  const media = await getMedia();

  return (
    <div className="space-y-8">
      <PageHeader
        title="New Article"
        description="Create a new article for GrailDaily."
      />

      <ArticleForm media={media} />
    </div>
  );
}
