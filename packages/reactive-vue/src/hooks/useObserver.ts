import { autorun } from '@formily/reactive'
import { getCurrentInstance, onBeforeUnmount, isVue3 } from 'vue-demi'
import { IObserverOptions } from '../types'

/* istanbul ignore next */
export const useObserver = (options?: IObserverOptions) => {
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
        // https://github.com/alibaba/formily/issues/2655
        return vm['_updateEffect'] || {}
      },
      set(newValue) {
        if (dispose) {
          dispose()
        }
        dispose = autorun(newValue)
        const update = () => {
          vm['_updateEffect'] = newValue
        }

        if (options?.scheduler) {
          options?.scheduler?.(update)
        } else {
          update()
        }
      },
    })
  }
}
