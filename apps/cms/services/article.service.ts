import { prisma } from "@/lib/prisma";
import { ARTICLE_CATEGORIES } from "@/features/articles/constants/categories";
import { ARTICLE_STATUS } from "@/features/articles/constants/article-status";

interface GetRecentArticlesOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
}

export async function getRecentArticles({
  page = 1,
  limit = 10,
  search = "",
  status = "all",
  category = "all",
}: GetRecentArticlesOptions = {}) {
  const skip = (page - 1) * limit;

  const normalizedStatus = status.toLowerCase();
  const normalizedCategory = category.toLowerCase();

  const matchedStatus =
    normalizedStatus !== "all"
      ? ARTICLE_STATUS.find((item) => item.toLowerCase() === normalizedStatus)
      : undefined;

  const matchedCategory =
    normalizedCategory !== "all"
      ? ARTICLE_CATEGORIES.find(
          (item) => item.toLowerCase() === normalizedCategory,
        )
      : undefined;

  const where = {
    ...(search
      ? {
          title: {
            contains: search,
          },
        }
      : {}),

    ...(matchedStatus
      ? {
          status: matchedStatus,
        }
      : {}),

    ...(matchedCategory
      ? {
          category: matchedCategory,
        }
      : {}),
  };

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.article.count({
      where,
    }),
  ]);

  return {
    articles,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({
    where: {
      id,
    },
  });
}
