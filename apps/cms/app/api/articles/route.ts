import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() ?? "";

    const articles = await prisma.article.findMany({
      where: {
        status: "Published",
        ...(query
          ? {
              OR: [
                {
                  title: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        publishedAt: "desc",
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
        _count: {
          select: {
            views: true,
          },
        },
        showInHero: true,
        heroSelectedAt: true,
        showInEditorsPicks: true,
        editorsPicksSelectedAt: true,
      },
    });

    const articlesWithViews = articles.map(({ _count, ...article }) => ({
      ...article,
      views: _count.views,
    }));

    return NextResponse.json({
      articles: articlesWithViews,
      total: articlesWithViews.length,
    });
  } catch (error) {
    console.error("GET /api/articles failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch articles.",
      },
      {
        status: 500,
      },
    );
  }
}
