// https://github.com/mobxjs/mobx-vue

import { isObservable, reaction } from '@formily/reactive'
import { Vue, getCurrentInstance, SetupContext } from 'vue-demi'
import { ObservableComponentOptions } from '../types'

type Data = Record<string, any>

const noop = () => {
  /* empty */
}

const disposerSymbol = Symbol('disposerSymbol')

const defineObservableComponent = (originalOptions: ObservableComponentOptions) => {
  const name = originalOptions.name || 'ObservableComponent'
  const { observableSetup } = originalOptions
  let setup = originalOptions.setup
  if (observableSetup) {
    setup = (props: Data, context: SetupContext) => {
      const vm = getCurrentInstance()?.proxy || getCurrentInstance()
      const collect = (data: Data) =>
        Object.keys(data).reduce((result: any, field) => {
          const value = data[field]
          if (isObservable(value)) {
            Object.defineProperty(vm, field, {
              configurable: true,
              get() {
                return value
              },
              set() {
                // nothing to do
              }
            })
          } else {
            result[field] = value
          }
  
          return result
        }, {})
      const dataOrRenderFunction = observableSetup(collect, props, context)
      return dataOrRenderFunction
    }
    delete originalOptions.observableSetup
  }
  

  const newOptions = {
    name,
    ...originalOptions,
    setup,
    _Ctor: {}
  } as any

  const Component = Vue.extend(newOptions)

  const { $mount, $destroy } = Component.prototype

  Component.prototype.$mount = function(this: any, ...args: any[]) {
    let mounted = false
    this[disposerSymbol] = noop

    let nativeRenderOfVue: any
    
    const reactiveRender = () => {
      if (!mounted) {
        $mount.apply(this, args)
        mounted = true
        nativeRenderOfVue = this._watcher.getter
        this._watcher.getter = reactiveRender
      } else {
        nativeRenderOfVue.call(this, this)
      }
      return this
    }

    this[disposerSymbol] = reaction(reactiveRender)

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
