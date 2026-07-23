import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function GET() {
  const ts = Date.now().toString();
  const sig = createHmac('sha256', process.env.FORM_SECRET!)
    .update(ts)
    .digest('hex');
  return NextResponse.json({ token: `${ts}.${sig}` });
}
