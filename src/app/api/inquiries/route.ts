import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const body = `
NEW SAFARI ENQUIRY � RIMA AFRICA SAFARIS
=========================================
Name:      ${data.firstName || "Not provided"}
Email:     ${data.email}
Phone:     ${data.phone || "Not provided"}
Contact:   ${(data.preferredContact||[]).join(", ")}

TRIP
Destinations: ${(data.destinations||[]).join(", ") || "To be discussed"}
Arrival:      ${data.arrivalDate || "Flexible"}
Duration:     ${data.durationNights ? data.durationNights + " nights" : "Flexible"}
Approximate:  ${data.datesApproximate ? "Yes" : "No"}

PARTY
Adults:    ${data.adults || 2}
Children:  ${data.children || 0}
Trip type: ${data.tripType || "Not specified"}

EXPERIENCE
First safari: ${data.firstTimeSafari ? "Yes" : "No"}
Budget:       ${data.budgetTier || "Not specified"}

NOTES
${data.otherNotes || "None"}
=========================================
Received: ${new Date().toISOString()}`.trim();

    const key = process.env.RESEND_API_KEY;
    if (key && key !== "re_your_resend_key") {
      // Send to team
      await fetch("https://api.resend.com/emails", {
        method:"POST",
        headers:{ "Authorization":`Bearer ${key}`, "Content-Type":"application/json" },
        body: JSON.stringify({
          from: `Rima Africa <${process.env.RESEND_FROM_EMAIL||"safaris@rimaafrica.com"}>`,
          to:   [process.env.RESEND_TO_EMAIL||"safaris@rimaafrica.com"],
          subject: `New Safari Enquiry � ${data.firstName||"Guest"} (${(data.destinations||[]).join(", ")||"Undecided"})`,
          text: body
        })
      });
      // Auto-reply to client
      if (data.email) {
        await fetch("https://api.resend.com/emails", {
          method:"POST",
          headers:{ "Authorization":`Bearer ${key}`, "Content-Type":"application/json" },
          body: JSON.stringify({
            from: `Rima Africa <${process.env.RESEND_FROM_EMAIL||"safaris@rimaafrica.com"}>`,
            to: [data.email],
            subject: "Your safari enquiry � Rima Africa Safaris",
            text: `Dear ${data.firstName||"Explorer"},\n\nThank you for reaching out to Rima Africa Safaris.\n\nYour enquiry has been received. A member of our team will be in touch within 4 hours during East Africa business hours.\n\nYou can also reach us directly via WhatsApp: +254 714 728 554\n\nWarm regards,\nThe Rima Africa Team\nsafaris@rimaafrica.com`
          })
        });
      }
    }
    return NextResponse.json({ success:true });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json({ success:false }, { status:500 });
  }
}
