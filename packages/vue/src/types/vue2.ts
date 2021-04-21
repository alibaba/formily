import type { Component, ComponentOptions, VNodeChildren, FunctionalComponentOptions } from 'vue'
type DefaultProps = Record<string, any>;
export type Vue2ComponentOptions<Props=DefaultProps> = ComponentOptions<never, any, any, any, Props>
export type Vue2Component<Props=DefaultProps> = Component<any, any, any, Props>
export {
  VNodeChildren,
  FunctionalComponentOptions
}
