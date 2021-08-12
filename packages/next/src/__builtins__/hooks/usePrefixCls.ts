import { ConfigProvider } from '@alifd/next'

export const usePrefixCls = (
  tag?: string,
  props?: {
    prefix?: string
  }
) => {
  const getContext = ConfigProvider['getContext']
  return props?.prefix ?? getContext()?.prefix ?? `next${tag ? `-${tag}` : ''}`
}
