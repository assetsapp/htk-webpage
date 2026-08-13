import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function GET() {
  const secret = process.env.FORM_SECRET;
  if (!secret) return NextResponse.json({ token: '' }, { status: 500 });
  const ts = Date.now().toString();
  const sig = createHmac('sha256', secret).update(ts).digest('hex');
  return NextResponse.json({ token: `${ts}.${sig}` });
}
