import { Message } from '@alifd/next'

export const loading = async (processor: () => Promise<any>) => {
  let loading = setTimeout(() => {
    Message.loading('Loading...')
  }, 100)
  const results = await processor()
  Message.hide()
  clearTimeout(loading)
  return results
}
