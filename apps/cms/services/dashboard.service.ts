import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [total, published, draft, review, scheduled, archived] =
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
    ]);

  return {
    total,
    published,
    draft,
    review,
    scheduled,
    archived,
  };
}
