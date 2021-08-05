import { message } from 'antd'

export const loading = async (
  title: React.ReactNode = 'Loading...',
  processor: () => Promise<any>
) => {
  let hide = null
  let loading = setTimeout(() => {
    hide = message.loading(title)
  }, 100)
  try {
    return await processor()
  } finally {
    hide?.()
    clearTimeout(loading)
  }
}
