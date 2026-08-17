import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
export async function POST(request: NextRequest) {
  let uploadedPublicId: string | null = null;
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);
    const optimizedBuffer = await sharp(inputBuffer)
      .rotate()
      .resize({
        width: 2400,
        height: 2400,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer();
    console.log("=== IMAGE OPTIMIZATION ===");
    console.log("Original:", file.size, "bytes");
    console.log("Optimized:", optimizedBuffer.length, "bytes");
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "articles", format: "webp" },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            if (!result) {
              return reject(
                new Error("Cloudinary did not return an upload result."),
              );
            }
            resolve(result);
          },
        )
        .end(optimizedBuffer);
    });
    uploadedPublicId = result.public_id;

    try {
      await prisma.media.create({
        data: {
          filename: result.public_id.split("/").pop() ?? result.public_id,
          originalName: file.name,
          mimeType: "image/webp",
          size: optimizedBuffer.length,
          path: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
        },
      });
    } catch (databaseError) {
      console.error("Media database creation failed:", databaseError);
      if (uploadedPublicId) {
        try {
          const cleanupResult =
            await cloudinary.uploader.destroy(uploadedPublicId);
          console.log("=== CLOUDINARY ROLLBACK ===");
          console.log({ publicId: uploadedPublicId, result: cleanupResult });
        } catch (cleanupError) {
          console.error("Failed to rollback Cloudinary upload:", cleanupError);
        }
      }
      throw databaseError;
    }
    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("POST /api/upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
