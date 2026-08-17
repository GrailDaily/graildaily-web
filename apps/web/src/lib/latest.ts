import { getCmsArticles, type CmsArticle } from "@/lib/cms";

export interface LatestArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  href: string;
  source: "cms";
}

function mapCmsArticle(article: CmsArticle): LatestArticle {
  return {
    id: article.id,
    title: article.title,
    description: article.excerpt,
    image: article.featuredImage ?? "/images/placeholder.jpg",
    category: article.category,
    author: article.author,
    publishedAt: article.publishedAt ?? article.createdAt,
    href: `/cms-posts/${article.slug}/`,
    source: "cms",
  };
}

export async function getLatestArticles(): Promise<LatestArticle[]> {
  try {
    const cmsArticles = await getCmsArticles();

    return cmsArticles
      .filter(article => article.status === "Published")
      .map(mapCmsArticle)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch {
    return [];
  }
}
