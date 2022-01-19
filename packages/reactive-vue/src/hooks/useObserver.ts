import { Tracker } from '@formily/reactive'
import { getCurrentInstance, onBeforeUnmount, isVue3 } from 'vue-demi'
import { IObserverOptions } from '../types'

/* istanbul ignore next */
export const useObserver = (options?: IObserverOptions) => {
  if (isVue3) {
    const vm = getCurrentInstance()
    let tracker: Tracker = null
    const disposeTracker = () => {
      if (tracker) {
        tracker.dispose()
        tracker = null
      }
    }

    onBeforeUnmount(disposeTracker)

    Object.defineProperty(vm, 'update', {
      get() {
        // https://github.com/alibaba/formily/issues/2655
        return vm['_updateEffect'] || {}
      },
      set(newValue) {
        disposeTracker()

        const update = () => tracker?.track(newValue)

        tracker = new Tracker(() => {
          if (options?.scheduler && typeof options.scheduler === 'function') {
            options.scheduler(update)
          } else {
            update()
          }
        })

        update()

        vm['_updateEffect'] = newValue
      },
    })
  }
}
