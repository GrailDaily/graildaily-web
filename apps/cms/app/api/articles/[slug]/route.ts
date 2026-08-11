import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;

    const article = await prisma.article.findFirst({
      where: {
        slug,
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
      },
    });

    if (!article) {
      return NextResponse.json(
        {
          error: "Article not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("GET /api/articles/[slug] failed:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch article.",
      },
      {
        status: 500,
      },
    );
  }
}
