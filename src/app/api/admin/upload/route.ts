import { NextResponse } from 'next/server';
import { commitFile } from '@/lib/github';

export const runtime = 'nodejs';

const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_PDF_BYTES = 5 * 1024 * 1024;

const RESUME_PATH = 'public/LovishSharma_FullStackEngineer_resume.pdf';

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'asset';
}

function checkMagic(buf: Buffer, kind: 'image' | 'resume'): { ok: boolean; ext?: string } {
  if (kind === 'resume') {
    return { ok: buf.slice(0, 4).toString('ascii') === '%PDF', ext: 'pdf' };
  }
  // image
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return { ok: true, ext: 'png' };
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { ok: true, ext: 'jpg' };
  if (buf.slice(0, 4).toString('ascii') === 'RIFF' && buf.slice(8, 12).toString('ascii') === 'WEBP') {
    return { ok: true, ext: 'webp' };
  }
  return { ok: false };
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const kind = url.searchParams.get('kind');
  if (kind !== 'image' && kind !== 'resume') {
    return NextResponse.json({ error: 'invalid kind' }, { status: 400 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'invalid form data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: 'file missing' }, { status: 400 });
  }

  const max = kind === 'image' ? MAX_IMAGE_BYTES : MAX_PDF_BYTES;
  if (file.size > max) {
    return NextResponse.json({ error: `file too large (max ${max / 1024 / 1024} MB)` }, { status: 413 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const magic = checkMagic(buf, kind);
  if (!magic.ok) {
    return NextResponse.json({ error: 'unsupported or corrupt file' }, { status: 400 });
  }

  const filename = (file as File).name ?? 'asset';
  let path: string;
  let publicPath: string;

  if (kind === 'resume') {
    path = RESUME_PATH;
    publicPath = '/LovishSharma_FullStackEngineer_resume.pdf';
  } else {
    const ts = Date.now();
    const finalName = `${slug(filename)}-${ts}.${magic.ext}`;
    path = `public/assets/images/${finalName}`;
    publicPath = `/assets/images/${finalName}`;
  }

  try {
    const commit = await commitFile({
      path,
      content: buf,
      message: `admin: upload ${path.split('/').pop()}`,
    });
    return NextResponse.json({ ok: true, path: publicPath, ...commit });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'commit failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export const config = {
  api: { bodyParser: false },
};
