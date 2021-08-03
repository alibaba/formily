import { Handler } from '@netlify/functions'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: process.env.GITHUB_TOKEN,
})

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      await octokit.repos.listContributors({
        owner: 'alibaba',
        repo: 'formily',
        per_page: 1000,
        page: 1,
      })
    ),
  }
}
