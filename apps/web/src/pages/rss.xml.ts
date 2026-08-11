import rss from "@astrojs/rss";
import config from "@/config";
import { getCmsArticles } from "@/lib/cms";

export async function GET() {
  const articles = await getCmsArticles();

  const publishedArticles = articles
    .filter(article => article.status === "Published")
    .sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
      const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();

      return dateB - dateA;
    });

  return rss({
    title: config.site.title,
    description: config.site.description,
    site: config.site.url,
    items: publishedArticles.map(article => ({
      link: `/cms-posts/${article.slug}/`,
      title: article.title,
      description: article.excerpt,
      pubDate: new Date(article.publishedAt ?? article.createdAt),
    })),
  });
}
