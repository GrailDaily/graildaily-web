import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryResult = z.string().max(200).safeParse(
      searchParams.get("q")?.trim() ?? "",
    );

    if (!queryResult.success) {
      return NextResponse.json(
        {
          error: "Search query must be 200 characters or fewer.",
        },
        {
          status: 400,
        },
      );
    }

    const query = queryResult.data;

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
  } catch {
    console.error("GET /api/articles failed.");

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

