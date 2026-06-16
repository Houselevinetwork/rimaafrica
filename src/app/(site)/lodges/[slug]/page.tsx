import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Lodge | Rima Africa Safaris`,
    alternates: { canonical: `https://rimaafrica.com/lodges/${slug}` },
  };
}

export default async function LodgePage({ params }: Props) {
  await params;
  notFound();
}