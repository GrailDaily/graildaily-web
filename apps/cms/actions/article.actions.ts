"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireActionRole } from "@/lib/auth-guard";
import {
  articleActionSchema,
  articleIdSchema,
  articleIdsSchema,
  articleStatusSchema,
} from "@/features/articles/validation/article-schema";
import {
  selectHeroArticle,
  removeHeroArticle,
  selectEditorsPickArticle,
  removeEditorsPickArticle,
} from "@/services/home-editorial.service";

import type { ArticleFormData } from "@/features/articles/types/article-form";
import type { ArticleStatus } from "@/types/article";

import { cleanupMediaIfUnused } from "@/features/media/utils/media-cleanup";

const ARTICLE_MANAGEMENT_ROLES = ["Admin", "Editor"] as const;
async function validateFeaturedImage(featuredImage: string | null) {
  if (featuredImage === null) {
    return;
  }

  const media = await prisma.media.findFirst({
    where: {
      path: featuredImage,
    },
    select: {
      id: true,
    },
  });

  if (!media) {
    throw new Error("Featured image is not registered in Media Library.");
  }
}

async function validateArticleCategory(
  categoryName: string,
  currentCategory?: string,
) {
  const category = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
    select: {
      status: true,
    },
  });

  if (!category) {
    throw new Error("Selected category does not exist.");
  }

  if (category.status !== "Active" && categoryName !== currentCategory) {
    throw new Error("Selected category is inactive.");
  }
}

// CREATE ARTICLE
export async function createArticleAction(data: ArticleFormData) {
  const user = await requireActionRole(["Admin", "Editor", "Author"]);

  const validation = articleActionSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid article data.");
  }

  const validatedData = validation.data;

  await validateFeaturedImage(validatedData.featuredImage);
  await validateArticleCategory(validatedData.category);

  if (
    user.role === "Author" &&
    (validatedData.status === "Published" ||
      validatedData.status === "Scheduled")
  ) {
    throw new Error("Authors cannot publish or schedule articles.");
  }

  const existingArticle = await prisma.article.findUnique({
    where: {
      slug: validatedData.slug,
    },
    select: {
      id: true,
    },
  });

  if (existingArticle) {
    throw new Error("An article with this slug already exists.");
  }

  const scheduledAt =
    validatedData.status === "Scheduled" && validatedData.scheduledAt
      ? new Date(`${validatedData.scheduledAt}:00+07:00`)
      : null;

  await prisma.article.create({
    data: {
      ...validatedData,
      authorUserId: user.id,
      showInHero: user.role === "Author" ? false : validatedData.showInHero,
      showInEditorsPicks:
        user.role === "Author" ? false : validatedData.showInEditorsPicks,
      scheduledAt,
      featuredImage: validatedData.featuredImage,
      publishedAt: validatedData.status === "Published" ? new Date() : null,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/media");
}

// UPDATE ARTICLE
export async function updateArticleAction(id: string, data: ArticleFormData) {
  const user = await requireActionRole(["Admin", "Editor", "Author"]);

  const validatedId = articleIdSchema.parse(id);

  const validation = articleActionSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid article data.");
  }

  const validatedData = validation.data;

  await validateFeaturedImage(validatedData.featuredImage);

  const currentArticle = await prisma.article.findUnique({
    where: {
      id: validatedId,
    },
  });

  if (!currentArticle) {
    throw new Error("Article not found");
  }

  if (user.role === "Author" && currentArticle.authorUserId !== user.id) {
    throw new Error("Forbidden");
  }

  await validateArticleCategory(
    validatedData.category,
    currentArticle.category,
  );

  if (
    user.role === "Author" &&
    validatedData.status === "Published" &&
    currentArticle.status !== "Published"
  ) {
    throw new Error("Authors cannot publish articles.");
  }

  if (
    user.role === "Author" &&
    validatedData.status === "Scheduled" &&
    currentArticle.status !== "Scheduled"
  ) {
    throw new Error("Authors cannot schedule articles.");
  }

  const existingArticle = await prisma.article.findFirst({
    where: {
      slug: validatedData.slug,
      NOT: {
        id: validatedId,
      },
    },
    select: {
      id: true,
    },
  });

  if (existingArticle) {
    throw new Error("An article with this slug already exists.");
  }

  const scheduledAt =
    validatedData.status === "Scheduled" && validatedData.scheduledAt
      ? new Date(`${validatedData.scheduledAt}:00+07:00`)
      : null;

  const publishedAt =
    validatedData.status === "Published"
      ? (currentArticle.publishedAt ?? new Date())
      : null;

  await prisma.article.update({
    where: {
      id: validatedId,
    },
    data: {
      ...validatedData,
      authorUserId: currentArticle.authorUserId,
      showInHero:
        user.role === "Author"
          ? currentArticle.showInHero
          : validatedData.showInHero,
      showInEditorsPicks:
        user.role === "Author"
          ? currentArticle.showInEditorsPicks
          : validatedData.showInEditorsPicks,
      scheduledAt,
      featuredImage: validatedData.featuredImage,
      publishedAt,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/media");
}

// HERO MANAGEMENT
export async function selectHeroArticleAction(articleId: string) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(articleId);

  await selectHeroArticle(validatedId);

  revalidatePath("/articles");
}

export async function removeHeroArticleAction(articleId: string) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(articleId);

  await removeHeroArticle(validatedId);

  revalidatePath("/articles");
}

// EDITOR'S PICKS MANAGEMENT
export async function selectEditorsPickArticleAction(articleId: string) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(articleId);

  await selectEditorsPickArticle(validatedId);

  revalidatePath("/articles");
}

export async function removeEditorsPickArticleAction(articleId: string) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(articleId);

  await removeEditorsPickArticle(validatedId);

  revalidatePath("/articles");
}

// DELETE ARTICLE
export async function deleteArticleAction(id: string) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(id);

  const article = await prisma.article.findUnique({
    where: {
      id: validatedId,
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
      id: validatedId,
    },
  });

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

// ARCHIVE ARTICLE
export async function archiveArticleAction(id: string) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(id);

  await prisma.article.update({
    where: {
      id: validatedId,
    },
    data: {
      status: "Archived",
      publishedAt: null,
    },
  });

  revalidatePath("/articles");
}

// DUPLICATE ARTICLE
export async function duplicateArticleAction(id: string) {
  const user = await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedId = articleIdSchema.parse(id);

  const article = await prisma.article.findUnique({
    where: {
      id: validatedId,
    },
  });

  if (!article) {
    throw new Error("Article not found");
  }

  await validateFeaturedImage(article.featuredImage);
  await validateArticleCategory(article.category);

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
      authorUserId: user.id,
      status: "Draft",
      publishedAt: null,
    },
  });

  revalidatePath("/articles");
  revalidatePath("/media");
}

// BULK UPDATE STATUS
export async function bulkUpdateStatusAction(
  ids: string[],
  status: ArticleStatus,
) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedIds = articleIdsSchema.parse(ids);
  const validatedStatus = articleStatusSchema.parse(status);

  await prisma.article.updateMany({
    where: {
      id: {
        in: validatedIds,
      },
    },
    data: {
      status: validatedStatus,
      publishedAt: validatedStatus === "Published" ? new Date() : null,
    },
  });

  revalidatePath("/articles");
}

// BULK DELETE
export async function bulkDeleteArticlesAction(ids: string[]) {
  await requireActionRole([...ARTICLE_MANAGEMENT_ROLES]);

  const validatedIds = articleIdsSchema.parse(ids);

  const articles = await prisma.article.findMany({
    where: {
      id: {
        in: validatedIds,
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
        in: validatedIds,
      },
    },
  });

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
