"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { requireActionRole } from "@/lib/auth-guard";

import { getMediaUsageCount } from "../utils/media-usage";

const MEDIA_MANAGEMENT_ROLES = ["Admin", "Editor"] as const;

const mediaIdSchema = z.string().trim().min(1).max(191);
const mediaAltTextSchema = z.string().trim().max(500);

export async function deleteMediaAction(id: string) {
  await requireActionRole([...MEDIA_MANAGEMENT_ROLES]);

  const validatedId = mediaIdSchema.parse(id);

  const media = await prisma.media.findUnique({
    where: {
      id: validatedId,
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
    await cloudinary.uploader.destroy(media.publicId);


  }

  await prisma.media.delete({
    where: {
      id: validatedId,
    },
  });

  revalidatePath("/media");
  revalidatePath("/articles");
}

export async function updateMediaAltTextAction(id: string, altText: string) {
  await requireActionRole([...MEDIA_MANAGEMENT_ROLES]);

  const validatedId = mediaIdSchema.parse(id);
  const validatedAltText = mediaAltTextSchema.parse(altText);

  const media = await prisma.media.findUnique({
    where: {
      id: validatedId,
    },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  await prisma.media.update({
    where: {
      id: validatedId,
    },
    data: {
      altText: validatedAltText || null,
    },
  });

  revalidatePath("/media");
  revalidatePath("/articles");
}
