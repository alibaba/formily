import type { DefineComponent as Vue3DefineComponent } from '@type-helper/vue3'

declare module 'vue-demi' {
  type DefineComponent<Props = Record<string, any>> = Vue3DefineComponent<Props>
}
