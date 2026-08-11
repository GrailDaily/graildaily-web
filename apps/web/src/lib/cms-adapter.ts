import type { CmsArticle } from "@/lib/cms";
import type { HomePost } from "@/lib/home-post";

export function cmsArticleToHomePost(article: CmsArticle): HomePost {
  return {
    id: article.slug,
    href: `/cms-posts/${article.slug}/`,
    source: "cms",
    data: {
      title: article.title,
      description: article.excerpt,
      author: article.author,
      pubDatetime: new Date(article.publishedAt ?? article.createdAt),
      modDatetime:
        article.updatedAt !== article.createdAt
          ? new Date(article.updatedAt)
          : null,
      featured: false,
      draft: false,
      tags: [article.category],
      ogImage: article.featuredImage ?? undefined,
      canonicalURL: undefined,
    },
  };
}

export function cmsArticlesToHomePosts(articles: CmsArticle[]): HomePost[] {
  return articles.map(cmsArticleToHomePost);
}
