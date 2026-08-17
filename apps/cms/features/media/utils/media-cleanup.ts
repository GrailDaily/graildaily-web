import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

import { isMediaUsed } from "./media-usage";

export async function cleanupMediaIfUnused(mediaId: string) {
  const media = await prisma.media.findUnique({
    where: {
      id: mediaId,
    },
  });

  if (!media) {
    return {
      deleted: false,
      reason: "not-found" as const,
    };
  }

  const used = await isMediaUsed(media.path);

  if (used) {
    return {
      deleted: false,
      reason: "still-used" as const,
    };
  }

  if (media.publicId) {
    const result = await cloudinary.uploader.destroy(media.publicId);

    console.log("=== CLOUDINARY CLEANUP ===");
    console.log({
      publicId: media.publicId,
      result,
    });
  }

  await prisma.media.delete({
    where: {
      id: media.id,
    },
  });

  return {
    deleted: true,
    reason: "unused" as const,
  };
}
