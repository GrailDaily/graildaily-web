"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { ArticleFormData } from "@/features/articles/types/article-form";

import type { ArticleStatus } from "@/types/article";

import cloudinary from "@/lib/cloudinary";

function getCloudinaryPublicId(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[^/.]+$/);

  return match?.[1] ?? null;
}

async function deleteCloudinaryImage(url: string | null) {
  if (!url) return;

  const publicId = getCloudinaryPublicId(url);

  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
}

/**
 * Menghapus Media record dan file Cloudinary
 * hanya jika gambar tersebut sudah tidak digunakan
 * oleh artikel mana pun.
 */
async function cleanupMediaImage(url: string | null) {
  if (!url) return;

  const media = await prisma.media.findFirst({
    where: {
      path: url,
    },
  });

  if (!media) {
    await deleteCloudinaryImage(url);
    return;
  }

  const usageCount = await prisma.article.count({
    where: {
      featuredImage: url,
    },
  });

  if (usageCount > 0) {
    return;
  }

  if (media.publicId) {
    await cloudinary.uploader.destroy(media.publicId);
  } else {
    await deleteCloudinaryImage(url);
  }

  await prisma.media.delete({
    where: {
      id: media.id,
    },
  });
}

export async function createArticleAction(data: ArticleFormData) {
  await prisma.article.create({
    data: {
      ...data,
      featuredImage: data.featuredImage,
      publishedAt: data.status === "Published" ? new Date() : null,
    },
  });

  revalidatePath("/articles");
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

  const oldImage = currentArticle.featuredImage;
  const newImage = data.featuredImage;

  await prisma.article.update({
    where: {
      id,
    },
    data: {
      ...data,
      featuredImage: newImage,
      publishedAt: data.status === "Published" ? new Date() : null,
    },
  });

  if (oldImage && oldImage !== newImage) {
    await cleanupMediaImage(oldImage);
  }

  revalidatePath("/articles");
  revalidatePath("/media");
}

export async function deleteArticleAction(id: string) {
  const article = await prisma.article.findUnique({
    where: {
      id,
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

  await cleanupMediaImage(article.featuredImage);

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

  const imageUrls = [
    ...new Set(
      articles
        .map((article) => article.featuredImage)
        .filter((image): image is string => Boolean(image)),
    ),
  ];

  await Promise.all(imageUrls.map((image) => cleanupMediaImage(image)));

  revalidatePath("/articles");
  revalidatePath("/media");
}
