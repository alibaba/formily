import { Loading } from 'element-ui'

export const loading = async (
  loadingText = 'Loading...',
  processor: () => Promise<any>
) => {
  let loadingInstance = null
  let loading = setTimeout(() => {
    loadingInstance = Loading.service({
      text: loadingText,
      background: 'transparent',
    })
  }, 100)
  try {
    return await processor()
  } finally {
    loadingInstance?.close()
    clearTimeout(loading)
  }
}
