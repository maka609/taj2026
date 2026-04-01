import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Optimize and transform image URLs using Supabase transformations
 * Usage: getOptimizedImage(url, { width: 100, height: 100 })
 */
export function getOptimizedImage(url: string | null | undefined, options: { width?: number; height?: number; quality?: number } = {}) {
  if (!url) return "";
  if (!url.includes("supabase.co/storage/v1/object/public/")) return url;

  const { width, height, quality = 80 } = options;
  const params = [];
  if (width) params.push(`width=${width}`);
  if (height) params.push(`height=${height}`);
  params.push(`quality=${quality}`);
  params.push(`format=webp`);

  return `${url}?${params.join("&")}`;
}
