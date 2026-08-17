"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

import { getMediaUsageCount } from "../utils/media-usage";

export async function deleteMediaAction(id: string) {
  const media = await prisma.media.findUnique({
    where: {
      id,
    },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  const usageCount = await getMediaUsageCount(media.path);

  if (usageCount > 0) {
    throw new Error(
      `Cannot delete media because it is currently used by ${usageCount} article${
        usageCount === 1 ? "" : "s"
      }.`,
    );
  }

  if (media.publicId) {
    const cloudinaryResult = await cloudinary.uploader.destroy(media.publicId);

    console.log("=== CLOUDINARY DELETE ===");
    console.log({
      publicId: media.publicId,
      result: cloudinaryResult,
    });
  }

  await prisma.media.delete({
    where: {
      id,
    },
  });

  revalidatePath("/media");
  revalidatePath("/articles");
}
