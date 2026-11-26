import { createHmac, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { requireActiveUser } from "@/lib/auth-guard";
import cloudinary from "@/lib/cloudinary";
import { readJsonBody } from "@/lib/utils/read-json-body";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UPLOAD_PRESET = "graildaily_articles";
const ASSET_FOLDER = "articles";
const TRANSFORMATION = "t_gd_article_upload";
const ALLOWED_FORMATS = "jpg,png,webp";
const INTENT_TTL_SECONDS = 10 * 60;

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
      body = await readJsonBody(request, 4 * 1024);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "REQUEST_BODY_TOO_LARGE"
      ) {
        return NextResponse.json(
          { error: "Request body must not exceed 4 KB." },
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
    const contentType = data.contentType;
    const size = data.size;

    if (
      typeof contentType !== "string" ||
      !ALLOWED_TYPES.includes(contentType)
    ) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, and WebP images are allowed." },
        { status: 400 },
      );
    }

    if (typeof size !== "number" || !Number.isSafeInteger(size) || size <= 0) {
      return NextResponse.json(
        { error: "Invalid file size." },
        { status: 400 },
      );
    }

    if (size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Image size must not exceed 10 MB." },
        { status: 413 },
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary upload configuration is incomplete.");

      return NextResponse.json(
        { error: "Image upload is currently unavailable." },
        { status: 500 },
      );
    }

    const publicId = `gd_${randomUUID()}`;
    const timestamp = Math.floor(Date.now() / 1000);
    const expiresAt = timestamp + INTENT_TTL_SECONDS;

    const uploadParams = {
      timestamp,
      public_id: publicId,
      asset_folder: ASSET_FOLDER,
      upload_preset: UPLOAD_PRESET,
      transformation: TRANSFORMATION,
      allowed_formats: ALLOWED_FORMATS,
    };

    const signature = cloudinary.utils.api_sign_request(
      uploadParams,
      apiSecret,
    );

    const intentSignature = createHmac("sha256", apiSecret)
      .update(`${authResult.user.id}:${publicId}:${expiresAt}`)
      .digest("base64url");

    const intentToken = `${expiresAt}.${intentSignature}`;

    return NextResponse.json({
      uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      apiKey,
      timestamp,
      publicId,
      assetFolder: ASSET_FOLDER,
      uploadPreset: UPLOAD_PRESET,
      transformation: TRANSFORMATION,
      allowedFormats: ALLOWED_FORMATS,
      signature,
      intentToken,
    });
  } catch {
    console.error("POST /api/upload/sign failed.");

    return NextResponse.json(
      { error: "Failed to prepare image upload." },
      { status: 500 },
    );
  }
}
