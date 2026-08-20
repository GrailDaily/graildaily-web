import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "Published",
        showInEditorsPicks: true,
      },
      orderBy: {
        editorsPicksSelectedAt: "desc",
      },
      take: 5,
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

    return NextResponse.json({
      articles,
      total: articles.length,
    });
  } catch (error) {
    console.error("GET /api/articles/editors-picks failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch Editor's Picks articles.",
      },
      {
        status: 500,
      },
    );
  }
}
