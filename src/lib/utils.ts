import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function r2Url(path: string): string {
  const base = process.env.NEXT_PUBLIC_R2_URL || "";
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (!base) return `https://placehold.co/800x600/2D4A35/F6F4F0?text=${encodeURIComponent(path.split("/").pop() || "image")}`;
  return `${base}/${path}`;
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}