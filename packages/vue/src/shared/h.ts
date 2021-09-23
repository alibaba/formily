import { h, isVue2 } from 'vue-demi'
import { Fragment, FragmentComponent } from './fragment'

type RenderChildren = {
  [key in string]?: (...args: any[]) => (VNode | string)[]
}

// TODO: need to compatible with vue2 & vue3
type Tag = any
type VNodeData = Record<string, any>
type VNode = any
type VNodeChildren = any

const compatibleCreateElement = (
  tag: Tag,
  data: VNodeData,
  components: RenderChildren
): any => {
  /* istanbul ignore else */
  if (isVue2) {
    const hInVue2 = h as (
      tag: Tag,
      data?: VNodeData,
      components?: VNodeChildren
    ) => VNode
    const scopedSlots = components // 默认全部作为 scopedSlots 处理
    const children = []

    /**
     * scopedSlots 不会映射为slots，所以这里手动映射一遍
     * 主要为了解决 slots.x 问题
     */
    Object.keys(components).forEach((key) => {
      const func = components[key]

      // 转换为 slots 传递
      if (typeof func === 'function' && func.length === 0) {
        /**
         * func 参数为0的判断不准确，因为composition-api包了一层，导致全部为0
         * try catch 解决scoped slots 转换参数异常问题
         * */
        try {
          const child = func()
          children.push(
            key === 'default'
              ? child
              : hInVue2(FragmentComponent, { slot: key }, [child])
          )
        } catch (error) {}
      }
    })
    const newData = Object.assign({}, data)
    if (Object.keys(scopedSlots).length > 0) {
      if (!newData.scopedSlots) {
        newData.scopedSlots = scopedSlots
      } else {
        newData.scopedSlots = {
          ...newData.scopedSlots,
          ...scopedSlots,
        }
      }
    }
    if (tag === Fragment) {
      if (Object.keys(newData).length === 0 && children.length === 1) {
        if (!Array.isArray(children[0])) {
          return children[0]
        } else if (children[0].length === 1) {
          return children[0][0]
        }
      }
      tag = FragmentComponent
    }
    return hInVue2(tag, newData, children)
  } else {
    if (tag === Fragment) {
      tag = FragmentComponent
    }
    const hInVue3 = h as (
      tag: Tag,
      data?: VNodeData,
      components?: RenderChildren
    ) => VNode
    const newData = {}
    Object.keys(data).forEach((key) => {
      if (key === 'on') {
        if (data[key]) {
          const events = Object.keys(data[key])
          events.forEach((event) => {
            const eventName = `on${event[0].toUpperCase()}${event.slice(1)}`
            newData[eventName] = data[key][event]
          })
        }
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        Object.assign(newData, data[key])
      } else {
        newData[key] = data[key]
      }
    })
    return hInVue3(tag, newData, components)
  }
}

export default compatibleCreateElement

export { compatibleCreateElement as h }
