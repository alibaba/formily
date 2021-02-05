// https://github.com/umijs/neeko/blob/master/src/vue/observer.ts

import { autorun } from 'mobx'
import { SetupContext, defineComponent } from 'vue-demi'
import { ObservableComponentOptions } from '../types'

type Data = Record<string, any>

const defineObservableComponent = (originalOptions: ObservableComponentOptions) => {
  const name = originalOptions.name || 'ObservableComponent'
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

  const { observableSetup } = originalOptions
  let setup = originalOptions.setup
  if (observableSetup) {
    setup = (props: Data, context: SetupContext) => {
      const collect = (data: Data) => data
      return observableSetup(collect, props, context)
    }
  
    delete originalOptions.observableSetup
  }
  

  const newOptions = {
    name,
    ...originalOptions,
    setup,
    mounted() {
      originalOptions?.mounted?.call(this)
      mounted.call(this)
    },
    unmounted() {
      originalOptions?.unmounted?.call(this)
      unmounted.call(this)
    },
  } as any

  return defineComponent(newOptions)
}

export { defineObservableComponent }
