import { h, isVue2, SetupContext } from 'vue-demi';
import { Component, AsyncComponent, VNodeData, VNode, VNodeChildren } from 'vue';
import { Fragment, FragmentComponent } from './fragment'

type RenderChildren = {
  [key in string]?: (...args: any[]) => (VNode | string)[];
}

type Tag = string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component) | ((props: any, context: SetupContext) => SetupContext['slots'])

const compatibleCreateElement = (tag: Tag, data: VNodeData, components: RenderChildren) => {
  if (isVue2) {
    if (tag === Fragment) {
      tag = FragmentComponent
    }
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
    if (tag === Fragment) {
      tag = FragmentComponent
    }
    const hInVue3 = h as ((tag: Tag, data?: VNodeData, components?: RenderChildren) => VNode)
    const newData = Object.assign({}, data.domProps, data.attrs, data.props)
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
