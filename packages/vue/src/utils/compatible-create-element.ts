import { h, isVue2 } from 'vue-demi';
import { Component, AsyncComponent, VNodeData, VNode, VNodeChildren } from 'vue';

type RenderChildren = {
  [key in string]?: (...args: any[]) => VNode[];
}

type Tag = string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component)

const compatibleCreateElement = (tag: Tag, data: VNodeData, components: RenderChildren) => {
  if (isVue2) {
    const hInVue2 = h as ((tag: Tag, data: VNodeData, components: VNodeChildren) => VNode)
    const scopedSlots = {}
    const children = []
    Object.keys(components).forEach(key => {
      const func = components[key]
      if (func.length !== 0) {
        scopedSlots[key] = func
      } else {
        children.push(components[key]())
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
    const hInVue3 = h as ((tag: Tag, data: VNodeData, components: RenderChildren) => VNode)
    const newData = {}
    Object.assign(newData, data.props, data.attrs)
    if (data.on) {
      const events = Object.keys(data.on)
      events.forEach(event => {
        const eventName = `on${event[0].toUpperCase()}${event.slice(1)}`
        newData[eventName] = data.on[event]
      })
    }
    return hInVue3(tag, newData, components)
  }
}

export default compatibleCreateElement

export {
  compatibleCreateElement as h
}
