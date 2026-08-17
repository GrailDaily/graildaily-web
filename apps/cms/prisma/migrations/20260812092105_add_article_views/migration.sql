-- CreateTable
CREATE TABLE "ArticleView" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArticleView_articleId_idx" ON "ArticleView"("articleId");

-- CreateIndex
CREATE INDEX "ArticleView_viewedAt_idx" ON "ArticleView"("viewedAt");

-- CreateIndex
CREATE INDEX "ArticleView_articleId_viewedAt_idx" ON "ArticleView"("articleId", "viewedAt");

-- AddForeignKey
ALTER TABLE "ArticleView" ADD CONSTRAINT "ArticleView_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
