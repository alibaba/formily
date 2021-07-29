# action

## 描述

内部用[batch](/api/batch)包装一个函数，使得函数变成一个批量操作模式，解决多个原子操作 reaction 触发多次的问题，同时 action 还能在 define 中以 annotation 的方式标注某个方法是 batch 模式。

## 签名

```ts
interface action<T extends (...args: any[]) => any> {
  (callback?: T): T
}
```

## 用例

```ts
import { observable, action } from '@formily/reactive'

const obs = observable({})

const method = action(() => {
  obs.aa = 123
  obs.bb = 321
})

method()
```
