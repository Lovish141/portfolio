import { NextResponse } from 'next/server';
import { SECTIONS, sectionSchemas, PortfolioSchema, type Section } from '@/lib/portfolio-schema';
import { getFile, commitFile } from '@/lib/github';

export const runtime = 'nodejs';

const PORTFOLIO_PATH = 'src/data/portfolio.json';

function isSection(s: unknown): s is Section {
  return typeof s === 'string' && (SECTIONS as readonly string[]).includes(s);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 });
  }

  const section = (body as { section?: unknown }).section;
  const data = (body as { data?: unknown }).data;

  if (!isSection(section)) {
    return NextResponse.json({ error: 'invalid section' }, { status: 400 });
  }

  const sectionParse = sectionSchemas[section].safeParse(data);
  if (!sectionParse.success) {
    return NextResponse.json(
      { error: 'validation', issues: sectionParse.error.issues },
      { status: 400 }
    );
  }

  // Read latest from GitHub so concurrent edits don't clobber other sections.
  const file = await getFile(PORTFOLIO_PATH);
  if (!file) {
    return NextResponse.json({ error: 'portfolio.json missing in repo' }, { status: 500 });
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(file.content);
  } catch {
    return NextResponse.json({ error: 'portfolio.json malformed in repo' }, { status: 500 });
  }

  parsed[section] = sectionParse.data;

  const fullParse = PortfolioSchema.safeParse(parsed);
  if (!fullParse.success) {
    return NextResponse.json(
      { error: 'document validation failed after merge', issues: fullParse.error.issues },
      { status: 400 }
    );
  }

  const newContent = JSON.stringify(fullParse.data, null, 2) + '\n';
  if (newContent === file.content) {
    return NextResponse.json({ ok: true, unchanged: true });
  }

  try {
    const commit = await commitFile({
      path: PORTFOLIO_PATH,
      content: newContent,
      message: `admin: update ${section}`,
    });
    return NextResponse.json({ ok: true, ...commit });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'commit failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
