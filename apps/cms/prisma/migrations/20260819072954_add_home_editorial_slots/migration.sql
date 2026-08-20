-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "editorsPicksSelectedAt" TIMESTAMP(3),
ADD COLUMN     "heroSelectedAt" TIMESTAMP(3),
ADD COLUMN     "showInEditorsPicks" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "showInHero" BOOLEAN NOT NULL DEFAULT false;
