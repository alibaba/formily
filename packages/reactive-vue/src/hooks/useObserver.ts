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

    Object.defineProperty(vm, 'effect', {
      get() {
        // https://github.com/alibaba/formily/issues/2655
        return vm['_updateEffect'] || {}
      },
      set(newValue) {
        vm['_updateEffectRun'] = newValue.run
        disposeTracker()
        const newTracker = () => {
          tracker = new Tracker(() => {
            if (options?.scheduler && typeof options.scheduler === 'function') {
              options.scheduler(update)
            } else {
              update()
            }
          })
        }

        const update = function () {
          let refn = null
          tracker?.track(() => {
            refn = vm['_updateEffectRun'].call(newValue)
          })
          return refn
        }
        newTracker()
        newValue.run = update
        vm['_updateEffect'] = newValue
      },
    })
  }
}
