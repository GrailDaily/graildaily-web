import { NextResponse } from "next/server";

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

    const article = await prisma.article.findFirst({
      where: {
        slug,
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

    const viewCount = await prisma.articleView.count({
      where: {
        articleId: article.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        views: viewCount,
      },
      {
        status: 200,
        headers: corsHeaders,
      },
    );
  } catch (error) {
    console.error("POST /api/articles/[slug]/view failed:", error);

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
