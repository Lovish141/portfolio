/**
 * Stateless session for the admin panel.
 *
 * Token format: `<expEpochMs>.<base64url HMAC-SHA256(exp, AUTH_SECRET)>`
 * Stored in `admin_session` cookie (httpOnly, Secure, SameSite=Strict).
 *
 * Uses Web Crypto so this module works in both Node (route handlers) and
 * Edge runtimes (middleware).
 */

export const SESSION_COOKIE = 'admin_session';
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

const enc = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = '';
  for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(str: string): Uint8Array {
  const pad = str.length % 4 === 0 ? 0 : 4 - (str.length % 4);
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat(pad);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET is not set');
  }
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function signSession(expMs: number = Date.now() + SESSION_TTL_MS): Promise<string> {
  const key = await getKey();
  const expStr = String(expMs);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(expStr));
  return `${expStr}.${toBase64Url(sig)}`;
}

export async function verifySession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot < 0) return false;
  const expStr = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  const expMs = Number(expStr);
  if (!Number.isFinite(expMs)) return false;
  if (Date.now() > expMs) return false;

  const key = await getKey();
  let sig: Uint8Array;
  try {
    sig = fromBase64Url(sigB64);
  } catch {
    return false;
  }
  try {
    return await crypto.subtle.verify('HMAC', key, sig as BufferSource, enc.encode(expStr));
  } catch {
    return false;
  }
}

export async function constantTimeEqualString(a: string, b: string): Promise<boolean> {
  // Hash both before comparing so length isn't a side channel and the compare
  // operates on equal-length buffers.
  const [ha, hb] = await Promise.all([
    crypto.subtle.digest('SHA-256', enc.encode(a)),
    crypto.subtle.digest('SHA-256', enc.encode(b)),
  ]);
  const ua = new Uint8Array(ha);
  const ub = new Uint8Array(hb);
  if (ua.length !== ub.length) return false;
  let diff = 0;
  for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i];
  return diff === 0;
}
