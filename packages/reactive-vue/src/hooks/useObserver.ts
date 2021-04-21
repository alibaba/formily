import { Tracker } from '@formily/reactive'
import { getCurrentInstance, onBeforeUnmount, isVue2 } from 'vue-demi'

export const useObserver = () => {
  if (isVue2) {
    const track = (slot: (...args: any[]) => any) => slot
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

    const track = (slot: (...args: any[]) => any) => {
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
