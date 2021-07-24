import { message } from 'antd'

export const loading = async (processor: () => Promise<any>) => {
  let hide = null
  let loading = setTimeout(() => {
    hide = message.loading('Loading...')
  }, 100)
  const results = await processor()
  hide?.()
  clearTimeout(loading)
  return results
}
