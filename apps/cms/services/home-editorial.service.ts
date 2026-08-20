import { prisma } from "@/lib/prisma";

const HERO_LIMIT = 6;
const EDITORS_PICKS_LIMIT = 5;

/**
 * Select an article for the Hero section.
 *
 * Rules:
 * - The article becomes a Hero article.
 * - An article already selected for Editor's Picks is removed from Editor's Picks.
 * - Maximum 6 Hero articles.
 * - When the Hero is full, the oldest Hero article is removed.
 */
export async function selectHeroArticle(articleId: string) {
  return prisma.$transaction(
    async (tx) => {
      const article = await tx.article.findUnique({
        where: { id: articleId },
        select: {
          id: true,
          status: true,
          showInHero: true,
        },
      });

      if (!article) {
        throw new Error("Article not found");
      }

      if (article.status !== "Published") {
        throw new Error("Only published articles can be selected for Hero");
      }

      const now = new Date();

      // Remove the article from Editor's Picks first.
      await tx.article.update({
        where: { id: articleId },
        data: {
          showInEditorsPicks: false,
          editorsPicksSelectedAt: null,
        },
      });

      // If it is already in Hero, simply keep it selected.
      if (article.showInHero) {
        return tx.article.findUnique({
          where: { id: articleId },
        });
      }

      // Find the oldest Hero article.
      const heroArticles = await tx.article.findMany({
        where: {
          showInHero: true,
        },
        orderBy: {
          heroSelectedAt: "asc",
        },
        select: {
          id: true,
        },
      });

      // If Hero is already full, remove the oldest one.
      if (heroArticles.length >= HERO_LIMIT) {
        const oldestHero = heroArticles[0];

        if (oldestHero) {
          await tx.article.update({
            where: { id: oldestHero.id },
            data: {
              showInHero: false,
              heroSelectedAt: null,
            },
          });
        }
      }

      // Add the new article to Hero.
      return tx.article.update({
        where: { id: articleId },
        data: {
          showInHero: true,
          heroSelectedAt: now,
          showInEditorsPicks: false,
          editorsPicksSelectedAt: null,
        },
      });
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );
}

/**
 * Remove an article from Hero.
 */
export async function removeHeroArticle(articleId: string) {
  return prisma.article.update({
    where: { id: articleId },
    data: {
      showInHero: false,
      heroSelectedAt: null,
    },
  });
}

/**
 * Select an article for Editor's Picks.
 *
 * Rules:
 * - The article becomes an Editor's Picks article.
 * - An article already selected for Hero is removed from Hero.
 * - Maximum 5 Editor's Picks articles.
 * - When Editor's Picks is full, the oldest article is removed.
 */
export async function selectEditorsPickArticle(articleId: string) {
  return prisma.$transaction(
    async (tx) => {
      const article = await tx.article.findUnique({
        where: { id: articleId },
        select: {
          id: true,
          status: true,
          showInEditorsPicks: true,
        },
      });

      if (!article) {
        throw new Error("Article not found");
      }

      if (article.status !== "Published") {
        throw new Error(
          "Only published articles can be selected for Editor's Picks",
        );
      }

      const now = new Date();

      // Remove the article from Hero first.
      await tx.article.update({
        where: { id: articleId },
        data: {
          showInHero: false,
          heroSelectedAt: null,
        },
      });

      // If it is already in Editor's Picks, simply keep it selected.
      if (article.showInEditorsPicks) {
        return tx.article.findUnique({
          where: { id: articleId },
        });
      }

      // Find the oldest Editor's Picks article.
      const editorsPickArticles = await tx.article.findMany({
        where: {
          showInEditorsPicks: true,
        },
        orderBy: {
          editorsPicksSelectedAt: "asc",
        },
        select: {
          id: true,
        },
      });

      // If Editor's Picks is already full, remove the oldest one.
      if (editorsPickArticles.length >= EDITORS_PICKS_LIMIT) {
        const oldestEditorsPick = editorsPickArticles[0];

        if (oldestEditorsPick) {
          await tx.article.update({
            where: { id: oldestEditorsPick.id },
            data: {
              showInEditorsPicks: false,
              editorsPicksSelectedAt: null,
            },
          });
        }
      }

      // Add the new article to Editor's Picks.
      return tx.article.update({
        where: { id: articleId },
        data: {
          showInEditorsPicks: true,
          editorsPicksSelectedAt: now,
          showInHero: false,
          heroSelectedAt: null,
        },
      });
    },
    {
      maxWait: 10000,
      timeout: 20000,
    },
  );
}

/**
 * Remove an article from Editor's Picks.
 */
export async function removeEditorsPickArticle(articleId: string) {
  return prisma.article.update({
    where: { id: articleId },
    data: {
      showInEditorsPicks: false,
      editorsPicksSelectedAt: null,
    },
  });
}

/**
 * Get the current Hero articles.
 */
export async function getHeroArticles() {
  return prisma.article.findMany({
    where: {
      status: "Published",
      showInHero: true,
    },
    orderBy: {
      heroSelectedAt: "desc",
    },
    take: HERO_LIMIT,
  });
}

/**
 * Get the current Editor's Picks articles.
 */
export async function getEditorsPickArticles() {
  return prisma.article.findMany({
    where: {
      status: "Published",
      showInEditorsPicks: true,
    },
    orderBy: {
      editorsPicksSelectedAt: "desc",
    },
    take: EDITORS_PICKS_LIMIT,
  });
}

