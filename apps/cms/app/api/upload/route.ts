import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "articles",
          },
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
        .end(buffer);
    });

    console.log("=== Prisma Delegates ===");
    console.log("article:", typeof prisma.article);
    console.log("media:", typeof prisma.media);
    console.log(Object.keys(prisma));

    await prisma.media.create({
      data: {
        filename: result.public_id.split("/").pop() ?? result.public_id,

        originalName: file.name,

        mimeType: file.type,

        size: file.size,

        path: result.secure_url,

        publicId: result.public_id,

        width: result.width,

        height: result.height,
      },
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      },
    );
  }
}
