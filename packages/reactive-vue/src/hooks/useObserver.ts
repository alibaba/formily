import { autorun } from '@formily/reactive'
import { getCurrentInstance, onBeforeUnmount, isVue3 } from 'vue-demi'

export const useObserver = () => {
  if (isVue3) {
    const vm = getCurrentInstance()

    let dispose: () => void | undefined

    onBeforeUnmount(() => {
      if (dispose) {
        dispose()
      }
    })

    Object.defineProperty(vm, 'update', {
      get() {
        return vm['_updateEffect'];
      },
      set(newValue) {
        if (dispose) {
          dispose()
        }
        dispose = autorun(newValue)
        vm['_updateEffect'] = newValue;
      },
    })
  }
}
