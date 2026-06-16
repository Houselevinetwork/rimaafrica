import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import TravelByContinent from "@/components/sections/TravelByContinent";
import WhyUsSection from "@/components/sections/WhyUsSection";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Rima Africa Safaris | Luxury Bespoke Safari Experiences",
  description: "Rima Africa Safaris designs bespoke private journeys across East Africa, Southern Africa and the Indian Ocean Islands. Born in Nairobi, Kenya.",
  alternates: { canonical: "https://rimaafrica.com" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TravelByContinent />
      <WhyUsSection />
      <WhatsAppFloat />
    </>
  );
}