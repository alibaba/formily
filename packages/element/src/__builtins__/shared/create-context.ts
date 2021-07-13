import type { Component } from 'vue'
import {
  defineComponent,
  provide,
  inject,
  readonly,
  InjectionKey,
} from 'vue-demi'

export type CreateContext<T> = {
  Provider: Component
  Consumer: Component
  injectKey: InjectionKey<T>
}

export const createContext = <T>(defaultValue: T): CreateContext<T> => {
  const injectKey: InjectionKey<T> = Symbol()

  return {
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: Object,
          default() {
            return defaultValue
          },
        },
      },
      setup(props, { slots }) {
        provide(injectKey, readonly(props.value))

        return () => slots?.default?.()
      },
    }),

    Consumer: defineComponent({
      name: 'ContextConsumer',
      setup(_props, { slots }) {
        const value = inject(injectKey)

        return () => slots?.default?.(value)
      },
    }),
    injectKey,
  }
}

export const useContext = <T>(context: CreateContext<T>, defaultValue?: T) => {
  const key = context.injectKey

  return inject(key, defaultValue)
}
