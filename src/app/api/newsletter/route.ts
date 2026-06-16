export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return Response.json({ error: 'Email required' }, { status: 400 });
    }
    // Newsletter handled via mailto in the UI — no backend needed
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}