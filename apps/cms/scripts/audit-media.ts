import cloudinary from "../lib/cloudinary";
import { prisma } from "../lib/prisma";

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  bytes: number;
  width?: number;
  height?: number;
  format?: string;
  created_at?: string;
};

async function getCloudinaryResources() {
  const resources: CloudinaryResource[] = [];

  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "articles/",
      resource_type: "image",
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    });

    resources.push(...result.resources);

    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources;
}

function getPublicIdFromUrl(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^/.]+)?$/);

  return match?.[1] ?? null;
}

async function main() {
  console.log("=== MEDIA AUDIT ===");
  console.log("");

  const [media, articles, cloudinaryResources] = await Promise.all([
    prisma.media.findMany({
      select: {
        id: true,
        originalName: true,
        path: true,
        publicId: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),

    prisma.article.findMany({
      select: {
        id: true,
        title: true,
        featuredImage: true,
      },
    }),

    getCloudinaryResources(),
  ]);

  const mediaByPublicId = new Map(
    media
      .filter((item) => item.publicId)
      .map((item) => [item.publicId as string, item]),
  );

  const mediaByPath = new Map(media.map((item) => [item.path, item]));

  const articleUsageByPublicId = new Map<
    string,
    {
      articleId: string;
      title: string;
    }[]
  >();

  for (const article of articles) {
    if (!article.featuredImage) {
      continue;
    }

    const mediaItem = mediaByPath.get(article.featuredImage);

    const publicId =
      mediaItem?.publicId ?? getPublicIdFromUrl(article.featuredImage);

    if (!publicId) {
      continue;
    }

    const existing = articleUsageByPublicId.get(publicId) ?? [];

    existing.push({
      articleId: article.id,
      title: article.title,
    });

    articleUsageByPublicId.set(publicId, existing);
  }

  const registered = [];
  const orphanCandidates = [];
  const usedButUnregistered = [];

  for (const resource of cloudinaryResources) {
    const mediaItem = mediaByPublicId.get(resource.public_id);
    const usage = articleUsageByPublicId.get(resource.public_id) ?? [];

    if (mediaItem) {
      registered.push({
        publicId: resource.public_id,
        mediaId: mediaItem.id,
        originalName: mediaItem.originalName,
        usedByArticles: usage.length,
      });

      continue;
    }

    if (usage.length > 0) {
      usedButUnregistered.push({
        publicId: resource.public_id,
        usedByArticles: usage,
      });

      continue;
    }

    orphanCandidates.push({
      publicId: resource.public_id,
      url: resource.secure_url,
      size: resource.bytes,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      createdAt: resource.created_at,
    });
  }

  const brokenMediaRecords = media.filter(
    (item) =>
      item.publicId &&
      !cloudinaryResources.some(
        (resource) => resource.public_id === item.publicId,
      ),
  );

  console.log("SUMMARY");
  console.log("-------");
  console.log(`Media DB:              ${media.length}`);
  console.log(`Articles:              ${articles.length}`);
  console.log(`Cloudinary resources:  ${cloudinaryResources.length}`);
  console.log(`Registered:            ${registered.length}`);
  console.log(`Used but unregistered: ${usedButUnregistered.length}`);
  console.log(`Orphan candidates:     ${orphanCandidates.length}`);
  console.log(`Broken media records:  ${brokenMediaRecords.length}`);

  console.log("");
  console.log("=== USED BUT UNREGISTERED ===");

  if (usedButUnregistered.length === 0) {
    console.log("None.");
  } else {
    for (const item of usedButUnregistered) {
      console.log("");
      console.log(`Public ID: ${item.publicId}`);

      for (const article of item.usedByArticles) {
        console.log(`  Article: ${article.title}`);
        console.log(`  ID:      ${article.articleId}`);
      }
    }
  }

  console.log("");
  console.log("=== ORPHAN CANDIDATES ===");

  if (orphanCandidates.length === 0) {
    console.log("None.");
  } else {
    for (const item of orphanCandidates) {
      console.log("");
      console.log(`Public ID: ${item.publicId}`);
      console.log(`URL:       ${item.url}`);
      console.log(`Size:      ${item.size} bytes`);
      console.log(`Dimensions: ${item.width ?? "?"} x ${item.height ?? "?"}`);
      console.log(`Format:    ${item.format ?? "?"}`);
      console.log(`Created:   ${item.createdAt ?? "?"}`);
    }
  }

  console.log("");
  console.log("=== BROKEN MEDIA RECORDS ===");

  if (brokenMediaRecords.length === 0) {
    console.log("None.");
  } else {
    for (const item of brokenMediaRecords) {
      console.log("");
      console.log(`Media ID:      ${item.id}`);
      console.log(`Original name: ${item.originalName}`);
      console.log(`Public ID:     ${item.publicId}`);
      console.log(`URL:           ${item.path}`);
    }
  }

  console.log("");
  console.log("=== AUDIT COMPLETE ===");
  console.log("No database or Cloudinary records were modified.");
}

main()
  .catch((error) => {
    console.error("");
    console.error("MEDIA AUDIT FAILED");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
