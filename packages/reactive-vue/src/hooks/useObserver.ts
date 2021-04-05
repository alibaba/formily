import { Tracker } from '@formily/reactive'
import { VNode } from 'vue'
import { getCurrentInstance, onBeforeUnmount, isVue2 } from 'vue-demi'

// types for vue3
type VNodeChildAtom =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | void
type RawChildren = VNodeChildAtom | VNodeChildAtom[] | (() => any)

export const useObserver = () => {
  if (isVue2) {
    const track = (slot: (...args: any[]) => RawChildren) => slot
    return { track }
  } else {
    const vm = getCurrentInstance()
    let handler: () => void
    handler = () => {
      const proxy = vm.proxy as any
      proxy.$.render(
        proxy,
        proxy.$.renderCache,
        proxy.$props,
        proxy.$.setupState,
        proxy.$data,
        proxy.$options
      )
      proxy.$forceUpdate()
    }

    const tracker = new Tracker(handler)

    onBeforeUnmount(() => {
      if (tracker) {
        tracker.dispose()
      }
    })

    const track = (slot: (...args: any[]) => RawChildren) => {
      if (slot.length !== 0) {
        const scopedSlot = (...args: any[]) =>
          tracker.track(slot.bind(vm, ...args))
        scopedSlot.length = slot.length
        return scopedSlot
      } else {
        return () => tracker.track(slot)
      }
    }
    return { track }
  }
}
