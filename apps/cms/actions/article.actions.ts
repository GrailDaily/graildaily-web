"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import {
  selectHeroArticle,
  removeHeroArticle,
  selectEditorsPickArticle,
  removeEditorsPickArticle,
} from "@/services/home-editorial.service";

import { ArticleFormData } from "@/features/articles/types/article-form";

import type { ArticleStatus } from "@/types/article";

import { cleanupMediaIfUnused } from "@/features/media/utils/media-cleanup";

export async function createArticleAction(data: ArticleFormData) {
  const scheduledAt =
    data.status === "Scheduled" && data.scheduledAt
      ? new Date(`${data.scheduledAt}:00+07:00`)
      : null;

  await prisma.article.create({
    data: {
      ...data,
      scheduledAt,
      featuredImage: data.featuredImage,
      publishedAt: data.status === "Published" ? new Date() : null,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/media");
}

export async function updateArticleAction(id: string, data: ArticleFormData) {
  const currentArticle = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!currentArticle) {
    throw new Error("Article not found");
  }

  const scheduledAt =
    data.status === "Scheduled" && data.scheduledAt
      ? new Date(`${data.scheduledAt}:00+07:00`)
      : null;

  const publishedAt =
    data.status === "Published"
      ? (currentArticle.publishedAt ?? new Date())
      : null;

  await prisma.article.update({
    where: {
      id,
    },
    data: {
      ...data,
      scheduledAt,
      featuredImage: data.featuredImage,
      publishedAt,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/media");
}

export async function selectHeroArticleAction(articleId: string) {
  await selectHeroArticle(articleId);

  revalidatePath("/articles");
}

export async function removeHeroArticleAction(articleId: string) {
  await removeHeroArticle(articleId);

  revalidatePath("/articles");
}

export async function selectEditorsPickArticleAction(articleId: string) {
  await selectEditorsPickArticle(articleId);

  revalidatePath("/articles");
}

export async function removeEditorsPickArticleAction(articleId: string) {
  await removeEditorsPickArticle(articleId);

  revalidatePath("/articles");
}

export async function deleteArticleAction(id: string) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      featuredImage: true,
    },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  await prisma.article.delete({
    where: {
      id,
    },
  });

  /*
   * The article has now been removed.
   *
   * If its Featured Image is no longer referenced
   * anywhere else, cleanupMediaIfUnused() will remove
   * the corresponding media from Cloudinary and Media DB.
   *
   * If the image is still used by another article or
   * inside article content, it will be preserved.
   */
  if (article.featuredImage) {
    const media = await prisma.media.findFirst({
      where: {
        path: article.featuredImage,
      },
    });

    if (media) {
      await cleanupMediaIfUnused(media.id);
    }
  }

  revalidatePath("/articles");
  revalidatePath("/media");
}

export async function archiveArticleAction(id: string) {
  await prisma.article.update({
    where: {
      id,
    },
    data: {
      status: "Archived",
      publishedAt: null,
    },
  });

  revalidatePath("/articles");
}

export async function duplicateArticleAction(id: string) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  const baseSlug = `${article.slug}-copy`;

  let slug = baseSlug;
  let copyNumber = 1;

  while (true) {
    const existingArticle = await prisma.article.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    if (!existingArticle) {
      break;
    }

    copyNumber++;
    slug = `${baseSlug}-${copyNumber}`;
  }

  const title =
    copyNumber === 1
      ? `${article.title} (Copy)`
      : `${article.title} (Copy ${copyNumber})`;

  await prisma.article.create({
    data: {
      title,
      slug,
      excerpt: article.excerpt,
      content: article.content,
      featuredImage: article.featuredImage,
      category: article.category,
      author: article.author,
      status: "Draft",
      publishedAt: null,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/media");
}

export async function bulkUpdateStatusAction(
  ids: string[],
  status: ArticleStatus,
) {
  await prisma.article.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      status,
      publishedAt: status === "Published" ? new Date() : null,
    },
  });

  revalidatePath("/articles");
}

export async function bulkDeleteArticlesAction(ids: string[]) {
  const articles = await prisma.article.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    select: {
      id: true,
      featuredImage: true,
    },
  });

  await prisma.article.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  /*
   * The articles have now been deleted.
   *
   * Check every Featured Image that belonged to those
   * articles. A media item is removed only when it is
   * no longer referenced anywhere else.
   */
  const featuredImages = [
    ...new Set(
      articles
        .map((article) => article.featuredImage)
        .filter((image): image is string => Boolean(image)),
    ),
  ];

  for (const featuredImage of featuredImages) {
    const media = await prisma.media.findFirst({
      where: {
        path: featuredImage,
      },
    });

    if (media) {
      await cleanupMediaIfUnused(media.id);
    }
  }

  revalidatePath("/articles");
  revalidatePath("/media");
}
