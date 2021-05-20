import execa from 'execa'
import semver from 'semver'

export async function changedPaths(sha: string): Promise<string[]> {
  const result = await execa('git', [
    'show',
    '-m',
    '--name-only',
    '--pretty=format:',
    '--first-parent',
    sha,
  ])
  return result.stdout.split('\n')
}

export function getSortableAllTags() {
  return execa
    .sync('git', ['tag', '-l'])
    .stdout.split(/\n/)
    .sort((a, b) => {
      const v1 = a.replace(/^v/, '')
      const v2 = b.replace(/^v/, '')
      return semver.gte(v1, v2) ? -1 : 1
    })
}

export function getCurrentBranch() {
  return execa.sync('git', ['branch', '--show-current']).stdout
}

export function getTaggedTime(tag: string) {
  return execa.sync('git', ['log', '-1', '--format=%ai', tag]).stdout
}

export function getGithubToken() {
  return process.env.GITHUB_AUTH
}
/**
 * All existing tags in the repository
 */
export function listTagNames(): string[] {
  return execa.sync('git', ['tag']).stdout.split('\n').filter(Boolean)
}

/**
 * The latest reachable tag starting from HEAD
 */
export function lastTag(): string {
  return execa.sync('git', ['describe', '--abbrev=0', '--tags']).stdout
}

export function getPreviousTag(current: string): string {
  return execa.sync('git', ['describe', '--abbrev=0', '--tags', current + '^'])
    .stdout
}

export interface CommitListItem {
  sha: string
  refName: string
  summary: string
  date: string
  author: string
}

export function parseLogMessage(commit: string): CommitListItem | null {
  const parts =
    commit.match(
      /hash<(.+)> ref<(.*)> message<(.*)> date<(.*)> author<(.*)>/
    ) || []

  if (!parts || parts.length === 0) {
    return null
  }

  return {
    sha: parts[1],
    refName: parts[2],
    summary: parts[3],
    date: parts[4],
    author: parts[5],
  }
}

export function listCommits(from: string, to = ''): CommitListItem[] {
  // Prints "hash<short-hash> ref<ref-name> message<summary> date<date>"
  // This format is used in `getCommitInfos` for easily analize the commit.
  return execa
    .sync('git', [
      'log',
      '--oneline',
      '--pretty="hash<%h> ref<%D> message<%s> date<%cd> author<%an>"',
      '--date=short',
      `${from}..${to}`,
    ])
    .stdout.split('\n')
    .filter(Boolean)
    .map(parseLogMessage)
    .filter(Boolean)
}
