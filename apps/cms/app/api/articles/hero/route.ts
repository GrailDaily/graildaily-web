import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "Published",
        showInHero: true,
        showInEditorsPicks: false,
      },
      orderBy: {
        heroSelectedAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
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

    return NextResponse.json(
      {
        articles,
        total: articles.length,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error("GET /api/articles/hero failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch Hero articles.",
      },
      {
        status: 500,
      },
    );
  }
}

