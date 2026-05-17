import { NextResponse } from 'next/server';
import { constantTimeEqualString, signSession, SESSION_COOKIE, SESSION_TTL_MS } from '@/lib/auth';

export const runtime = 'nodejs';

const FAIL_DELAY_MS = 250;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const password = (body as { password?: unknown })?.password;
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: 'server misconfigured' }, { status: 500 });
  }
  if (typeof password !== 'string') {
    await sleep(FAIL_DELAY_MS);
    return NextResponse.json({ error: 'invalid password' }, { status: 400 });
  }

  const ok = await constantTimeEqualString(password, expected);
  if (!ok) {
    await sleep(FAIL_DELAY_MS);
    return NextResponse.json({ error: 'invalid password' }, { status: 401 });
  }

  const token = await signSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return res;
}
