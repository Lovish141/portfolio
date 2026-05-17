/**
 * Tiny Octokit wrapper for committing files to the portfolio repo.
 * Server-only — never import from a client component.
 */
import { Octokit } from '@octokit/rest';

type GitHubEnv = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

function env(): GitHubEnv {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token) throw new Error('GITHUB_TOKEN is not set');
  if (!owner) throw new Error('GITHUB_REPO_OWNER is not set');
  if (!repo) throw new Error('GITHUB_REPO_NAME is not set');
  return { token, owner, repo, branch };
}

let _octokit: Octokit | null = null;
function octo(): Octokit {
  if (_octokit) return _octokit;
  _octokit = new Octokit({ auth: env().token });
  return _octokit;
}

const COMMIT_AUTHOR = {
  name: 'Lovish Sharma',
  email: 'slovish11sharma@gmail.com',
};

export async function getFile(path: string): Promise<{ content: string; sha: string } | null> {
  const { owner, repo, branch } = env();
  try {
    const res = await octo().repos.getContent({ owner, repo, path, ref: branch });
    if (Array.isArray(res.data) || res.data.type !== 'file') {
      throw new Error(`Path ${path} is not a file`);
    }
    const data = res.data as { content: string; encoding: string; sha: string };
    const buf = Buffer.from(data.content, data.encoding as BufferEncoding);
    return { content: buf.toString('utf-8'), sha: data.sha };
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'status' in err && (err as { status?: number }).status === 404) {
      return null;
    }
    throw err;
  }
}

export async function commitFile(args: {
  path: string;
  content: string | Buffer;
  message: string;
}): Promise<{ commitSha: string; commitUrl: string; fileSha: string }> {
  const { owner, repo, branch } = env();
  const { path, content, message } = args;

  // Need the existing SHA when updating; null on create.
  let existingSha: string | null = null;
  try {
    const res = await octo().repos.getContent({ owner, repo, path, ref: branch });
    if (!Array.isArray(res.data) && res.data.type === 'file') {
      existingSha = (res.data as { sha: string }).sha;
    }
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'status' in err && (err as { status?: number }).status !== 404) {
      throw err;
    }
  }

  const buf = typeof content === 'string' ? Buffer.from(content, 'utf-8') : content;
  const res = await octo().repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message,
    content: buf.toString('base64'),
    branch,
    sha: existingSha ?? undefined,
    committer: COMMIT_AUTHOR,
    author: COMMIT_AUTHOR,
  });

  const commit = res.data.commit;
  const file = res.data.content;
  return {
    commitSha: commit.sha ?? '',
    commitUrl: commit.html_url ?? '',
    fileSha: file?.sha ?? '',
  };
}

export async function getLatestCommit(): Promise<{
  sha: string;
  url: string;
  message: string;
  author: string;
  date: string;
} | null> {
  const { owner, repo, branch } = env();
  const res = await octo().repos.listCommits({ owner, repo, sha: branch, per_page: 1 });
  const c = res.data[0];
  if (!c) return null;
  return {
    sha: c.sha,
    url: c.html_url,
    message: c.commit.message,
    author: c.commit.author?.name ?? 'unknown',
    date: c.commit.author?.date ?? '',
  };
}
