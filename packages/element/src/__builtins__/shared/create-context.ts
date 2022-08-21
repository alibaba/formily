import type { Component } from 'vue'
import {
  defineComponent,
  inject,
  InjectionKey,
  provide,
  readonly,
  ref,
  Ref,
  toRef,
} from 'vue-demi'

export type CreateContext<T> = {
  Provider: Component
  Consumer: Component
  injectKey: InjectionKey<Ref<T>>
}

export const createContext = <T>(defaultValue?: T): CreateContext<T> => {
  const injectKey: InjectionKey<Ref<T>> = Symbol()

  return {
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: null,
          default() {
            return defaultValue ?? null
          },
        },
      },
      setup(props, { slots }) {
        const value = toRef(props, 'value')
        provide(injectKey, readonly(value))

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

export const useContext = <T>(context: CreateContext<T>) => {
  const key = context.injectKey

  return inject(key, ref(null))
}
