import { NextResponse } from 'next/server';
import {
  SECTIONS,
  sectionSchemas,
  PortfolioSchema,
  type Section,
} from '@/lib/portfolio-schema';
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

  const sections = (body as { sections?: unknown }).sections;
  if (!sections || typeof sections !== 'object' || Array.isArray(sections)) {
    return NextResponse.json({ error: 'sections object required' }, { status: 400 });
  }

  const entries = Object.entries(sections as Record<string, unknown>);
  if (entries.length === 0) {
    return NextResponse.json({ error: 'no sections to publish' }, { status: 400 });
  }

  // Validate each staged section against its own schema first.
  const validated: Partial<Record<Section, unknown>> = {};
  for (const [section, data] of entries) {
    if (!isSection(section)) {
      return NextResponse.json(
        { error: `unknown section: ${section}` },
        { status: 400 }
      );
    }
    const result = sectionSchemas[section].safeParse(data);
    if (!result.success) {
      return NextResponse.json(
        { error: `validation failed in ${section}`, issues: result.error.issues },
        { status: 400 }
      );
    }
    validated[section] = result.data;
  }

  // Fetch latest JSON from the repo so we don't clobber other sections.
  const file = await getFile(PORTFOLIO_PATH);
  if (!file) {
    return NextResponse.json(
      { error: 'portfolio.json missing in repo' },
      { status: 500 }
    );
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(file.content);
  } catch {
    return NextResponse.json(
      { error: 'portfolio.json malformed in repo' },
      { status: 500 }
    );
  }

  // Merge staged sections into the parsed document.
  for (const [section, data] of Object.entries(validated)) {
    parsed[section] = data;
  }

  // Validate the whole document.
  const fullParse = PortfolioSchema.safeParse(parsed);
  if (!fullParse.success) {
    return NextResponse.json(
      {
        error: 'document validation failed after merge',
        issues: fullParse.error.issues,
      },
      { status: 400 }
    );
  }

  const newContent = JSON.stringify(fullParse.data, null, 2) + '\n';
  if (newContent === file.content) {
    return NextResponse.json({ ok: true, unchanged: true });
  }

  const sectionList = Object.keys(validated).sort().join(', ');
  const message = `admin: update ${sectionList}`;

  try {
    const commit = await commitFile({
      path: PORTFOLIO_PATH,
      content: newContent,
      message,
    });
    return NextResponse.json({
      ok: true,
      sections: Object.keys(validated),
      ...commit,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'commit failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
