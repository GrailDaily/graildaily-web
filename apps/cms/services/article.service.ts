import { prisma } from "@/lib/prisma";
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
      ? (
          await prisma.category.findFirst({
            where: {
              name: {
                equals: category,
                mode: "insensitive",
              },
              status: "Active",
            },
            select: {
              name: true,
            },
          })
        )?.name
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
      include: {
        _count: {
          select: {
            views: true,
          },
        },
      },
    }),

    prisma.article.count({
      where,
    }),
  ]);

  return {
    articles: articles.map((article) => ({
      ...article,
      views: article._count.views,
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getArticleById(id: string) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      views: true,
    },
  });

  if (!article) {
    return null;
  }

  return {
    ...article,
    views: article.views.length,
  };
}
