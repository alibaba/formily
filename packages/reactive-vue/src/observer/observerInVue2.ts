// https://github.com/mobxjs/mobx-vue/blob/master/src/observer.ts

/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2018-05-22 16:39
 */
import { Tracker, batch } from '@formily/reactive'
import collectDataForVue from './collectData'
import { Vue2 as Vue } from 'vue-demi'
import { IObserverOptions } from '../types'

const noop = () => {}
const disposerSymbol = Symbol('disposerSymbol')

function observer(Component: any, observerOptions?: IObserverOptions): any {
  const name =
    observerOptions?.name ||
    (Component as any).name ||
    (Component as any)._componentTag ||
    (Component.constructor && Component.constructor.name) ||
    '<component>'

  const originalOptions =
    typeof Component === 'object' ? Component : (Component as any).options
  // To not mutate the original component options, we need to construct a new one
  const dataDefinition = originalOptions.data
  const options = {
    name,
    ...originalOptions,
    data(vm: any) {
      return collectDataForVue(vm || this, dataDefinition)
    },
    // overrider the cached constructor to avoid extending skip
    // @see https://github.com/vuejs/vue/blob/6cc070063bd211229dff5108c99f7d11b6778550/src/core/global-api/extend.js#L24
    _Ctor: {},
  }

  // we couldn't use the Component as super class when Component was a VueClass, that will invoke the lifecycle twice after we called Component.extend
  const superProto =
    typeof Component === 'function' &&
    Object.getPrototypeOf(Component.prototype)
  const Super =
    superProto instanceof (Vue as any) ? superProto.constructor : Vue
  const ExtendedComponent = Super.extend(options)

  const { $mount, $destroy } = ExtendedComponent.prototype

  ExtendedComponent.prototype.$mount = function (this: any, ...args: any[]) {
    let mounted = false
    this[disposerSymbol] = noop

    let nativeRenderOfVue: any

    const reactiveRender = () => {
      batch(() => {
        tracker.track(() => {
          if (!mounted) {
            $mount.apply(this, args)
            mounted = true
            nativeRenderOfVue = this._watcher.getter
            // rewrite the native render method of vue with our reactive tracker render
            // thus if component updated by vue watcher, we could re track and collect dependencies by @formily/reactive
            this._watcher.getter = reactiveRender
          } else {
            nativeRenderOfVue.call(this, this)
          }
        })
      })

      return this
    }

    reactiveRender.$vm = this

    const tracker = new Tracker(() => {
      if (
        reactiveRender.$vm._isBeingDestroyed ||
        reactiveRender.$vm._isDestroyed
      ) {
        return tracker.dispose()
      }

      if (
        observerOptions?.scheduler &&
        typeof observerOptions.scheduler === 'function'
      ) {
        observerOptions.scheduler(reactiveRender)
      } else {
        reactiveRender()
      }
    })

    this[disposerSymbol] = tracker.dispose

    return reactiveRender()
  }

  ExtendedComponent.prototype.$destroy = function (this: any) {
    ;(this as any)[disposerSymbol]()
    $destroy.apply(this)
  }

  const extendedComponentNamePropertyDescriptor =
    Object.getOwnPropertyDescriptor(ExtendedComponent, 'name') || {}
  if (extendedComponentNamePropertyDescriptor.configurable === true) {
    Object.defineProperty(ExtendedComponent, 'name', {
      writable: false,
      value: name,
      enumerable: false,
      configurable: false,
    })
  }

  return ExtendedComponent
}

export { observer, observer as Observer }
