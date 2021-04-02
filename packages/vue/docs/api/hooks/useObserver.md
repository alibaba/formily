# useObserver

## 描述

当使用 Vue3 时，某些情况下使用 [observer](/api/shared/observer) 包裹后的组件**插槽**不会响应数据变化，这时可能需要使用此 hook 对插槽里的依赖进行收集。

useObserver 是从 [@formily/reactive-vue](https://reactive.formilyjs.org/api/vue/use-observer) 中导出的，API 完全一致。

:::warning
大部分情况下不需要手动进行收集，只有在 **Vue3 使用渲染函数**，且**子节点为函数写法**时才需要。Vue2 可直接使用[observer](/api/shared/observer)。
:::

## 签名

```ts
interface useObserver {
  (): {
    track: <T = (...args: any[]) => RawChildren>(slot: T) => T
  }
}
```

## 用例

``` ts
import { defineComponent, h } from 'vue'
import { useObserver, useForm } from '@formily/vue'

const ObservableComponent = defineComponent({
  setup (props, { slots }) {
    const { track } = useObserver()
    const form = useForm()
    return () => h('div', {
      default: track(() => [JSON.stringify(form.values)])
    })
  }
})
```
