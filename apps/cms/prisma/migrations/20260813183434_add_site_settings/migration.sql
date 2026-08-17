-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL DEFAULT 'GrailDaily',
    "description" TEXT NOT NULL DEFAULT 'Discover stories about history, science, mysteries, culture, and the world around us.',
    "siteUrl" TEXT NOT NULL DEFAULT 'https://graildaily.com',
    "language" TEXT NOT NULL DEFAULT 'English',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Jakarta',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);
