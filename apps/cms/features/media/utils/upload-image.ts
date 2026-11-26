const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type SignResponse = {
  uploadUrl: string;
  apiKey: string;
  timestamp: number;
  publicId: string;
  assetFolder: string;
  uploadPreset: string;
  transformation: string;
  signature: string;
  intentToken: string;
  allowedFormats: string;
};

type CompleteResponse = {
  success: boolean;
  url: string;
  publicId: string;
};

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    throw new Error("The upload server returned an invalid response.");
  }
}

export async function uploadImage(file: File): Promise<CompleteResponse> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPEG, PNG, and WebP images are allowed.");
  }

  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    throw new Error(
      "Image size must be greater than 0 and must not exceed 10 MB.",
    );
  }

  const signResponse = await fetch("/api/upload/sign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contentType: file.type,
      size: file.size,
    }),
  });

  const signResult = await readJson(signResponse);

  if (!signResponse.ok) {
    throw new Error(
      typeof signResult.error === "string"
        ? signResult.error
        : "Failed to prepare image upload.",
    );
  }

  const signed = signResult as SignResponse;

  const cloudinaryForm = new FormData();
  cloudinaryForm.append("file", file);
  cloudinaryForm.append("api_key", signed.apiKey);
  cloudinaryForm.append("timestamp", String(signed.timestamp));
  cloudinaryForm.append("public_id", signed.publicId);
  cloudinaryForm.append("asset_folder", signed.assetFolder);
  cloudinaryForm.append("upload_preset", signed.uploadPreset);
  cloudinaryForm.append("transformation", signed.transformation);
  cloudinaryForm.append("allowed_formats", signed.allowedFormats);
  cloudinaryForm.append("signature", signed.signature);

  const cloudinaryResponse = await fetch(signed.uploadUrl, {
    method: "POST",
    body: cloudinaryForm,
  });

  const cloudinaryResult = await readJson(cloudinaryResponse);

  if (!cloudinaryResponse.ok) {
    throw new Error("Cloudinary image upload failed.");
  }

  const completeResponse = await fetch("/api/upload/complete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      publicId: signed.publicId,
      intentToken: signed.intentToken,
      originalName: file.name,
    }),
  });

  const completeResult = await readJson(completeResponse);

  if (!completeResponse.ok) {
    throw new Error(
      typeof completeResult.error === "string"
        ? completeResult.error
        : "Failed to finalize image upload.",
    );
  }

  return completeResult as CompleteResponse;
}
