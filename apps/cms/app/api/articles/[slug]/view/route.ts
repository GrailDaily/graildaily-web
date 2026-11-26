import { NextResponse } from "next/server";
import { articleSlugSchema } from "@/features/articles/validation/article-schema";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

const allowedOrigin = process.env.WEB_ORIGIN ?? "http://localhost:4321";

const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(_request: Request, { params }: RouteContext) {
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
          headers: corsHeaders,
        },
      );
    }

    const article = await prisma.article.findFirst({
      where: {
        slug: validation.data,
        status: "Published",
      },
      select: {
        id: true,
      },
    });

    if (!article) {
      return NextResponse.json(
        {
          error: "Article not found.",
        },
        {
          status: 404,
          headers: corsHeaders,
        },
      );
    }

    await prisma.articleView.create({
      data: {
        articleId: article.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch {
    console.error("POST /api/articles/[slug]/view failed.");

    return NextResponse.json(
      {
        error: "Failed to record article view.",
      },
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
}
