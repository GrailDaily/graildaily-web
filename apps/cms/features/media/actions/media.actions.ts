"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function deleteMediaAction(id: string) {
  const media = await prisma.media.findUnique({
    where: {
      id,
    },
  });

  if (!media) {
    throw new Error("Media not found");
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
}
