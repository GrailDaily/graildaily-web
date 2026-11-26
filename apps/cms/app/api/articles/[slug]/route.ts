import { NextResponse } from "next/server";
import { articleSlugSchema } from "@/features/articles/validation/article-schema";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { slug } = await params;

    const validation = articleSlugSchema.safeParse(slug);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid article slug.",
        },
        {
          status: 400,
        },
      );
    }

    const article = await prisma.article.findFirst({
      where: {
        slug: validation.data,
        status: "Published",
      },
      select: {
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
  } catch {
    console.error("GET /api/articles/[slug] failed.");

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
