// https://github.com/umijs/neeko/blob/master/src/vue/observer.ts

import { defineComponent } from 'vue-demi'
import { autorun } from '@formily/reactive'

export const observer = function (opts: any) {
  const name = opts.name || 'ObservableComponent'

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
        this.$options,
      )

      this.$forceUpdate()
    }

    dispose = autorun(fn)
  }

  const unmounted = function () {
    dispose?.()
  }
  

  return defineComponent({
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
  })
}
