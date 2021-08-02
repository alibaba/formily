# batch

## 描述

定义批量操作，内部可以收集依赖

## 签名

```ts
interface batch {
  <T>(callback?: () => T): T //原地batch
  scope<T>(callback?: () => T): T //原地局部batch
  bound<T extends (...args: any[]) => any>(callback: T, context?: any): T //高阶绑定
}
```

## 用例

```ts
import { observable, autorun, batch } from '@formily/reactive'

const obs = observable({})

autorun(() => {
  console.log(obs.aa, obs.bb, obs.cc, obs.dd)
})

batch(() => {
  batch.scope(() => {
    obs.aa = 123
  })
  batch.scope(() => {
    obs.cc = 'ccccc'
  })
  obs.bb = 321
  obs.dd = 'dddd'
})
```
