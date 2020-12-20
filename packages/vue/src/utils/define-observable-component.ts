// some from mobx-vue: https://github.com/mobxjs/mobx-vue

import Vue from 'vue'
import { isObservable, Reaction } from 'mobx'
import { getCurrentInstance } from '@vue/composition-api'

type Data = { [key: string]: unknown }

const noop = () => {
  /* empty */
}

const disposerSymbol = Symbol('disposerSymbol')

const defineObservableComponent = (originalOptions: any) => {
  const name = originalOptions.name || 'ObservableComponent'

  const { observableSetup } = originalOptions
  const setup = (...args: Data[]) => {
    const vm = getCurrentInstance()
    const collect = (data: Data) =>
      Object.keys(data).reduce((result: any, field) => {
        const value = data[field]
        if (isObservable(value)) {
          Object.defineProperty(vm, field, {
            configurable: true,
            get() {
              return value
            },
            // @formatter:off
            // tslint:disable-next-line
            set() {}
            // @formatter:on
          })
        } else {
          result[field] = value
        }

        return result
      }, {})
    return observableSetup(collect, ...args)
  }

  delete originalOptions.observableSetup

  const newOptions = {
    name,
    ...originalOptions,
    setup,
    // overrider the cached constructor to avoid extending skip
    // @see https://github.com/vuejs/vue/blob/6cc070063bd211229dff5108c99f7d11b6778550/src/core/global-api/extend.js#L24
    _Ctor: {}
  }

  const Component = Vue.extend(newOptions)

  const { $mount, $destroy } = Component.prototype

  Component.prototype.$mount = function(this: any, ...args: any[]) {
    let mounted = false
    this[disposerSymbol] = noop

    let nativeRenderOfVue: any
    const reactiveRender = () => {
      reaction.track(() => {
        if (!mounted) {
          $mount.apply(this, args)
          mounted = true
          nativeRenderOfVue = this._watcher.getter
          // rewrite the native render method of vue with our reactive tracker render
          // thus if component updated by vue watcher, we could re track and collect dependencies by mobx
          this._watcher.getter = reactiveRender
        } else {
          nativeRenderOfVue.call(this, this)
        }
      })

      return this
    }

    const reaction = new Reaction(`${name}.render()`, reactiveRender)

    this[disposerSymbol] = reaction.getDisposer_()

    return reactiveRender()
  }

  Component.prototype.$destroy = function(this: Vue) {
    ;(this as any)[disposerSymbol]()
    $destroy.apply(this)
  }

  const extendedComponentNamePropertyDescriptor =
    Object.getOwnPropertyDescriptor(Component, 'name') || {}
  if (extendedComponentNamePropertyDescriptor.configurable === true) {
    Object.defineProperty(Component, 'name', {
      writable: false,
      value: name,
      enumerable: false,
      configurable: false
    })
  }

  return Component
}

export { defineObservableComponent }
