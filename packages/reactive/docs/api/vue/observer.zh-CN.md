# observer

## 描述

在 Vue 中，将组件渲染方法变成 Reaction，每次视图重新渲染就会收集依赖，依赖更新会自动重渲染。

### 签名

```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void //调度器，可以手动控制更新时机
  name?: string //包装后的组件的name
}

interface observer<T extends VueComponent> {
  (component: T, options?: IObserverOptions): T
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
    <div>{{obs.value}}</div>
  </div>
</template>

<script>
  import { observable } from '@formily/reactive'
  import { observer } from '@formily/reactive-vue'

  export default observer({
    data() {
      // 能与 vue 的响应系统共存
      const obs = observable({
        value: 'Hello world',
      })
      return {
        obs,
      }
    },
  })
</script>
```
