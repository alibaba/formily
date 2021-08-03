import { Handler } from '@netlify/functions'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
  auth: process.env.GITHUB_TOKEN,
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET',
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  return {
    statusCode: 200,
    headers,
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
