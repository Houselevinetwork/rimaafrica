export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  return Response.json({ status: 'ok' });
}