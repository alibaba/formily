import { Handler } from '@netlify/functions'
import qs from 'querystring'
import axios from 'axios'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET',
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }
  const params = qs.parse(event.rawQuery)
  const results = await axios.get(
    `https://www.npmjs.com/search/suggestions?q=${params.q}&size=100`
  )
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(results.data),
  }
}
