import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type PopularRange = "all" | "month" | "week" | "today";

function getRangeStart(range: PopularRange): Date | null {
  if (range === "all") {
    return null;
  }

  const now = new Date();

  if (range === "today") {
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  if (range === "week") {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    return start;
  }

  const start = new Date(now);
  start.setDate(start.getDate() - 30);
  return start;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const requestedRange = searchParams.get("range");

    const range: PopularRange =
      requestedRange === "month" ||
      requestedRange === "week" ||
      requestedRange === "today"
        ? requestedRange
        : "all";

    const rangeStart = getRangeStart(range);

    const viewGroups = await prisma.articleView.groupBy({
      by: ["articleId"],
      where: rangeStart
        ? {
            viewedAt: {
              gte: rangeStart,
            },
          }
        : undefined,
      _count: {
        articleId: true,
      },
      orderBy: {
        _count: {
          articleId: "desc",
        },
      },
      take: 20,
    });

    const articleIds = viewGroups.map((group) => group.articleId);

    if (articleIds.length === 0) {
      return NextResponse.json({
        articles: [],
        total: 0,
        range,
      });
    }

    const articles = await prisma.article.findMany({
      where: {
        id: {
          in: articleIds,
        },
        status: "Published",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        category: true,
        author: true,
        publishedAt: true,
      },
    });

    const articleMap = new Map(
      articles.map((article) => [article.id, article]),
    );

    const popularArticles = viewGroups
      .map((group) => {
        const article = articleMap.get(group.articleId);

        if (!article) {
          return null;
        }

        return {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          featuredImage: article.featuredImage,
          category: article.category,
          author: article.author,
          publishedAt: article.publishedAt,
          views: group._count.articleId,
        };
      })
      .filter((article) => article !== null);

    return NextResponse.json({
      articles: popularArticles,
      total: popularArticles.length,
      range,
    });
  } catch (error) {
    console.error("GET /api/articles/popular failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch popular articles.",
      },
      {
        status: 500,
      },
    );
  }
}
