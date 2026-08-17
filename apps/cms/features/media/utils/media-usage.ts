import { prisma } from "@/lib/prisma";

export async function getMediaUsageCount(url: string) {
  if (!url) {
    return 0;
  }

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        {
          featuredImage: url,
        },
        {
          content: {
            contains: url,
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  return articles.length;
}

export async function isMediaUsed(url: string) {
  const usageCount = await getMediaUsageCount(url);

  return usageCount > 0;
}
