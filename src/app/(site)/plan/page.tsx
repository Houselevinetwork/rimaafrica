import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PlanForm from "@/components/ui/PlanForm";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Plan a Safari | Begin Your Journey with Rima Africa",
  description: "Tell us where you want to go and how you want to travel. Our specialists will design a journey that is entirely yours.",
  alternates: { canonical: "https://rimaafrica.com/plan" },
};

export default function PlanPage() {
  return (
    <>
      <PageHero
        title="Begin your"
        titleEm="journey."
        bgVideo={heroMedia.plan.video}
        bgImage={heroMedia.plan.image}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Plan a Safari" },
        ]}
      />
      <PlanForm />
      <WhatsAppFloat />
    </>
  );
}