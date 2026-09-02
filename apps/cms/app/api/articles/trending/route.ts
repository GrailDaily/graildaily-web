import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const rangeStart = new Date(now);
    rangeStart.setDate(rangeStart.getDate() - 7);

    const viewGroups = await prisma.articleView.groupBy({
      by: ["articleId"],
      where: {
        viewedAt: {
          gte: rangeStart,
        },
      },
      _count: {
        articleId: true,
      },
      orderBy: {
        _count: {
          articleId: "desc",
        },
      },
      take: 10,
    });

    const articleIds = viewGroups.map((group) => group.articleId);

    if (articleIds.length === 0) {
      return NextResponse.json({
        articles: [],
        total: 0,
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
        content: true,
        featuredImage: true,
        category: true,
        author: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        showInHero: true,
        heroSelectedAt: true,
        showInEditorsPicks: true,
        editorsPicksSelectedAt: true,
      },
    });

    const articleMap = new Map(
      articles.map((article) => [article.id, article]),
    );

    const trendingArticles = viewGroups
      .map((group) => {
        const article = articleMap.get(group.articleId);

        if (!article) {
          return null;
        }

        return {
          ...article,
          views: group._count.articleId,
        };
      })
      .filter((article) => article !== null);

    return NextResponse.json({
      articles: trendingArticles,
      total: trendingArticles.length,
    });
  } catch (error) {
    console.error("GET /api/articles/trending failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch Trending articles.",
      },
      {
        status: 500,
      },
    );
  }
}
