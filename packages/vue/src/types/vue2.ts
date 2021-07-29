import type { Component, ComponentOptions } from '@type-helper/vue2'
export type Vue2ComponentOptions = ComponentOptions<never>
export type Vue2Component<Props = Record<string, any>> = Component<
  any,
  any,
  any,
  Props
>
