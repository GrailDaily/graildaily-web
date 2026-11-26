import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

import { requireActiveUser } from "@/lib/auth-guard";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { readJsonBody } from "@/lib/utils/read-json-body";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const INTENT_TTL_SECONDS = 10 * 60;
const ASSET_FOLDER = "articles";

function verifyIntentToken(
  token: string,
  userId: string,
  publicId: string,
  apiSecret: string,
) {
  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [expiresAtText, suppliedSignature] = parts;
  const expiresAt = Number(expiresAtText);
  const now = Math.floor(Date.now() / 1000);

  if (
    !Number.isSafeInteger(expiresAt) ||
    expiresAt <= now ||
    expiresAt > now + INTENT_TTL_SECONDS
  ) {
    return false;
  }

  const expectedSignature = createHmac("sha256", apiSecret)
    .update(`${userId}:${publicId}:${expiresAt}`)
    .digest("base64url");

  const expectedBuffer = Buffer.from(expectedSignature);
  const suppliedBuffer = Buffer.from(suppliedSignature);

  if (expectedBuffer.length !== suppliedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, suppliedBuffer);
}

async function destroyUploadedAsset(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      type: "upload",
      invalidate: true,
    });
  } catch {
    console.error("Cloudinary cleanup failed.");
  }
}

export async function POST(request: Request) {
  const authResult = await requireActiveUser(request);

  if (!authResult.ok) {
    return NextResponse.json(
      { error: authResult.error },
      { status: authResult.status },
    );
  }

  try {
    let body: unknown;

    try {
      body = await readJsonBody(request, 8 * 1024);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "REQUEST_BODY_TOO_LARGE"
      ) {
        return NextResponse.json(
          { error: "Request body must not exceed 8 KB." },
          { status: 413 },
        );
      }

      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 },
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid upload data." },
        { status: 400 },
      );
    }

    const data = body as Record<string, unknown>;
    const publicId = data.publicId;
    const intentToken = data.intentToken;
    const originalName = data.originalName;

    if (typeof publicId !== "string" || !/^gd_[0-9a-f-]{36}$/.test(publicId)) {
      return NextResponse.json(
        { error: "Invalid upload identifier." },
        { status: 400 },
      );
    }

    if (typeof intentToken !== "string" || intentToken.length > 256) {
      return NextResponse.json(
        { error: "Invalid upload authorization." },
        { status: 400 },
      );
    }

    if (
      originalName !== undefined &&
      (typeof originalName !== "string" || originalName.length > 255)
    ) {
      return NextResponse.json(
        { error: "Original filename must not exceed 255 characters." },
        { status: 400 },
      );
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiSecret) {
      console.error("Cloudinary API secret is not configured.");

      return NextResponse.json(
        { error: "Image upload is currently unavailable." },
        { status: 500 },
      );
    }

    if (
      !verifyIntentToken(intentToken, authResult.user.id, publicId, apiSecret)
    ) {
      return NextResponse.json(
        { error: "Upload authorization is invalid or expired." },
        { status: 403 },
      );
    }

    let asset: Awaited<ReturnType<typeof cloudinary.api.resource>>;

    try {
      asset = await cloudinary.api.resource(publicId, {
        resource_type: "image",
        type: "upload",
      });
    } catch {
      return NextResponse.json(
        { error: "Uploaded image could not be verified." },
        { status: 400 },
      );
    }

    const isValidAsset =
      asset.public_id === publicId &&
      asset.asset_folder === ASSET_FOLDER &&
      asset.resource_type === "image" &&
      asset.type === "upload" &&
      asset.format === "webp" &&
      Number.isSafeInteger(asset.bytes) &&
      asset.bytes > 0 &&
      asset.bytes <= MAX_FILE_SIZE &&
      Number.isSafeInteger(asset.width) &&
      Number.isSafeInteger(asset.height) &&
      asset.width > 0 &&
      asset.height > 0 &&
      asset.width <= 2400 &&
      asset.height <= 2400 &&
      typeof asset.secure_url === "string" &&
      asset.secure_url.startsWith("https://res.cloudinary.com/");

    if (!isValidAsset) {
      await destroyUploadedAsset(publicId);

      return NextResponse.json(
        { error: "Uploaded image does not meet the required restrictions." },
        { status: 400 },
      );
    }

    const existingMedia = await prisma.media.findFirst({
      where: { publicId },
    });

    if (existingMedia) {
      return NextResponse.json({
        success: true,
        url: existingMedia.path,
        publicId: existingMedia.publicId,
      });
    }

    const rawName = typeof originalName === "string" ? originalName : "image";

    const sanitizedName =
      rawName
        .replace(/^.*[\\/]/, "")
        .replace(/[\u0000-\u001f\u007f]/g, "")
        .trim()
        .slice(0, 255) || "image";

    const filename = publicId.split("/").pop() || publicId;

    try {
      const media = await prisma.media.create({
        data: {
          filename,
          originalName: sanitizedName,
          mimeType: "image/webp",
          size: asset.bytes,
          path: asset.secure_url,
          width: asset.width,
          height: asset.height,
          publicId,
        },
      });

      return NextResponse.json({
        success: true,
        url: media.path,
        publicId: media.publicId,
      });
    } catch (error) {
      const isUniqueConstraintError =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002";

      if (isUniqueConstraintError) {
        const existingMedia = await prisma.media.findFirst({
          where: { publicId },
        });

        if (existingMedia) {
          return NextResponse.json({
            success: true,
            url: existingMedia.path,
            publicId: existingMedia.publicId,
          });
        }
      }

      await destroyUploadedAsset(publicId);
      throw error;
    }
  } catch {
    console.error("POST /api/upload/complete failed.");

    return NextResponse.json(
      { error: "Failed to finalize image upload." },
      { status: 500 },
    );
  }
}
