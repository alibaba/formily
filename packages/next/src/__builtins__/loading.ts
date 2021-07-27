import { Message } from '@alifd/next'

export const loading = async (
  title: React.ReactNode = 'Loading...',
  processor: () => Promise<any>
) => {
  let loading = setTimeout(() => {
    Message.loading(title as any)
  }, 100)
  const results = await processor()
  Message.hide()
  clearTimeout(loading)
  return results
}
