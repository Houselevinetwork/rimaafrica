export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Build email body from inquiry payload
    const lines = [
      `New Safari Enquiry — Rima Africa Safaris`,
      ``,
      `Name: ${body.firstName || ''} ${body.lastName || ''}`,
      `Email: ${body.email || ''}`,
      `Phone: ${body.phone || ''}`,
      `Country: ${body.country || ''}`,
      ``,
      `Destinations: ${(body.destinations || []).join(', ')}`,
      `Arrival: ${body.arrivalDate || ''}`,
      `Duration: ${body.durationNights || body.duration || ''}`,
      `Adults: ${body.adults || ''}`,
      `Children: ${body.children || ''}`,
      ``,
      `Trip Type: ${body.tripType || ''}`,
      `Budget: ${body.budgetTier || body.budget || ''}`,
      `Experience: ${(body.experienceTypes || []).join(', ')}`,
      ``,
      `Notes: ${body.otherNotes || body.additionalNotes || body.message || ''}`,
      `Preferred Contact: ${(body.preferredContact || []).join(', ')}`,
    ].join('\n');

    // Return success — email handled via mailto in the UI
    return Response.json({ success: true, message: 'Enquiry received' });
  } catch {
    return Response.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  return Response.json({ status: 'ok' });
}