import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { requireActiveUser } from "@/lib/auth-guard";
import { PageHeader } from "@/components/common/page-header";

import { ArticleForm } from "@/features/articles/forms/article-form";
import { getMedia } from "@/services/media.service";
import { getCategories } from "@/services/categories.service";

export default async function NewArticlePage() {
  const requestHeaders = await headers();

  const authResult = await requireActiveUser(
    new Request("http://localhost", {
      headers: requestHeaders,
    }),
  );

  if (!authResult.ok) {
    redirect("/login");
  }

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

      <ArticleForm role={authResult.user.role} media={media} categories={activeCategories} />
    </div>
  );
}
