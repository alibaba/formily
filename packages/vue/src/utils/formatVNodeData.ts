import { each } from '@formily/shared'

type VNodeData = Record<string, any>

export const formatVue3VNodeData = (data: VNodeData) => {
  const newData = {}
  each(data, (value, key) => {
    if (key === 'on' || key === 'nativeOn') {
      if (value) {
        each(value, (func, name) => {
          const eventName = `on${
            key === 'on' ? name[0].toUpperCase() : name[0]
          }${name.slice(1)}`
          newData[eventName] = func
        })
      }
    } else if (key === 'attrs' || key === 'props' || key === 'domProps') {
      Object.assign(newData, value)
    } else {
      newData[key] = value
    }
  })
  return newData
}
