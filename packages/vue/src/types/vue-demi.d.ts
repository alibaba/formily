import type { DefineComponent as Vue3DefineComponent } from 'vue3'

declare module 'vue-demi' {
  type DefineComponent<Props = Record<string, any>> = Vue3DefineComponent<Props>
  const Fragment: {
    new (): {
        $props: VNodeProps;
    };
    __isFragment: true;
};
}
