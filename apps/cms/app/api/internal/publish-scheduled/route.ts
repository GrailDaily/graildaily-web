import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const result = await prisma.article.updateMany({
    where: {
      status: "Scheduled",
      scheduledAt: {
        not: null,
        lte: now,
      },
    },
    data: {
      status: "Published",
      publishedAt: now,
    },
  });

  return NextResponse.json({
    success: true,
    published: result.count,
    timestamp: now.toISOString(),
  });
}
