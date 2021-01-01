export const usePrefixCls = (
  tag?: string,
  props?: {
    prefix?: string
  }
) => {
  return props?.prefix ? props?.prefix : `next${tag ? `-${tag}` : ''}`
}
