import { getCmsArticles } from "@/lib/cms";
import type { CmsArticle } from "@/lib/cms";

export interface CmsTag {
  tag: string;
  tagName: string;
  count: number;
}

export async function getCmsTags(): Promise<CmsTag[]> {
  const articles = await getCmsArticles();

  const publishedArticles = articles.filter(
    article => article.status === "Published"
  );

  const tagMap = new Map<string, CmsTag>();

  for (const article of publishedArticles) {
    const tagName = article.category.trim();

    if (!tagName) continue;

    const tag = tagName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!tag) continue;

    const existing = tagMap.get(tag);

    if (existing) {
      existing.count += 1;
    } else {
      tagMap.set(tag, {
        tag,
        tagName,
        count: 1,
      });
    }
  }

  return Array.from(tagMap.values()).sort((a, b) =>
    a.tagName.localeCompare(b.tagName)
  );
}

export async function getCmsArticlesByTag(
  tag: string
): Promise<CmsArticle[]> {
  const articles = await getCmsArticles();

  const normalizedTag = decodeURIComponent(tag)
    .toLowerCase()
    .trim();

  return articles
    .filter(article => article.status === "Published")
    .filter(article => {
      const articleTag = article.category
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      return articleTag === normalizedTag;
    })
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
      const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();

      return dateB - dateA;
    });
}
