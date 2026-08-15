/**
 * Image Optimization & Cloudinary Delivery Engine
 * Automatically applies modern WebP/AVIF format negotiation (f_auto),
 * intelligent compression (q_auto:good), responsive width capping,
 * and ultra-fast micro placeholder generation.
 */

export interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "auto:best" | "auto:good" | "auto:eco" | "auto:low" | number;
  format?: "auto" | "webp" | "avif" | "jpg";
  crop?: "limit" | "scale" | "fill" | "fit" | "thumb";
  blur?: number;
  dpr?: "auto" | number;
}

/**
 * Transforms any Cloudinary URL into a high-performance, compressed, responsive asset.
 * If the URL is not from Cloudinary, returns the original URL untouched.
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  options: OptimizeOptions = {}
): string {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  const {
    width,
    height,
    quality = "auto:good",
    format = "auto",
    crop = "limit",
    blur,
    dpr = "auto",
  } = options;

  const transforms: string[] = [];

  // 1. Format & Quality
  transforms.push(`f_${format}`);
  transforms.push(`q_${quality}`);

  // 2. Responsive dimensions
  if (width) {
    transforms.push(`w_${Math.round(width)}`);
  }
  if (height) {
    transforms.push(`h_${Math.round(height)}`);
  }
  if (width || height) {
    transforms.push(`c_${crop}`);
  }

  // 3. Blur for progressive placeholder loading
  if (blur) {
    transforms.push(`e_blur:${blur}`);
  }

  // 4. Device Pixel Ratio
  if (dpr) {
    transforms.push(`dpr_${dpr}`);
  }

  const transformString = transforms.join(",");

  // Check if URL already has transformation segment between /upload/ and /v... or filename
  // Pattern: /upload/(existing_transforms/)?v12345/
  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return url;

  const prefix = url.substring(0, uploadIndex + 8); // includes '/upload/'
  const rest = url.substring(uploadIndex + 8);

  // If rest starts with an existing transformation (does not start with 'v' followed by digits)
  if (/^v\d+\//.test(rest)) {
    return `${prefix}${transformString}/${rest}`;
  } else if (/^[a-z]_[^/]+\//i.test(rest)) {
    // Replace existing transformation
    const nextSlash = rest.indexOf("/");
    const afterTransform = rest.substring(nextSlash + 1);
    return `${prefix}${transformString}/${afterTransform}`;
  }

  return `${prefix}${transformString}/${rest}`;
}

/**
 * Generates an ultra-fast ~300 byte blurred micro thumbnail for progressive loading.
 */
export function getLowResPlaceholderUrl(url: string): string {
  return getOptimizedCloudinaryUrl(url, {
    width: 36,
    quality: "auto:low",
    blur: 250,
    crop: "scale",
  });
}

/**
 * Generates responsive srcset attribute string for standard viewport breakpoints
 */
export function getCloudinarySrcSet(
  url: string,
  widths: number[] = [360, 640, 960, 1280]
): string {
  if (!url || !url.includes("res.cloudinary.com")) return "";
  return widths
    .map((w) => `${getOptimizedCloudinaryUrl(url, { width: w })} ${w}w`)
    .join(", ");
}
