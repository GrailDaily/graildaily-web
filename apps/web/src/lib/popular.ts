import { getCmsPopularArticles } from "@/lib/cms";
import { cmsArticlesToHomePosts } from "@/lib/cms-adapter";
import type { HomePost } from "@/lib/home-post";

export async function getPopularPosts(
  range: "all" | "month" | "week" | "today" = "all"
): Promise<HomePost[]> {
  try {
    const cmsArticles = await getCmsPopularArticles(range);

    return cmsArticlesToHomePosts(cmsArticles).filter(post => !post.data.draft);
  } catch {
    return [];
  }
}
