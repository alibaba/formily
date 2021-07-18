# untracked

## 描述

用法与 batch 相似，在给定的 untracker 函数内部永远不会被依赖收集

## 签名

```ts
interface untracked<T extends () => any> {
  (untracker?: T): ReturnType<T>
}
```

## 用例

```ts
import { observable, autorun, untracked } from '@formily/reactive'

const obs = observable({
  aa: 11,
})

autorun(() => {
  console.log(untracked(() => obs.aa)) //变化时不会触发
})

obs.aa = 22
```
