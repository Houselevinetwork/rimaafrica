export const vid = {
  hero: () => `${process.env.NEXT_PUBLIC_R2_URL || ""}/videos/hero/main-hero.mp4`,
  destination: (slug: string) => `${process.env.NEXT_PUBLIC_R2_URL || ""}/videos/destinations/${slug}-hero.mp4`,
};

export function r2(path: string): string {
  const base = process.env.NEXT_PUBLIC_R2_URL || "";
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (!base) return `https://placehold.co/1440x900/2D4A35/F6F4F0?text=${encodeURIComponent("Rima+Africa")}`;
  return `${base}/${path}`;
}