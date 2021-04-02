# useObserver

## 描述

使用 Vue3 时，可以借助此 hook 对子节点渲染进行显式地依赖收集。

<Alert>
此 hook 仅对 Vue3 生效，Vue2 请使用 observer 方法。
</Alert>

## 签名

```ts
interface useObserver {
  (): {
    track: <T = (...args: any[]) => RawChildren>(slot: T) => T
  }
}
```

## 用例

```html
<template>
  <div>
    <div>
      <input
        :style="{
          height: 28,
          padding: '0 8px',
          border: '2px solid #888',
          borderRadius: 3,
        }"
        :value="obs.value"
        @input="(e) => {
          obs.value = e.target.value
        }"
      />
    </div>
    <Previewer></Previewer>
  </div>
</template>

<script>
  import { defineComponent, h, markRaw } from 'vue'
  import { observable } from '@formily/reactive'
  import { useObserver } from '@formily/reactive-vue'

  const obs = observable({
    value: 'Hello world',
  })

  const Previewer = defineComponent({
    setup() {
      const { track } = useObserver()
      return () =>
        h(
          'div',
          {},
          {
            default: track(() => obs.value),
          }
        )
    },
  })

  export default defineComponent({
    components: { Previewer },
    data() {
      return {
        obs: markRaw(obs),
      }
    },
  })
</script>
```
