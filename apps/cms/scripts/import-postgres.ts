import "dotenv/config";

import fs from "node:fs";
import path from "node:path";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

interface ExportedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  author: string;
  status: "Draft" | "Review" | "Scheduled" | "Published" | "Archived";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

interface ExportedMedia {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  width: number | null;
  height: number | null;
  createdAt: string;
  publicId: string | null;
}

interface ExportData {
  exportedAt: string;
  articles: ExportedArticle[];
  media: ExportedMedia[];
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

const exportPath = path.join(process.cwd(), "scripts", "sqlite-export.json");

const exportData = JSON.parse(
  fs.readFileSync(exportPath, "utf8"),
) as ExportData;

async function main() {
  console.log("=== POSTGRES IMPORT START ===");

  console.log(`Articles to import: ${exportData.articles.length}`);
  console.log(`Media to import: ${exportData.media.length}`);

  for (const article of exportData.articles) {
    await prisma.article.upsert({
      where: {
        slug: article.slug,
      },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        category: article.category,
        author: article.author,
        status: article.status,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
      },
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        category: article.category,
        author: article.author,
        status: article.status,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
      },
    });

    console.log(`✓ Article: ${article.title}`);
  }

  for (const media of exportData.media) {
    await prisma.media.upsert({
      where: {
        id: media.id,
      },
      update: {
        filename: media.filename,
        originalName: media.originalName,
        mimeType: media.mimeType,
        size: media.size,
        path: media.path,
        width: media.width,
        height: media.height,
        createdAt: new Date(media.createdAt),
        publicId: media.publicId,
      },
      create: {
        id: media.id,
        filename: media.filename,
        originalName: media.originalName,
        mimeType: media.mimeType,
        size: media.size,
        path: media.path,
        width: media.width,
        height: media.height,
        createdAt: new Date(media.createdAt),
        publicId: media.publicId,
      },
    });

    console.log(`✓ Media: ${media.originalName}`);
  }

  console.log("=== POSTGRES IMPORT COMPLETE ===");
}

main()
  .catch((error) => {
    console.error("=== POSTGRES IMPORT FAILED ===");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
