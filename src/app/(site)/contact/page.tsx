import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import { heroMedia } from "@/lib/media";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const CONTACT_FAQS = [
  { question: "How quickly does Rima Africa Safaris respond to enquiries?", answer: "Our specialists typically respond within one hour during business hours, and always within 24 hours. You speak to a person who has been to these places — not a chatbot or automated system." },
  { question: "Do you arrange safaris outside East Africa?", answer: "Yes. We cover East Africa (Kenya, Tanzania, Rwanda, Uganda, Ethiopia), the Indian Ocean Islands (Seychelles, Maldives, Mauritius, Zanzibar, Madagascar) and Central & Southern Africa (Botswana, Namibia, South Africa, Zambia, Zimbabwe)." },
  { question: "What is the best time of year for a Kenya safari?", answer: "The Great Migration river crossings in the Maasai Mara peak between July and October. For general wildlife viewing, the dry seasons from January to March and June to October are excellent. Kenya's wildlife is resident year-round." },
  { question: "Can Rima Africa Safaris arrange gorilla trekking permits?", answer: "Yes. We secure mountain gorilla trekking permits in Rwanda (Volcanoes National Park) and Uganda (Bwindi Impenetrable Forest). Permits are limited and must be booked months in advance — contact us early." },
  { question: "Do you offer family-friendly safaris?", answer: "Absolutely. We design bespoke family safaris with junior ranger programmes, family-friendly camps and activities suited to children of all ages. Many of our partner properties have minimum age requirements which we discuss at enquiry stage." },
];

export const metadata: Metadata = {
  title: "Contact Rima Africa Safaris | Begin Your Journey",
  description: "Speak to a safari specialist. Call, email or WhatsApp our team in Nairobi. Every conversation is the start of something extraordinary.",
  alternates: { canonical: "https://rimaafrica.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let us plan your"
        titleEm="next chapter."
        bgVideo={heroMedia.contact.video}
        bgImage={heroMedia.contact.image}
        overlayOpacity={0.42}
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Contact" },
        ]}
      />
      <ContactForm />
      <WhatsAppFloat />
    </>
  );
}