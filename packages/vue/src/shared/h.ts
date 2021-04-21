import { h, isVue2 } from 'vue-demi';
import { Fragment, FragmentComponent } from './fragment'
import type { VNodeChildren as Vue2VNodeChildren } from '../types/vue2';

type RenderChildren = {
  [key in string]?: (...args: any[]) => (VNode | string)[];
}

type Tag = any
type VNodeData = Record<string, any>
type VNode = any
type VNodeChildren = Vue2VNodeChildren | RenderChildren

const compatibleCreateElement = (tag: Tag, data: VNodeData, components: RenderChildren): any => {
  if (isVue2) {
    if (tag === Fragment) {
      tag = FragmentComponent
    }
    const hInVue2 = h as ((tag: Tag, data: VNodeData, components: VNodeChildren) => VNode)
    const scopedSlots = {}
    const children = []
    Object.keys(components).forEach(key => {
      const func = components[key]
      if (typeof func === 'function') {
        if (func.length !== 0) {
          scopedSlots[key] = func
        } else {
          children.push(components[key]())
        }
      }
      
    })
    const newData = Object.assign({}, data)
    if (Object.keys(scopedSlots).length > 0) {
      if (!newData.scopedSlots) {
        newData.scopedSlots = scopedSlots
      } else {
        newData.scopedSlots = {
          ...newData.scopedSlots,
          ...scopedSlots
        }
      }
    }
    return hInVue2(tag, newData, children)
  } else {
    if (tag === Fragment) {
      tag = FragmentComponent
    }
    const hInVue3 = h as ((tag: Tag, data?: VNodeData, components?: RenderChildren) => VNode)
    const newData = {}
    Object.keys(data).forEach(key => {
      if (key === 'on') {
        if (data[key]) {
          const events = Object.keys(data[key])
          events.forEach(event => {
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

export {
  compatibleCreateElement as h
}
