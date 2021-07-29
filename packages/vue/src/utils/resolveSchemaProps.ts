import { paramCase } from '@formily/shared'

export const resolveSchemaProps = (props: Record<string, any>) => {
  const newProps = {}
  Object.keys(props).forEach((key) => {
    if (key.indexOf('x') === 0 && key.indexOf('x-') === -1) {
      newProps[paramCase(key)] = props[key]
    } else {
      newProps[key] = props[key]
    }
  })
  return newProps
}
