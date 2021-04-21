// https://github.com/umijs/neeko/blob/master/src/vue/observer.ts

import { autorun } from '@formily/reactive'
import { IObserverOptions } from '../types'

export const observer = function (opts: any, options?: IObserverOptions): any {
  const name = options?.name || opts.name || 'ObservableComponent'

  let dispose: () => void
  const mounted = function (this: any) {
    // hack, collect by vue internal render api
    // hope this is stable, and without effects
    const fn = () => {
      this.$.render(
        this,
        this.$.renderCache,
        this.$props,
        this.$.setupState,
        this.$data,
        this.$options
      )

      this.$forceUpdate()
    }

    dispose = autorun(fn)
  }

  const unmounted = function () {
    dispose?.()
  }
  
  return {
    name,
    ...opts,
    mounted() {
      opts?.mounted?.call(this)
      mounted.call(this)
    },
    unmounted() {
      opts?.unmounted?.call(this)
      unmounted.call(this)
    },
  }
}
