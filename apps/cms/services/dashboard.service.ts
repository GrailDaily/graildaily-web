import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [total, published, draft, review, scheduled, archived, totalViews] =
    await Promise.all([
      prisma.article.count(),

      prisma.article.count({
        where: {
          status: "Published",
        },
      }),

      prisma.article.count({
        where: {
          status: "Draft",
        },
      }),

      prisma.article.count({
        where: {
          status: "Review",
        },
      }),

      prisma.article.count({
        where: {
          status: "Scheduled",
        },
      }),

      prisma.article.count({
        where: {
          status: "Archived",
        },
      }),

      prisma.articleView.count(),
    ]);

  return {
    total,
    published,
    draft,
    review,
    scheduled,
    archived,
    totalViews,
  };
}

export async function getViewsLast7Days() {
  const now = new Date();

  const startDate = new Date(now);
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 6);

  const views = await prisma.articleView.findMany({
    where: {
      viewedAt: {
        gte: startDate,
      },
    },
    select: {
      viewedAt: true,
    },
    orderBy: {
      viewedAt: "asc",
    },
  });

  const result = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    const count = views.filter((view) => {
      const viewedDate = new Date(view.viewedAt);

      const viewedYear = viewedDate.getFullYear();
      const viewedMonth = String(viewedDate.getMonth() + 1).padStart(2, "0");
      const viewedDay = String(viewedDate.getDate()).padStart(2, "0");

      return `${viewedYear}-${viewedMonth}-${viewedDay}` === dateKey;
    }).length;

    return {
      date: dateKey,
      views: count,
    };
  });

  return result;
}

export async function getTopArticlesByViews(limit = 5) {
  const articles = await prisma.article.findMany({
    where: {
      status: "Published",
    },
    include: {
      _count: {
        select: {
          views: true,
        },
      },
    },
    orderBy: {
      views: {
        _count: "desc",
      },
    },
    take: limit,
  });

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    views: article._count.views,
  }));
}

export async function getRecentViewActivity(limit = 8) {
  const views = await prisma.articleView.findMany({
    take: limit,
    orderBy: {
      viewedAt: "desc",
    },
    select: {
      id: true,
      viewedAt: true,
      article: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  return views;
}
