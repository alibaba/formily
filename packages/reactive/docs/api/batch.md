# batch

## 描述

接收一个操作函数，并立即执行，执行过程以批量模式执行，也就是每次操作函数执行一次，Reaction 只会响应一次，如果 batch 存在嵌套，则会以最顶层的 batch 结束为响应时机，同时 batch 还能在 define 中以 annotation 的方式标注某个方法是 batch 模式。

## 签名

```ts
interface batch<T extends (...args: any[]) => any> {
  (callback?: T): ReturnType<T>
}
```

## 用例

```ts
import { observable, autorun, batch } from '@formily/reactive'

const obs = observable({})

autorun(() => {
  console.log(obs.aa, obs.bb)
})

batch(() => {
  obs.aa = 123
  obs.bb = 321
})
```
