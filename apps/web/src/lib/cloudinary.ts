export type CloudinaryImageOptions = {
  width?: number;
  height?: number;
  crop?: "limit" | "fill" | "fit" | "scale";
};

export function getCloudinaryImageUrl(
  url: string | null | undefined,
  options: CloudinaryImageOptions = {},
): string | undefined {
  if (!url) return undefined;

  if (!url.includes("res.cloudinary.com/")) {
    return url;
  }

  const { width, height, crop = "limit" } = options;

  const transformations = [
    "f_auto",
    "q_auto",
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    width || height ? `c_${crop}` : null,
  ].filter(Boolean);

  if (transformations.length === 2) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    `/image/upload/${transformations.join(",")}/`,
  );
}

export function getCloudinaryImageSrcSet(
  url: string | null | undefined,
  widths: number[],
  options: Omit<CloudinaryImageOptions, "width"> = {},
): string | undefined {
  if (!url) return undefined;

  return widths
    .map((width) => {
      const imageUrl = getCloudinaryImageUrl(url, {
        ...options,
        width,
      });

      return imageUrl ? `${imageUrl} ${width}w` : null;
    })
    .filter(Boolean)
    .join(", ");
}
